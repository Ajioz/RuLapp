"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

interface RollOverProps {
  messages?: string[];
  speed?: number; // in seconds
  backgroundColor?: string;
  textColor?: string;
}

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - 20px));
  }
`;

const MarqueeSection = styled.div<{ backgroundColor: string }>`
  position: relative;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 15px 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Marquee = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 20px;
`;

const MarqueeGroup = styled.div<{ speed: number }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  animation: ${scroll} ${({ speed }) => speed}s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-play-state: paused;
  }
`;

const Text = styled.div<{ textColor: string }>`
  font-size: 14px;
  line-height: 36px;
  font-weight: bolder;
  color: ${({ textColor }) => textColor};
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 0.1em;
`;

const RollOver: React.FC<RollOverProps> = ({
    messages = [
        "*Industry 4.0 Transformation",
        "*Leadership in Digital Innovation",
        "*Industrial Automation Solutions",
        "*Anomaly Detection Systems",
        "*Wellhead Insight Analytics",
        "*Predictive Maintenance Strategies",
        "*IoT-Enabled Operations",
        "*Smart Manufacturing Processes",
        "*Real-Time Data Monitoring",
        "*Connected Industrial Assets",
    ],
    speed = 30,
    backgroundColor = "#212121",
    textColor = "#fff",
}) => {
    return (
        <MarqueeSection backgroundColor={backgroundColor}>
            <Marquee>
                <MarqueeGroup speed={speed}>
                    {messages.map((msg, i) => (
                        <Text key={i} textColor={textColor}>
                            {msg}
                        </Text>
                    ))}
                </MarqueeGroup>
                <MarqueeGroup speed={speed} aria-hidden="true">
                    {messages.map((msg, i) => (
                        <Text key={`clone-${i}`} textColor={textColor}>
                            {msg}
                        </Text>
                    ))}
                </MarqueeGroup>
            </Marquee>
        </MarqueeSection>
    );
};

export default RollOver;
