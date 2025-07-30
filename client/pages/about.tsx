import Layout from "../components/Layout";
import styled from "styled-components";

export default function AboutPage() {
  return (
    <Layout title="About">
      <Container>
        <h1>ℹ️ About</h1>
        <p>
          This platform predicts Remaining Useful Life (RUL) of engines using
          advanced ML models and SHAP explanations.
        </p>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;
