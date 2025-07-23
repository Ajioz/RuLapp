import Layout from "../components/Layout";
import styled from "styled-components";

export default function DashboardPage() {
  return (
    <Layout>
      <Container>
        <h1>📊 Dashboard</h1>
        <p>Model status, training logs, and analytics coming soon...</p>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;
