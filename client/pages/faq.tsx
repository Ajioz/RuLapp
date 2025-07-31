import Layout from "../components/Layout/Layout_bkup";
import styled from "styled-components";

export default function FAQPage() {
  return (
    <Layout title="FAQ">
      <Container>
        <h1>❓ FAQ</h1>
        <ul>
          <li>Q: What input data format is accepted?</li>
          <li>A: CSV or TXT with engine sensor readings.</li>
        </ul>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;
