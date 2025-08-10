import HeroBreadcrumb from "@/components/Layout/breadcrumb";
import Layout from "@/components/Layout";
import { IoFingerPrintSharp } from "react-icons/io5";
import styled from "styled-components";
import AboutComponent from "@/components/Profile";

const aboutHead = {
  headTitle: "About Us | Learn More About Our Platform",
  description:
    "Discover Ajiozi, a platform dedicated to predicting the Remaining Useful Life (RUL) of engines using advanced machine learning models and SHAP explanations.",
  keywords:
    "Ajiozi, about, RUL prediction, machine learning, SHAP explanations, engine health",
};

export default function AboutPage() {
  return (
    <Layout title="About" head={aboutHead}>
      <HeroBreadcrumb
        title="About Our Platform"
        breadcrumbs={[
          { label: "Home", icon: <IoFingerPrintSharp />, href: "/" },
        ]}
      />
      <Container>
        {/* <Profile /> */}
        <AboutComponent />
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;
