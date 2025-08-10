"use client";

import React, { useState, useCallback } from "react";
import { about } from "@/data";
import { CustomBtn } from "@/components/Layout/buy";
import {
  Amount,
  ButtonGroup,
  Card,
  CheckIcon,
  CloseIcon,
  Community,
  Container,
  Description,
  FundBubble,
  Heading,
  Hero,
  InfoButton,
  InfoIcon,
  Label,
  Side,
  ModalContainer,
  ModalContent,
} from "./styles/ProfileStyles";

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
      <Label>
        <CheckIcon aria-hidden />
        <span>{label}</span>
      </Label>
    </FundBubble>
  </Card>
);

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setOpen }) => (
  <ModalContainer role="dialog" aria-modal>
    <ModalContent>
      <CloseIcon
        aria-label="Close modal"
        size={22}
        onClick={() => setOpen(false)}
      />
      {about.map(({ id, title, description }) => (
        <div key={id}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      ))}
    </ModalContent>
  </ModalContainer>
);

interface HeroSectionProps {
  handleModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ handleModal }) => {
  return (
    <Hero>
      <Community>About Us</Community>
      <Heading> Powering Industry 4.0 Through Intelligent Automation</Heading>

      <ButtonGroup>
        <InfoButton>
          <InfoIcon aria-hidden />
          Our Solutions
        </InfoButton>
        <InfoButton>
          <InfoIcon aria-hidden />
          Partner With Us
        </InfoButton>
      </ButtonGroup>

      <Description>
        Ajiozi is a leading systems integration and industrial automation
        company driving the future of smart industry. We specialize in
        end-to-end digital transformation for critical infrastructure,
        delivering robust solutions in wellhead automation, remote monitoring,
        predictive maintenance, and process optimization using IoT, machine
        learning, and real-time data analytics.
      </Description>

      <Description>
        From oilfield operations to manufacturing plants, we design and deploy
        intelligent systems that enhance safety, efficiency, and reliability.
        Our integrated platforms enable clients to monitor assets remotely,
        automate complex processes, and make data-driven decisions with
        precision and confidence.
      </Description>

      <h4>CORE VALUES (ISEC)</h4>
      <Description>
        1. Integrity: We build trusted partnerships through transparent
        engineering, secure systems, and ethical innovation.
      </Description>
      <Description>
        2. Innovation: We push the boundaries of industrial technology,
        leveraging AI, edge computing, and cloud-connected systems to solve
        real-world challenges.
      </Description>
      <Description>
        3. Excellence: We deliver mission-critical solutions with precision,
        reliability, and zero compromise on quality or safety.
      </Description>
      <Description>
        4. Collaboration: We work closely with clients, engineers, and field
        operators to co-develop systems that fit operational realities and scale
        with future needs.
      </Description>

      <CustomBtn showHeart={false} value="Learn More" onClick={handleModal} />
    </Hero>
  );
};

const Profile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  },[]);

  return (
    <>
      <Container>
        <Side>
          <HeroSection handleModal={handleModal} />
        </Side>
        <Side>
          <CampaignFundsCard amount="1,022 Failure" label="Predicted" />
        </Side>
      </Container>
      {isOpen && <Modal setOpen={setIsOpen} />}
    </>
  );
};

export default Profile;
