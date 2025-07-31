import styled from "styled-components";
import Link from "next/link";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

const FooterWrapper = styled.footer`
  background-color: #f9f9f9;
  border-top: 1px solid #eaeaea;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
`;

const FooterLinks = styled.div`
  margin-bottom: 0.5rem;

  a {
    margin: 0 0.5rem;
    color: #0070f3;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialIcons = styled.div`
  margin-top: 0.5rem;

  a {
    margin: 0 0.3rem;
    color: #555;
    transition: color 0.2s;

    &:hover {
      color: #0070f3;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterLinks>
        <Link href="/">Home</Link> | <Link href="/rul">Predict</Link> |{" "}
        <Link href="/upload">Upload</Link>
      </FooterLinks>

      <SocialIcons>
        <Link href="https://github.com" target="_blank">
          <IoLogoGithub size={20} />
        </Link>
        <Link href="https://linkedin.com" target="_blank">
          <IoLogoLinkedin size={20} />
        </Link>
      </SocialIcons>

      <p style={{ marginTop: "0.5rem" }}>
        © {new Date().getFullYear()} RuLApp. All rights reserved.
      </p>
    </FooterWrapper>
  );
}
