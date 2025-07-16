import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Container,
  Title,
  Button,
  Output,
} from "../components/StyledComponents";
import { uploadTrainingFile } from "../components/ApiService";
import { toast } from "react-toastify";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const response = await uploadTrainingFile(file);
      setResult(response.data.message);
      toast.success("✅ Training data uploaded and model trained");
    } catch (error) {
      setResult(error?.response?.data?.detail || "Upload failed");
      toast.error("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <Title>📤 Upload New Training Data</Title>
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <br />
        <br />
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload and Train"}
        </Button>
        {result && <Output>{result}</Output>}
      </Container>
    </Layout>
  );
}
