"use client";

import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Image from "next/image";

const images = [
  "/images/rollover_1.webp",
  "/images/rollover_3.webp",
  "/images/rollover_4.webp",
  "/images/rollover_5.webp",
  "/images/rollover_6.webp",
];

const info = [
  {
    header: "Advanced Machine Learning for Accurate RUL",
    text: "By analyzing complex sensor data with sophisticated algorithms, our system delivers highly accurate RUL predictions that continuously improve as more operational data becomes available.",
  },
  {
    header: "Optimize Maintenance and Reduce Downtime",
    text: "Prevent costly, unplanned equipment failures and maximize uptime. Our insights help you schedule maintenance exactly when it's needed, reducing waste and avoiding premature part replacements.",
  },
  {
    header: "Empower Your Asset Management Decisions",
    text: "Gain actionable insights into the health of your critical assets, enabling informed decisions that extend equipment lifespan, improve safety, and boost operational efficiency.",
  },
  {
    header: "Predict Remaining Useful Life with Confidence",
    text: "Our platform leverages state-of-the-art machine learning models to provide precise RUL forecasts, helping you shift from reactive repairs to a proactive, data-driven maintenance strategy.",
  },
  {
    header: "Maximize ROI Through Predictive Insights",
    text: "Unlock the full potential of your assets by aligning predictive analytics with business goals, ensuring every maintenance decision contributes to profitability and long-term sustainability.",
  },
];



const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <HeroContainer>
      <BackgroundContainer>
        {images.map((img, index) => (
          <BackgroundLayer
            key={img}
            $image={img}
            $active={index === currentIndex}
          />
        ))}
      </BackgroundContainer>
      <GradientOverlay />
      <HeroText>
        <h1>{info[currentIndex].header}</h1>
        <p>{info[currentIndex].text}</p>
        <button>
          Get Started
          <Image src="/images/arrow.png" alt="Go to Get Started" width={16} height={16} />
        </button>
      </HeroText>
    </HeroContainer>
  );
};

export default Hero;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const HeroContainer = styled.div`
  width: 100%;
  margin-top: 100px;
  min-height: 100vh;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;
`;

interface BackgroundLayerProps {
  $active: boolean;
  $image: string;
}

const BackgroundLayer = styled.div<BackgroundLayerProps>`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: left center;
  background-image: ${({ $image }) => `url(${$image})`};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
  ${({ $active }) =>
    $active &&
    css`
      animation: ${fadeIn} 1.5s ease-in-out;
    `}
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(8, 0, 58, 0.7), rgba(150, 93, 55, 0.462));
  z-index: 2;
`;

const HeroText = styled.div`
  text-align: center;
  max-width: 1000px;
  position: relative;
  z-index: 3;

  h1 {
    font-size: clamp(1.8rem, 5vw, 3.5rem);
    font-weight: 600;
  }

  p {
    max-width: 700px;
    margin: 10px auto 20px;
    line-height: 1.4;
    font-size: clamp(1rem, 2.5vw, 1.25rem);
  }

  button {
    background: #ff8f00;
    border: none;
    padding: 12px 20px;
    font-size: 1rem;
    color: #fff;
    cursor: pointer;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background 0.3s ease-in-out;

    &:hover {
      background: #e07b00;
    }
  }
`;
