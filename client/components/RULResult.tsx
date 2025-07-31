import styled from "styled-components";

export default function RULResult({ result }: { result: any }) {
  const pred = result.prediction;

  return (
    <ResultWrapper>
      <Title>📊 Prediction Result</Title>

      <DetailList>
        <DetailItem>
          <Label>🔧 RUL Cycles:</Label> <Value>{pred.rul_cycles}</Value>
        </DetailItem>
        <DetailItem>
          <Label>Status:</Label> <Value>{pred.status}</Value>
        </DetailItem>
        <DetailItem>
          <Label>⏳ Estimated Life:</Label>{" "}
          <Value>
            ~{pred.rul_days} days / ~{pred.rul_months} months / ~
            {pred.rul_years} years
          </Value>
        </DetailItem>
      </DetailList>

      {result.explanation && (
        <PlotSection>
          <h4>🔍 SHAP Force Plot</h4>
          <PlotImage
            src={`data:image/png;base64,${result.explanation}`}
            alt="SHAP Force Plot"
          />
        </PlotSection>
      )}
    </ResultWrapper>
  );
}

const ResultWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 10vh;
  padding: 2rem;
  background: #f9fafb;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
  color: #1a202c;
`;

const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
  color: #2d3748;
`;

const Value = styled.span`
  color: #4a5568;
`;

const PlotSection = styled.div`
  margin-top: 2rem;
`;

const PlotImage = styled.img`
  margin-top: 0.5rem;
  max-width: 100%;
  border-radius: 6px;
  border: 1px solid #ddd;
`;
