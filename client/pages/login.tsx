import Layout from "../components/Layout";
import styled from "styled-components";

export default function LoginPage() {
  return (
    <Layout title="Login">
      <Container>
        <h1>🔐 Login</h1>
        <p>Login functionality coming soon...</p>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`;
