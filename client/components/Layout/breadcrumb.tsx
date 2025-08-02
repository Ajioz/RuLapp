"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode; // Optional icon
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
        {breadcrumbs.map((crumb, index) => {
          const content = (
            <BreadcrumbItemWrapper>
              <span>{crumb.label}</span>
              {crumb.icon && <span className="icon">{crumb.icon}</span>}
            </BreadcrumbItemWrapper>
          );

          return (
            <React.Fragment key={index}>
              {crumb.href ? <Link href={crumb.href}>{content}</Link> : content}
              {index < breadcrumbs.length - 1 && <Separator>/</Separator>}
            </React.Fragment>
          );
        })}
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
    url("/images/breadcrumb.webp") no-repeat center center/cover;
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
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  a {
    color: #ffcc80;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    &:hover {
      color: #fff;
    }
  }
`;

const BreadcrumbItemWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  .icon {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
  }
`;

const Separator = styled.span`
  color: #ffffffaa;
`;
