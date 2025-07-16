import Layout from "../components/Layout";
import { Container, Title } from "../components/StyledComponents";

export default function HomePage() {
  return (
    <Layout>
      <Container>
        <Title>🚀 Welcome to the RUL Prediction Interface</Title>
        <p>This tool allows you to:</p>
        <ul>
          <li>📤 Upload new engine sensor data and train models</li>
          <li>🔍 Run batch predictions using trained models</li>
          <li>📊 Understand Remaining Useful Life (RUL) predictions</li>
        </ul>
      </Container>
    </Layout>
  );
}
