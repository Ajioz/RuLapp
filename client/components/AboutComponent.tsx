// components/Profile.tsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Example about content – replace with your actual data if needed
const about = [
  {
    id: 1,
    title: "Our Mission",
    description:
      "To manifest God's love and compassion in the life of all, through humanitarian assistance and community development.",
  },
  {
    id: 2,
    title: "Our Vision",
    description:
      "A transformed society where love, compassion, and mutual assistance uplift the dignity of every person.",
  },
  {
    id: 3,
    title: "Our Work",
    description:
      "Our programs include community development, food security and nutrition, protection services, WASH, health, education, shelter, economic recovery, advocacy, and climate change adaptation.",
  },
];

// ===== Styled Components =====

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #fff;
  margin-bottom: 50px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/images/main/welcome.png");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
    opacity: 0.04;
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
    padding: 20px;
  }
`;

const Side = styled.div`
  flex: 1;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  width: 100%;
  background: url("/images/main/about_main.webp") no-repeat center
    center/contain;

  @media (max-width: 768px) {
    min-height: 50vh;
    padding: 10px;
  }
`;

const FundBubble = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 40px;
  right: 50px;
  background-color: #ff6f00;
  color: white;
  padding: 10px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  text-align: center;
  box-shadow: 12px 4px 20px 1px rgba(255, 111, 0, 0.6);

  @media (max-width: 768px) {
    top: 1px;
    right: -20px;
    width: 80px;
    height: 80px;
  }
`;

const Amount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Label = styled.span`
  font-size: 0.9rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
  max-width: 800px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 20px 0;
    max-width: 100%;
  }
`;

const Community = styled.p`
  color: #ff6600;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const InfoButton = styled.button`
  width: 230px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #fff;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 35px;
    font-size: 0.9rem;
  }
`;

const Icon = styled(FaCheckCircle)`
  color: #ff9900;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 550px;
  max-height: 90vh;
  padding: 20px 30px;
  background-color: #212121;
  border-radius: 20px;
  overflow-y: auto;
  z-index: 15;

  h1 {
    font-size: 16px;
    color: #ff8f00;
    text-transform: uppercase;
    margin-top: 20px;
  }

  p {
    color: #ddd;
    font-size: 16px;
    text-align: justify;
    margin: 5px 0;
  }

  @media (max-width: 768px) {
    width: 400px;
    h1 {
      font-size: 14px;
    }
  }
`;

const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

// Styled Custom Button (replaces CustomBtn)
const CustomBtn = styled.button<{ showHeart?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ showHeart }) => (showHeart ? "8px" : "0")};
  background-color: #ff6600;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #e65c00;
  }
`;

// ===== Components =====

const CampaignFundsCard: React.FC<{ amount: string; label: string }> = ({
  amount,
  label,
}) => (
  <Card>
    <FundBubble>
      <Amount>{amount}</Amount>
      <Label>{label}</Label>
    </FundBubble>
  </Card>
);

const Modal: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => (
  <ModalContainer>
    <ModalContent>
      <CloseIcon size={25} color="#fff" onClick={() => setOpen(false)} />
      {about.map(({ id, title, description }) => (
        <div key={id}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      ))}
    </ModalContent>
  </ModalContainer>
);

const HeroSection: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Hero>
      <Community>About Us</Community>
      <Heading>
        To manifest God's love and compassion in the life of all
      </Heading>

      <ButtonGroup>
        <InfoButton>
          <Icon /> Support Us
        </InfoButton>
        <InfoButton>
          <Icon /> Join Our Mission
        </InfoButton>
      </ButtonGroup>

      <Description>
        The Divine Assistance Relief Organisation (DARO) was established in 2024
        as a humanitarian organization to provide relief and developmental
        assistance to individuals and communities in Nigeria. DARO's mission is
        to improve the quality of life of people in need by assessing needs,
        creating awareness, providing resources, and working with communities,
        organisations, local churches and government. DARO provides assistance
        regardless of ethnicity, political affiliation, gender, or religious
        association. DARO's work includes community development; food security
        and nutrition; protection services; water, sanitation and hygiene
        (WASH); Health Services, Education; Shelter and Reconstruction; Economic
        Recovery and Livelihood; Advocacy and Policy Work, Climate Change
        Adaptation etc.
      </Description>

      <h4>CORE VALUES (ISEC)</h4>
      <Description>
        1. Integrity: maintaining honesty, transparency and moral uprightness in
        all decisions and actions;
      </Description>
      <Description>
        2. Service: humble dedication to serving others, following the example
        of Jesus Christ;
      </Description>
      <Description>
        3. Empathy: understand and share feelings, thoughts, or experiences of
        other people, and take action or offer support to alleviate their pains
        or struggle appropriately;
      </Description>
      <Description>
        4. Collaboration: Partnering with other organisations, government,
        ministries, local churches and communities to maximize impact.
      </Description>

      <CustomBtn onClick={() => setOpen(true)} showHeart>
        <FaHeart /> Learn More
      </CustomBtn>
      {open && <Modal setOpen={setOpen} />}
    </Hero>
  );
};

const Profile: React.FC = () => {
  return (
    <Container>
      <Side>
        <HeroSection />
      </Side>
      <Side>
        <CampaignFundsCard amount="2,322" label="Campaign Fund" />
      </Side>
    </Container>
  );
};

export default Profile;
