import { useState } from "react";
import styled from "styled-components";
import Layout from "@/components/Layout/Layout_bkup";
import RULForm from "@/components/RULForm";
import RULResult from "@/components/RULResult";

interface PredictionResult {
  rul_cycles: number;
  status: string;
  rul_days: number;
  rul_months: number;
  rul_years: number;
}

export default function RULPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);

  return (
    <Layout title="Predict RUL">
      <Container>
        <Header>🔧 Engine RUL Predictor</Header>
        <Description>
          Estimate the Remaining Useful Life of your engine based on sensor
          data.
        </Description>
        <RULForm onResult={setResult} />
        {result && <RULResult result={result} />}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Header = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
`;
