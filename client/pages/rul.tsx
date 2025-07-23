import Layout from "../components/Layout";
import RULForm from "../components/RULForm";
import RULResult from "../components/RULResult";
import { useState } from "react";
import styled from "styled-components";

export default function RULPage() {
  const [result, setResult] = useState(null);

  return (
    <Layout>
      <Container>
        <h1>🔧 Predict RUL</h1>
        <RULForm onResult={setResult} />
        {result && <RULResult result={result} />}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;
