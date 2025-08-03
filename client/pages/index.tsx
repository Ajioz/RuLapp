import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import RollOver from "@/components/Rollover";
import React from "react";


const homeHead = {  headTitle: "Ajiozi | Remaining Useful Life (RUL) Predictive Maintenance Solutions",
  description:
    "Ajiozi provides advanced Remaining Useful Life (RUL) predictive maintenance solutions to optimize asset performance, reduce downtime, and extend equipment lifespan.",
  keywords:
    "Ajiozi, RUL, predictive maintenance, remaining useful life, asset management, equipment monitoring, machine learning, industrial IoT, predictive analytics",
};

const LandingPage = () => {
  return (
    <Layout title="About" head={homeHead}>
      <Hero />
      <RollOver />
    </Layout>
  );
};

export default LandingPage;
