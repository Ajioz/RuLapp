import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File as FormidableFile, Fields, Files } from "formidable";
import path from "path";
import { spawn } from "child_process";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { purpose, mType } = req.query;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (typeof purpose !== "string" || typeof mType !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or invalid purpose or mType" });
  }

  const form = formidable({ uploadDir: "./tmp", keepExtensions: true });

  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err || !files.file) {
      return res.status(500).json({ error: "File upload failed" });
    }

    const uploadedFile = Array.isArray(files.file)
      ? files.file[0]
      : (files.file as FormidableFile);

    const inputPath = uploadedFile.filepath;
    const filename = uploadedFile.originalFilename || path.basename(inputPath);
    const processedPath = path.join("data/processed", filename);

    try {
      if (purpose === "tPipeline") {
        // Step 1: Preprocess
        const preprocess = spawn("python", [
          "utils/preprocess.py",
          inputPath,
          processedPath,
        ]);

        preprocess.on("close", (code: number) => {
          if (code !== 0) {
            return res.status(500).json({ error: "Preprocessing failed" });
          }

          // Step 2: Train
          const train = spawn("python", [
            "model/training.py",
            "--dataset",
            processedPath,
            "--mtype",
            mType,
          ]);

          train.on("close", (trainCode: number) => {
            if (trainCode !== 0) {
              return res.status(500).json({ error: "Training failed" });
            }

            return res
              .status(200)
              .json({ message: `✅ Training complete for ${mType}` });
          });
        });
      } else if (purpose === "rul") {
        const predict = spawn("curl", [
          "-X",
          "POST",
          "-H",
          `X-API-Key: ${process.env.NEXT_PUBLIC_API_KEY}`,
          "-F",
          `engine_type=${mType}`,
          "-F",
          `file=@${inputPath}`,
          `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        ]);

        let output = "";

        predict.stdout.on("data", (data: Buffer) => {
          output += data.toString();
        });

        predict.stderr.on("data", (data: Buffer) => {
          console.error(`stderr: ${data.toString()}`);
        });

        predict.on("close", (code: number) => {
          if (code !== 0) {
            return res.status(500).json({ error: "Prediction failed" });
          }

          try {
            const parsed = JSON.parse(output);
            return res.status(200).json(parsed);
          } catch (parseErr) {
            return res
              .status(500)
              .json({ error: "Invalid response from prediction server" });
          }
        });
      } else {
        return res.status(400).json({ error: "Unknown purpose tag" });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Unexpected server error", detail: e });
    }
  });
}
