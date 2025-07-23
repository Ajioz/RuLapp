import { useState } from "react";
import RULForm from "../components/RULForm";
import RULResult from "../components/RULResult";
import styled from "styled-components";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <Container>
      <h1>🔧 Engine RUL Predictor</h1>
      <RULForm onResult={setResult} />
      {result && <RULResult result={result} />}
    </Container>
  );
}

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
`;
