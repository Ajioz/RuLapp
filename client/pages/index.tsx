import Layout from "@/components/Layout";
import styled from "styled-components";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <Container>
        <Title>Engine Health Intelligence</Title>
        <Subtitle>
          Predict Remaining Useful Life (RUL), upload engine sensor data, and
          manage your models in one unified platform.
        </Subtitle>

        <ButtonGroup>
          <Link href="/rul" passHref>
            <ActionButton>🔍 Predict RUL</ActionButton>
          </Link>
          <Link href="/upload" passHref>
            <ActionButton>📤 Upload Data</ActionButton>
          </Link>
        </ButtonGroup>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 700px;
  margin: 4rem auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background-color: #005fcc;
  }
`;
