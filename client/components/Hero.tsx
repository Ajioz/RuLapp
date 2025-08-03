"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Image from "next/image";

// Importing images and information for the hero section
const images = [
  "/images/rollover_1.webp",
  "/images/rollover_3.webp",
  "/images/rollover_4.webp",
  "/images/rollover_5.webp",
];

// Information to be displayed in the hero section
// Each object contains a header and text for the hero section
const info = [
  { header: "Predict Remaining Useful Life with Confidence", text: "" },
  { header: "Advanced Machine Learning for Accurate RUL", text: "" },
  { header: "Optimize Maintenance and Reduce Downtime", text: "" },
  { header: "Empower Your Asset Management Decisions", text: "" },
  { header: "Seamless Integration for Smart Operations", text: "" },
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [track, setTrack] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const trackManager = useCallback((index: number) => {
   setTrack((prev) => ( prev = index))
  }, [track]);

  return (
    <HeroContainer>
      <BackgroundContainer>
        {images.map((img, index) => {
          trackManager(index);
          return (
            <BackgroundLayer
              key={img}
              $image={img}
              $active={index === currentIndex}
              $fading={index === prevIndex}
            />
          );
        })}
      </BackgroundContainer>

      <GradientOverlay />

      <HeroText>
        <h1>{info[track].header}</h1>
        <p>{info[track].text}</p>
        <button>
          Get Started
          <Image src="/images/arrow.png" alt="arrow" width={16} height={16} />
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface BackgroundLayerProps {
  $active: boolean;
  $fading: boolean;
  $image: string;
}

const BackgroundLayer = styled.div<BackgroundLayerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: left center;
  background-image: ${({ $image }) => `url(${$image})`};
  opacity: 0;
  transition: opacity 1.5s ease-in-out;

  ${({ $active }) =>
    $active &&
    css`
      opacity: 1;
      z-index: 2;
      animation: ${fadeIn} 1.5s ease-in-out;
    `}

  ${({ $fading }) =>
    $fading &&
    css`
      opacity: 0;
    `}
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(8, 0, 58, 0.7), rgba(0, 58, 30, 0.462));
  z-index: 2;
`;

const HeroText = styled.div`
  text-align: center;
  max-width: 1000px;
  position: relative;
  z-index: 3;

  h1 {
    font-size: 60px;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 40px;
    }
  }

  p {
    max-width: 700px;
    margin: 10px auto 20px;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 18px;
    }
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

    img {
      width: 16px;
      height: 16px;
    }
  }
`;
