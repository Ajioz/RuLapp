import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #fff;
  margin-bottom: 50px;

  /* background watermark */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/images/welcome.png");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
    opacity: 0.04;
    z-index: 1;
    pointer-events: none;
  }

  /* ensure children sit above the pseudo-element */
  & > * {
    position: relative;
    z-index: 2;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    min-height: auto;
    padding: 20px;

    &::before {
      opacity: 0.06;
    }
  }
`;

export const Side = styled.div`
  flex: 1;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* original had center; internal hero still uses flex-start */
  margin: 10px;
  z-index: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
  }
`;

/* Card */
export const Card = styled.div`
  position: relative;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  width: 100%;
  background-color: #212121;
  background: url("/images/about_main.webp") no-repeat center center/contain;
  z-index: 1;

  @media screen and (max-width: 768px) {
    min-height: 50vh;
    width: 100%;
    padding: 10px;
  }
`;

/* Fund bubble (absolute in Card) */
export const FundBubble = styled.div`
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

  @media screen and (max-width: 768px) {
    top: 1px;
    right: -20px;
    width: 80px;
    height: 80px;
    font-size: 0.9rem;
  }
`;

/* Amount & Label inside fund bubble */
export const Amount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  display: block;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: inherit;

  span {
    display: inline-block;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

/* check icon inside label (keeps spacing consistent) */
export const CheckIcon = styled(FaCheckCircle)`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.95); /* visible on orange */
`;

/* Hero section */
export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 50px;
  max-width: 800px;
  margin: auto;

  @media screen and (max-width: 768px) {
    padding: 20px 0;
    max-width: 100%;
    margin: 0;
    background-color: transparent;
  }
`;

export const Community = styled.div`
  color: #ff6600;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

export const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 50px;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;

  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;

/* original infoButton style (white pill) */
export const InfoButton = styled.button`
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #f9f9f9;
  }

  @media screen and (max-width: 768px) {
    width: 160px;
    height: 35px;
    padding: 8px 15px;
    font-size: 0.9rem;
  }
`;

/* small icon inside buttons (orange) */
export const InfoIcon = styled.span`
  color: #ff9900;
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
`;

/* description & CTA */
export const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
  text-align: justify;

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

/* Modal */
export const ModalContainer = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 550px;
  min-height: 60vh;
  padding: 20px 30px;
  background-color: #212121;
  border-radius: 20px;
  overflow: auto;

  h1 {
    font-size: 15px;
    color: #ff8f00;
    text-transform: uppercase;
    margin: 20px 0 0 0;
  }

  p {
    color: #ddd;
    font-family: "Poppins", Verdana, Geneva, Tahoma, sans-serif;
    font-size: 13px;
    text-align: justify;
    margin: 5px 0;
  }

  @media screen and (max-width: 768px) {
    width: 400px;

    h1 {
      font-size: 14px;
      margin: 15px 0 0 0;
    }

    p {
      font-size: 18px;
    }
  }
`;

export const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  color: #fff;
`;
