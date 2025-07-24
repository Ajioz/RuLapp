import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import { spawn } from "child_process";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads via formidable
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { purpose, mType } = req.query;

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  if (!purpose || !mType)
    return res.status(400).json({ error: "Missing purpose or mType tag" });

  const form = formidable({ uploadDir: "./tmp", keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file)
      return res.status(500).json({ error: "File upload failed" });

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
    const inputPath = uploadedFile.filepath;
    const filename = uploadedFile.originalFilename || path.basename(inputPath);

    const processedPath = path.join("data/processed", filename);

    if (purpose === "tPipeline") {
      // Step 1: Preprocess
      const preprocess = spawn("python", [
        "utils/preprocess.py",
        inputPath,
        processedPath,
      ]);

      preprocess.on("close", (code) => {
        if (code !== 0) {
          return res.status(500).json({ error: "Preprocessing failed" });
        }

        // Step 2: Train model
        const train = spawn("python", [
          "model/training.py",
          "--dataset",
          processedPath,
          "--mtype",
          mType,
        ]);

        train.on("close", (trainCode) => {
          if (trainCode !== 0) {
            return res.status(500).json({ error: "Training failed" });
          }

          return res
            .status(200)
            .json({ message: `✅ Training complete for ${mType}` });
        });
      });
    } else if (purpose === "rul") {
      // Predict
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
      predict.stdout.on("data", (data) => (output += data));
      predict.stderr.on("data", (data) => console.error(`stderr: ${data}`));

      predict.on("close", (code) => {
        if (code !== 0)
          return res.status(500).json({ error: "Prediction failed" });

        try {
          const parsed = JSON.parse(output);
          res.status(200).json(parsed);
        } catch {
          res
            .status(500)
            .json({ error: "Invalid response from prediction server" });
        }
      });
    } else {
      return res.status(400).json({ error: "Unknown purpose tag" });
    }
  });
}
