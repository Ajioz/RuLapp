import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Set up multer for handling multipart/form-data
const uploadDir = path.join(process.cwd(), "data", "raw");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, _req, res) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File upload failed." });
  },
  onNoMatch(_req, res) {
    res.status(405).json({ error: "Method not allowed." });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req: any, res: NextApiResponse) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Trigger processing script (optional: log to audit, etc.)
  const utilsPath = path.join(process.cwd(), "utils", "preprocess.py");
  const inputPath = uploadedFile.path;
  const outputPath = path.join(
    process.cwd(),
    "data",
    "processed",
    uploadedFile.originalname
  );

  try {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const python = spawn("python", [utilsPath, inputPath, outputPath]);

    python.on("close", (code) => {
      if (code === 0) {
        console.log(`✅ File processed: ${uploadedFile.originalname}`);
        res.status(200).json({ message: "Upload and processing complete." });
      } else {
        console.error("❌ Preprocessing script failed.");
        res.status(500).json({ error: "Preprocessing failed." });
      }
    });
  } catch (err) {
    console.error("Processing error:", err);
    res.status(500).json({ error: "Internal error during processing." });
  }
});

export default apiRoute;
