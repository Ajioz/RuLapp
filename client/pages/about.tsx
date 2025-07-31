import HeroBreadcrumb from "@/components/Layout/breadcrumb";
import Layout from "../components/Layout";
import {
  IoFingerPrintSharp,
} from "react-icons/io5";

import styled from "styled-components";

export default function AboutPage() {
  return (
    <Layout title="About">
      <HeroBreadcrumb
        title="About Our Platform"
        breadcrumbs={[
          { label: "Home", icon: <IoFingerPrintSharp />, href: "/" },
          { label: "Go Home", href: "/" },
        ]}
      />
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
