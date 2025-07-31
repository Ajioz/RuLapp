import HeroBreadcrumb from "@/components/Layout/breadcrumb";
import Layout from "../components/Layout";
import styled from "styled-components";

export default function DashboardPage() {
  return (
    <Layout title="Dashboard">
      <HeroBreadcrumb
        title="Dashboard"
        breadcrumbs={[
          { label: "Home", href: "/" },
        ]}
      />
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
