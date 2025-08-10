"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { about } from "@/data";
import { CustomBtn } from "./Layout/buy"; 



// ==================
// Components
// ==================
interface CampaignFundsCardProps {
  amount: string;
  label: string;
}

export const CampaignFundsCard: React.FC<CampaignFundsCardProps> = ({
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

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setOpen }) => (
  <ModalContainer>
    <ModalContent>
      <CloseIcon size={25} color="#000" onClick={() => setOpen(false)} />
      {about.map(({ id, title, description }) => (
        <div key={id}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      ))}
    </ModalContent>
  </ModalContainer>
);


interface buyProps {  
  showHeart?: boolean;
  value: string;  
  onClick: () => void;
}

export const HeroSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
    console.log("Modal Opened!");
  };

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

      <CustomBtn showHeart={false} value="Learn More" onClick={handleModal} />

      {isOpen && <Modal setOpen={setIsOpen} />}
    </Hero>
  );
};

const Profile: React.FC = () => {
  return (
    <Container>
      <Left>
        <HeroSection />
      </Left>
      <Right>
        <CampaignFundsCard amount="2,322" label="Campaign Fund" />
      </Right>
    </Container>
  );
};

export default Profile;


// ==================
// Styled Components
// ==================
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
`;

const Left = styled.div`
  flex: 2;
`;

const Right = styled.div`
  flex: 1;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FundBubble = styled.div`
  display: inline-block;
  padding: 1rem 2rem;
  background: #e6f4ea;
  border-radius: 50px;
`;

const Amount = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  display: block;
`;

const Label = styled.span`
  font-size: 1rem;
  color: #555;
`;

const Hero = styled.section`
  padding: 2rem;
  background-color: #f8f8f8;
`;

const Community = styled.p`
  font-weight: bold;
  color: #e63946;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const InfoButton = styled.button`
  background: #0077b6;
  color: white;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #023e8a;
  }
`;

const Icon = styled(FaCheckCircle)`
  font-size: 1.2rem;
`;

const Description = styled.p`
  line-height: 1.6;
  margin: 1rem 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.section`
  background: white;
  padding: 2rem;
  max-width: 600px;
  border-radius: 8px;
  position: relative;
  overflow-y: auto;
  max-height: 80vh;
`;

const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;