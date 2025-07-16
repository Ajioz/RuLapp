import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Container,
  Title,
  InputArea,
  Button,
  Output,
} from "../components/StyledComponents";
import { predictBatch } from "../components/ApiService";
import { toast } from "react-toastify";

export default function RulBatchPredictPage() {
  const [jsonInput, setJsonInput] = useState(`{
  "batch": [
    {
      "features": {
        "op_setting_1": 35.5,
        "op_setting_2": 0.8,
        "op_setting_3": 100.0,
        "sensor_2": 520.1,
        "sensor_3": 638.2,
        "sensor_4": 1587.5
      },
      "model": "xgb"
    }
  ]
}`);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await predictBatch(JSON.parse(jsonInput));
      setResult(JSON.stringify(response.data, null, 2));
      toast.success("✅ Prediction successful");
    } catch (error) {
      setResult(error?.response?.data?.detail || "Something went wrong");
      toast.error("❌ Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <Title>🔎 Batch RUL Prediction</Title>
        <InputArea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Predicting..." : "Predict Batch"}
        </Button>
        {result && <Output>{result}</Output>}
      </Container>
    </Layout>
  );
}
