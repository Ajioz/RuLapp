import { useState } from "react";
import styled from "styled-components";
import Layout from "@/components/Layout/Layout_bkup";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [purpose, setPurpose] = useState("rul");
  const [mType, setMType] = useState("FD001");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("⚠️ Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch(`/api/upload?purpose=${purpose}&mType=${mType}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setMessage(data.message || "✅ Upload successful!");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Upload Data">
      <Container>
        <h2>📤 Upload Engine Data</h2>
        <p>Choose a raw engine data file and tag its purpose.</p>

        <Form onSubmit={handleUpload}>
          <label>File</label>
          <input
            type="file"
            accept=".txt,.csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <label>Purpose</label>
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            <option value="rul">RUL Prediction</option>
            <option value="tPipeline">Training Pipeline</option>
          </select>

          <label>Machine Type (mType)</label>
          <select value={mType} onChange={(e) => setMType(e.target.value)}>
            <option value="FD001">FD001</option>
            <option value="FD002">FD002</option>
            <option value="turbo-engine">turbo-engine</option>
            <option value="compressor">compressor</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </button>
        </Form>

        {message && <Status>{message}</Status>}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  select,
  button {
    padding: 0.6rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  button {
    background: #0070f3;
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: #0059c1;
    }
  }
`;

const Status = styled.div`
  margin-top: 1rem;
  color: #333;
  font-weight: 500;
`;
