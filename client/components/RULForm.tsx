import { useState } from "react";
import { predictRUL } from "../services/rulService";
import styled from "styled-components";

export default function RULForm({
  onResult,
}: {
  onResult: (res: any) => void;
}) {
  const [engineType, setEngineType] = useState("FD001");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please upload a .txt or .csv file.");
      return;
    }

    const formData = new FormData();
    formData.append("engine_type", engineType);
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await predictRUL(formData);
      onResult(res);
    } catch {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="engine">Engine Type</Label>
        <Select
          id="engine"
          value={engineType}
          onChange={(e) => setEngineType(e.target.value)}
        >
          <option value="FD001">FD001</option>
          <option value="FD002">FD002</option>
          <option value="FD003">FD003</option>
          <option value="FD004">FD004</option>
        </Select>
      </Field>

      <Field>
        <Label htmlFor="file">Upload File (.txt or .csv)</Label>
        <Input
          id="file"
          type="file"
          accept=".txt,.csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </Field>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict RUL"}
      </SubmitButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.45rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const SubmitButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 0.65rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #005fd1;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.95rem;
  font-weight: 500;
  margin-top: -0.5rem;
`;
