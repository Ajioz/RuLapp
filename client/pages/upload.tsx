import Layout from "../components/Layout";
import styled from "styled-components";

export default function UploadPage() {
  return (
    <Layout>
      <Container>
        <h1>📤 Upload</h1>
        <p>Upload raw sensor data for preprocessing and analysis.</p>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;
