"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {
  IoCall,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoWhatsapp,
  IoLogoYoutube,
  IoMailOpen,
} from "react-icons/io5";
// import NewsLetter from "../Newsletter";



const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      {/* <NewsLetter /> */}
      <Content>
        <Left>
          <Image src="/logo.png" alt="rul" width={60} height={60} style={{borderRadius: "50%"}} />
          <p>
            Designed to predict remaining useful life for informed planning,
            while accounting for the occasional impact of unexpected operational
            factors
          </p>
          <SocialIcons>
            <ul>
              <li>
                <Link href="https://www.instagram.com/" target="_blank">
                  <IoLogoInstagram size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="whatsapp://send?text=Hello, I am interested in learning more about your NGO. Could you please provide more details?&phone=+2348151654368"
                  target="_blank"
                >
                  <IoLogoWhatsapp size={20} />
                </Link>
              </li>
              <li>
                <Link href="https://x.com/" target="_blank">
                  <IoLogoTwitter size={20} />
                </Link>
              </li>
              <li>
                <Link href="https://youtube.com/@rul" target="_blank">
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
              <Link href="/about">Ajiozi Ltd</Link>
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
          <p>#31 Airport Road, Delta, Nigeria</p>
          <p>
            <IoMailOpen size={20} />{" "}
            <Link href="mailto:ajiozi@ajiozi.com">ajiozi@ajiozi.com</Link>
          </p>
          <p>
            <IoCall size={20} /> +234 8151654368
          </p>
          <p>
            <IoCall size={20} /> +234 8064107055
          </p>
        </Section>

        <Projects>
          <h3>
            PROJECTS <span>—</span>
          </h3>
          <ProjectGrid>
            <Image
              src="/images/rollover_1.webp"
              alt="Project 1"
              width={80}
              height={80}
            />
            <Image
              src="/images/rollover_2.webp"
              alt="Project 2"
              width={80}
              height={80}
            />
            <Image
              src="/images/rollover_3.webp"
              alt="Project 3"
              width={80}
              height={80}
            />
            <Image
              src="/images/rollover_4.webp"
              alt="Project 4"
              width={80}
              height={80}
            />
            <Image
              src="/images/rollover_5.webp"
              alt="Project 5"
              width={80}
              height={80}
            />
            <Image
              src="/images/rollover_6.webp"
              alt="Project 6"
              width={80}
              height={80}
            />
          </ProjectGrid>
        </Projects>
      </Content>

      <BottomBar>
        <p>
          © {new Date().toLocaleDateString("en-US", { year: "numeric" })} -
          Ajiozi Ltd | All rights reserved.
        </p>
      </BottomBar>
    </FooterWrapper>
  );
};

export default Footer;



const FooterWrapper = styled.footer`
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #0a2342; /* Navy Blue */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

/* Inner content wrapper */
const Content = styled.div`
  padding: 80px 60px;
  min-height: 40vh;
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
    color: #e0e0e0; /* Light gray for better readability */
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
    background: #e0e0e0; /* Light gray background */
    color: #0a2342; /* Navy icon color */
    transition: all 0.3s ease-in-out;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: scale(1.1);
    }

    &[href*="instagram.com"] {
      color: #e65100; /* Industrial Orange */
      &:hover {
        background: #e65100;
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
      color: #c1121f; /* Engine Red */
      &:hover {
        background: #c1121f;
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
      color: #ffb400; /* Safety Yellow accent */
      margin-left: 5px;
    }
  }

  ul li a {
    color: #e0e0e0;
    font-size: 14px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: #ffffff;
    }
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #e0e0e0;
  }
`;

const Projects = styled.div`
  flex: 1;
  max-width: 300px;

  h3 span {
    color: #ffb400;
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
    border: 1px solid #e0e0e0;
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
  background-color: #1c1c1c; /* Gunmetal Black */
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    margin: 5px 0;
    color: #e0e0e0;
    font-size: 14px;

    a {
      color: #ffb400;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
