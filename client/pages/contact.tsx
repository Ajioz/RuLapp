"use client";

import React from "react";
import styled from "styled-components";
import { FaPhoneAlt, FaEnvelope, FaChurch } from "react-icons/fa";
import Layout from "@/components/Layout";
import HeroBreadcrumb from "@/components/Layout/breadcrumb";
import { IoFingerPrintSharp, IoHome } from "react-icons/io5";

const contactHead = {
  headTitle: "Contact Ajiozi | Get in Touch with Us",
  description:
    "Reach out to Daro for any inquiries, support, or partnership opportunities. We are here to assist you and provide information about our initiatives in sustainable development, education, healthcare, and environmental conservation.",
  keywords:
    "RUL, contact, inquiries, support, partnership, sustainable development, community insight, impact, machine-learning, education, machine health, environmental conservation, Ajiozi",
};

const Contact: React.FC = () => {
  return (
    <Layout title="Contact Us" head={contactHead}>
      <HeroBreadcrumb
        title="We Love to Hear From You"
        breadcrumbs={[
          { label: "Home", icon: <IoFingerPrintSharp />, href: "/" },
          { label: "Go Home", href: "/" },
        ]}
      />
      <Container>
        <Wrapper>
          {/* LEFT SIDE */}
          <Left>
            <Title>Get in Touch</Title>
            <Description>
              Have questions or need assistance? We're here to help. Reach out
              to us anytime, and we'll get back to you as soon as possible.
            </Description>

            <ContactItem>
              <IconBox>
                <FaChurch color="white" />
              </IconBox>
              <div>
                <ContactDetailsTitle>Locate Agent</ContactDetailsTitle>
                <ContactDetailsText>Ajiozi Dev Team</ContactDetailsText>
                <p>#31 Airport Road, Delta, Nigeria</p>
              </div>
            </ContactItem>

            <ContactItem>
              <IconBox>
                <FaPhoneAlt color="white" />
              </IconBox>
              <div>
                <ContactDetailsTitle>Call Us</ContactDetailsTitle>
                <ContactDetailsText>+234-806-410-7055</ContactDetailsText>
              </div>
            </ContactItem>

            <ContactItem>
              <IconBox>
                <FaEnvelope color="white" />
              </IconBox>
              <div>
                <ContactDetailsTitle>Email Us</ContactDetailsTitle>
                <ContactDetailsText>support@daronigeria.org</ContactDetailsText>
              </div>
            </ContactItem>
          </Left>

          {/* RIGHT SIDE */}
          <Right>
            <Title>Contact Us</Title>
            <Form>
              <Row>
                <InputField type="text" placeholder="First Name" />
                <InputField type="text" placeholder="Last Name" />
              </Row>
              <Row>
                <InputField type="email" placeholder="Your Email" />
                <InputField type="text" placeholder="Subject" />
              </Row>
              <TextArea placeholder="Write your message here..." />
              <Button type="submit">Submit</Button>
            </Form>
          </Right>
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default Contact;

/* === Styled Components === */

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-content: center;
  justify-content: center;
  padding: 2rem;
  background-color: #141414;
  color: #fff;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  background-color: #141414;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Left = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Right = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #bbb;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    text-align: center;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  border-radius: 5px;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const ContactDetailsTitle = styled.h4`
  margin: 0;
  font-weight: bold;
`;

const ContactDetailsText = styled.p`
  margin: 0.2rem 0 0;
  color: #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const InputField = styled.input`
  flex: 1;
  padding: 0.75rem;
  background-color: #2d2d2d;
  border: none;
  color: white;
  border-radius: 4px;
  outline: none;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  height: 150px;
  resize: none;
  background-color: #2d2d2d;
  border: none;
  color: white;
  border-radius: 4px;
  outline: none;
`;

const Button = styled.button`
  background-color: #fc814a;
  color: white;
  padding: 0.75rem 2rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
  align-self: flex-start;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e66a2e;
  }

  @media (max-width: 768px) {
    align-self: center;
    width: 100%;
    text-align: center;
  }
`;
