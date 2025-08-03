"use client";

import React, { useState } from "react";
import styled from "styled-components";



const NewsLetter: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with your subscription API call
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <Container>
      <h1>Subscribe to our Newsletter</h1>
      <p>
        Stay updated with the latest news and exclusive offers. Join our
        community and never miss out!
      </p>
      <Wrapper>
        <FormWrapper onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <DonateBtn type="submit">
            <span>Subscribe</span>
          </DonateBtn>
        </FormWrapper>
      </Wrapper>
    </Container>
  );
};

export default NewsLetter;


const Container = styled.div`
  width: 70%;
  height: 300px;
  background-color: #212121;
  border-radius: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  box-shadow: 1px 2px 15px -1px rgba(0, 0, 0, 1);
  margin: 0 auto -20vh auto;
  z-index: 1;

  h1 {
    color: white;
    font-size: 2.5rem;
  }

  p {
    color: #bebbbb;
    font-size: 1.1rem;
    font-weight: 100;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 480px) {
    width: 95%;
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.8rem;
      width: 90%;
    }
  }
`;

const Wrapper = styled.section`
  width: 40%;
  background-color: #212121;
  height: 50px;

  @media screen and (max-width: 768px) {
    width: 60%;
  }

  @media screen and (max-width: 480px) {
    width: 80%;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  border-radius: 30px;
  padding: 5px;

  input {
    border: none;
    background-color: inherit;
    outline: none;
    height: 20px;
    margin-left: 10px;
    font-size: 1rem;

    @media screen and (max-width: 768px) {
      font-size: 0.9rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const DonateBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  align-items: center;
  width: 120px;
  height: 40px;
  background-color: #e65100;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
  border: none;
  transition: color 0.3s ease-in-out;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #222;
    border-radius: 30px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
    z-index: 0;
  }

  span {
    color: #fff;
    position: relative;
    z-index: 1;
    font-size: 0.9rem;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media screen and (max-width: 768px) {
    height: 30px;
    span {
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 480px) {
    height: 40px;
    span {
      font-size: 0.7rem;
    }
  }
`;