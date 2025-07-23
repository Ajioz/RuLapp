import styled from "styled-components";

export default function RULResult({ result }: { result: any }) {
  const pred = result.prediction;
  return (
    <ResultBox>
      <h3>Prediction</h3>
      <p>🔧 RUL Cycles: {pred.rul_cycles}</p>
      <p>Status: {pred.status}</p>
      <p>⏳ Estimated Life: ~{pred.rul_days} days</p>

      {result.explanation && (
        <>
          <h4>SHAP Plot</h4>
          <img src={`data:image/png;base64,${result.explanation}`} alt="SHAP" />
        </>
      )}
    </ResultBox>
  );
}

const ResultBox = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #f3f3f3;
  border-radius: 8px;
`;
