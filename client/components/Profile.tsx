"use client";

import React, { useState } from "react";
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
      <Heading>
        To manifest God's love and compassion in the life of all
      </Heading>

      <ButtonGroup>
        <InfoButton>
          <InfoIcon aria-hidden />
          Support Us
        </InfoButton>
        <InfoButton>
          <InfoIcon aria-hidden />
          Join Our Mission
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
    </Hero>
  );
};

const Profile: React.FC = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <Container>
        <Side>
          <HeroSection handleModal={handleModal} />
        </Side>
        <Side>
          <CampaignFundsCard amount="2,322" label="Campaign Fund" />
        </Side>
      </Container>
      {isOpen && <Modal setOpen={setIsOpen} />}
    </>
  );
};

export default Profile;
