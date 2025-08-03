"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {
  IoCall,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoYoutube,
  IoMailOpen,
} from "react-icons/io5";
import NewsLetter from "../Newsletter";



const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <NewsLetter />
      <Content>
        <Left>
          <Image
            src="/images/logo/logo-3.png"
            alt="daro"
            width={100}
            height={40}
          />
          <p>
            Strives to alleviate suffering, because it is compassionate, but
            occasionally circumstances.
          </p>
          <SocialIcons>
            <ul>
              <li>
                <Link
                  href="https://www.instagram.com/daro-nigeria"
                  target="_blank"
                >
                  <IoLogoInstagram size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="whatsapp://send?text=Hello, I am interested in learning more about your NGO. Could you please provide more details?&phone=+2347032942993"
                  target="_blank"
                >
                  <IoLogoWhatsapp size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/share/15zivZkprA/"
                  target="_blank"
                >
                  <IoLogoFacebook size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtube.com/@daronigeria?si=oOXRbxEXtVRxNxCM"
                  target="_blank"
                >
                  <IoLogoYoutube size={20} />
                </Link>
              </li>
            </ul>
          </SocialIcons>
        </Left>

        <Section>
          <h3>
            EXPLORE <span>—</span>
          </h3>
          <ul>
            <li>
              <Link href="/about">About Daro</Link>
            </li>
            <li>
              <Link href="/about">Meet the Team</Link>
            </li>
            <li>
              <Link href="/blog">News & Media</Link>
            </li>
            <li>
              <Link href="/programs">Our Projects</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link> | <Link href="#">FAQ</Link>
            </li>
          </ul>
        </Section>

        <Section>
          <h3>
            CONTACT <span>—</span>
          </h3>
          <p>#31 Airport Road, Lagos, Nigeria</p>
          <p>
            <IoMailOpen size={20} />{" "}
            <Link href="mailto:info@daro.ng.org">info@daro.ng.org</Link>
          </p>
          <p>
            <IoCall size={20} /> +234 7032942993
          </p>
          <p>
            <IoCall size={20} /> +234 7064799193
          </p>
        </Section>

        <Projects>
          <h3>
            PROJECTS <span>—</span>
          </h3>
          <ProjectGrid>
            <Image
              src="/images/footer/footer1.jpg"
              alt="Project 1"
              width={80}
              height={80}
            />
            <Image
              src="/images/footer/footer2.jpg"
              alt="Project 2"
              width={80}
              height={80}
            />
            <Image
              src="/images/footer/footer3.webp"
              alt="Project 3"
              width={80}
              height={80}
            />
            <Image
              src="/images/footer/footer4.jpg"
              alt="Project 4"
              width={80}
              height={80}
            />
            <Image
              src="/images/footer/footer5.jpg"
              alt="Project 5"
              width={80}
              height={80}
            />
            <Image
              src="/images/footer/footer6.jpg"
              alt="Project 6"
              width={80}
              height={80}
            />
          </ProjectGrid>
        </Projects>
      </Content>

      <BottomBar>
        <p>
          © 2024 - {new Date().toLocaleDateString("en-US", { year: "numeric" })}{" "}
          | Daro Nigeria. All rights reserved.
        </p>
        <p>
          powered by{" "}
          <Link href="https://ajiozi.com" target="_blank">
            Ajiozi
          </Link>
        </p>
      </BottomBar>
    </FooterWrapper>
  );
};

export default Footer;



const FooterWrapper = styled.footer`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #212121;
  color: white;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

/* Inner content wrapper */
const Content = styled.div`
  padding: 80px 60px;
  min-height: 80vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
    padding: 40px 20px;
  }
`;

const Left = styled.div`
  flex: 1;
  max-width: 300px;

  p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 20px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: flex-start;

  ul {
    list-style: none;
    display: flex;
    gap: 12px;
    padding: 0;
    margin: 0;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    color: black;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 3px 5px rgba(255, 255, 255, 0.2);

    &:hover {
      transform: scale(1.1);
    }

    &[href*="instagram.com"] {
      color: #833ab4;
      &:hover {
        background: #833ab4;
        color: white;
      }
    }
    &[href*="whatsapp"] {
      color: #25d366;
      &:hover {
        background: #25d366;
        color: white;
      }
    }
    &[href*="facebook"] {
      color: #1877f2;
      &:hover {
        background: #1877f2;
        color: white;
      }
    }
    &[href*="youtube.com"] {
      color: red;
      &:hover {
        background: red;
        color: white;
      }
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Section = styled.div`
  flex: 1;
  width: 300px;

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    span {
      color: orange;
      margin-left: 5px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    margin-bottom: 8px;
  }

  ul li a {
    color: white;
    font-size: 14px;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      text-decoration: underline;
      color: #f0f0f0;
    }
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const Projects = styled.div`
  flex: 1;
  max-width: 300px;

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    span {
      color: orange;
      margin-left: 5px;
    }
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 10px;

  img {
    width: 100%;
    height: 60px;
    object-fit: cover;
    border: 1px solid white;
    border-radius: 5px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BottomBar = styled.div`
  background-color: #000;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    margin: 5px 0;
    color: #fff;
    font-size: 14px;

    a {
      color: skyblue;
      text-decoration: none;
    }
  }
`;