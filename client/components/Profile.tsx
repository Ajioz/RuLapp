"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@/components/common/Modal"; // ✅ Import reusable modal

const Profile: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ProfileContainer>
      <HeaderSection>
        <h2>Our Mission</h2>
        <p>
          The Divine Assistance Relief Organisation (DARO) was established in
          2024 as a humanitarian organization to provide relief and
          developmental assistance to individuals and communities in Nigeria.
        </p>
        <LearnMoreButton onClick={() => setOpenModal(true)}>
          Learn More
        </LearnMoreButton>
      </HeaderSection>

      {/* ✅ Reusable Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h1>About DARO</h1>
        <p>
          The Divine Assistance Relief Organisation (DARO) was established in
          2024 as a humanitarian organization to provide relief and
          developmental assistance to individuals and communities in Nigeria.
        </p>
        <p>
          Our work includes: community development, food security and nutrition,
          protection services, water, sanitation and hygiene (WASH), health
          services, education, shelter and reconstruction, economic recovery and
          livelihood, advocacy, and climate change adaptation.
        </p>
      </Modal>
    </ProfileContainer>
  );
};


export default Profile;


// -------------------- Styled Components --------------------
const ProfileContainer = styled.div`
  padding: 50px 20px;
  background-color: #101010;
  color: #ddd;
  text-align: center;
`;

const HeaderSection = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 28px;
    color: #ff8f00;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    color: #ccc;
    line-height: 1.6;
  }
`;

const LearnMoreButton = styled.button`
  margin-top: 20px;
  background-color: #ff8f00;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #e07b00;
  }
`;
