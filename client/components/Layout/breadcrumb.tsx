"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string; // If undefined, it's the current page
}

interface HeroBreadcrumbProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}


const HeroBreadcrumb: React.FC<HeroBreadcrumbProps> = ({
  title,
  breadcrumbs,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {crumb.href ? (
              <Link href={crumb.href}>{crumb.label}</Link>
            ) : (
              <span>{crumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </Breadcrumbs>
    </Container>
  );
};

export default HeroBreadcrumb;


// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  width: 100%;
  background: linear-gradient(rgba(8, 0, 58, 0.7), rgba(0, 58, 30, 0.462)),
    url("/images/main/hero_ext.jpg") no-repeat center center/cover;
  color: #ff8f00;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 200;
  margin-top: 200px;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
    font-family: Helvetica, sans-serif;
  }
`;

const Breadcrumbs = styled.nav`
  margin-top: 20px;
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;

  a {
    color: #ffcc80;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: #ffffffaa;
  }
`;