// pages/upload.tsx
import { useState } from "react";
import styled from "styled-components";
import Layout from "@/components/Layout";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus("❌ Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setStatus("");

      // TODO: Replace with your real upload endpoint
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setStatus("✅ File uploaded successfully!");
    } catch (err) {
      setStatus("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Title>📤 Upload Raw Engine Data</Title>
        <Description>
          Drop your unprocessed engine data here. Our system will detect and
          process it automatically.
        </Description>

        <Form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".txt,.csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </Form>

        {status && <Status>{status}</Status>}
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  color: #555;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input[type="file"] {
    padding: 0.5rem;
  }

  button {
    background: #0070f3;
    color: white;
    padding: 0.7rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: #005fcc;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;

const Status = styled.p`
  margin-top: 1rem;
  font-weight: 500;
  color: #333;
`;
