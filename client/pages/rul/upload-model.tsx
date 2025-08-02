import { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import Layout from "@/components/Layout/Layout_bkup";
import HeroBreadcrumb from "@/components/Layout/breadcrumb";



export default function UploadModelPage() {
  const [mType, setMType] = useState("");
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [featuresFile, setFeaturesFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mType || !modelFile || !featuresFile) {
      setMessage("All fields are required.");
      setIsSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append("mType", mType);
    formData.append("model_file", modelFile);
    formData.append("features_file", featuresFile);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/artefact/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Upload failed");

      setIsSuccess(true);
      setMessage(data.message);
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(err.message || "Upload error.");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Upload Model Artifact</title>
      </Head>
      <HeroBreadcrumb
        title="Admin Upload Model"
        breadcrumbs={[
          { label: "Home", href: "/" },
        ]}
      />
      <Container>
        <Title>Upload Trained Model</Title>
        <Form onSubmit={handleSubmit}>
          <label>Engine Type (mType)</label>
          <Input
            type="text"
            value={mType}
            onChange={(e) => setMType(e.target.value)}
            required
          />

          <label>Model File (.pkl)</label>
          <Input
            type="file"
            accept=".pkl"
            onChange={(e) => setModelFile(e.target.files?.[0] || null)}
            required
          />

          <label>Features File (.json)</label>
          <Input
            type="file"
            accept=".json"
            onChange={(e) => setFeaturesFile(e.target.files?.[0] || null)}
            required
          />

          <Button type="submit">Upload</Button>
          {message && <Message success={isSuccess}>{message}</Message>}
        </Form>
      </Container>
    </Layout>
  );
}


const Container = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const Message = styled.p<{ success?: boolean }>`
  color: ${(props) => (props.success ? "green" : "red")};
`;