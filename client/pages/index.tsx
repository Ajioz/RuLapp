import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import RollOver from "@/components/Rollover";
import React from "react";

const LandingPage = () => {
  return (
    <Layout title="About">
      <Hero />
      <RollOver />
    </Layout>
  );
};

export default LandingPage;
