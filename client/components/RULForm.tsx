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

    if (!file) return setError("Please upload a .txt or .csv file.");

    const formData = new FormData();
    formData.append("engine_type", engineType);
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await predictRUL(formData);
      onResult(res);
    } catch {
      setError("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>Engine Type</label>
      <select
        value={engineType}
        onChange={(e) => setEngineType(e.target.value)}
      >
        <option value="FD001">FD001</option>
        <option value="FD002">FD002</option>
      </select>

      <input
        type="file"
        accept=".txt,.csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict RUL"}
      </button>

      {error && <ErrorText>{error}</ErrorText>}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ErrorText = styled.p`
  color: red;
`;
