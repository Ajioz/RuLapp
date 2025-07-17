import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Container,
  Title,
  Button,
  Output,
} from "../components/StyledComponents";
import { predictSingle } from "../components/ApiService";
import { toast } from "react-toastify";

export default function SinglePredictionPage() {
  const [features, setFeatures] = useState({
    op_setting_1: 35.5,
    op_setting_2: 0.8,
    op_setting_3: 100.0,
    sensor_2: 520.1,
    sensor_3: 638.2,
    sensor_4: 1587.5,
  });

  const [engineType, setEngineType] = useState("FD002");
  const [condition, setCondition] = useState("standard");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFeatures({ ...features, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        engine_type: engineType,
        condition,
        row_index: 0,
        data: features,
      };
      const response = await predictSingle(payload);
      setResult(JSON.stringify(response.data, null, 2));
      toast.success("✅ Prediction successful");
    } catch (error) {
      setResult(error?.response?.data?.detail || "Prediction failed");
      toast.error("❌ Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const csv = `feature,value\n${Object.entries(features)
      .map(([k, v]) => `${k},${v}`)
      .join("\n")}
\n${result}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "single_rul_prediction.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Container>
        <Title>📈 Single RUL Prediction</Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <label>Engine Type: </label>
            <input
              type="text"
              value={engineType}
              onChange={(e) => setEngineType(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Condition: </label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>
          {Object.keys(features).map((key) => (
            <div key={key} style={{ marginBottom: "1rem" }}>
              <label>{key}: </label>
              <input
                type="number"
                name={key}
                value={features[key]}
                onChange={handleChange}
                step="0.01"
              />
            </div>
          ))}
          <Button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </Button>
          {result && (
            <Button
              type="button"
              style={{ marginLeft: "1rem" }}
              onClick={handleDownload}
            >
              ⬇️ Download CSV
            </Button>
          )}
        </form>
        {result && <Output>{result}</Output>}
      </Container>
    </Layout>
  );
}
