import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import useNavbarMonitor from "./useNavbarMonitor";
import Donate from "./donate";
import { getLinks as menu } from "../../data";

interface MenuItem {
  title: string;
  link: string;
}

interface HelpLink {
  text: string;
  href: string;
}

import { NextRouter } from "next/router";

interface DesktopNavProps {
  title?: string;
  loggedIn?: boolean;
  router: NextRouter;
  target: { isHome: boolean; targetKey: string }; 
}
/**
 * Desktop Navigation Component
 * @param {DesktopNavProps} props - Properties for the desktop navigation
 */

export default function DesktopNav({ router, title, loggedIn, target }: DesktopNavProps) {
  const { navbarRef, isOutOfView } = useNavbarMonitor();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const delayTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (delayTimeout.current) clearTimeout(delayTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    delayTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 500);
  };

  const helpLinks: HelpLink[] = [
    { text: "Help Centre", href: "#" },
    { text: "Contact Us", href: "#" },
    { text: "Need Prayer", href: "#" },
    { text: "Report Emergency", href: "#" },
    { text: "FAQs", href: "#" },
  ];

  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);

  const goLink = useCallback(
    (link: string) => {
      router.push(link);
    },
    [router]
  );

  return (
    <NavbarContainer>
      <MainNavbar ref={navbarRef}>
        <Image
          src="/images/logo/logo-2.png"
          alt="Logo"
          height={36}
          width={114}
          onClick={goHome}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
        <NavList>
          {menu(false).map(({ label, href }) => (
            <NavItem key={label} onClick={() => goLink(href)}>
              {label}
            </NavItem>
          ))}
        </NavList>
        <HelpWrapper
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Help</span>
          <Dropdown $open={isDropdownOpen}>
            {helpLinks.map((link, idx) => (
              <a key={idx} href={link.href}>
                {link.text}
              </a>
            ))}
          </Dropdown>
        </HelpWrapper>
      </MainNavbar>

      <SecondaryNavbar $visible={isOutOfView}>
        <Section>
          <NavList>
            {menu(false).map(({ label, href }) => (
              <NavItem key={label + href} onClick={() => goLink(href)}>
                {label}
              </NavItem>
            ))}
          </NavList>
          <Donate />
        </Section>
      </SecondaryNavbar>
    </NavbarContainer>
  );
}

/* Styled Components */
const NavbarContainer = styled.div`
  margin: -100px auto;
  z-index: 10;
  position: relative;
  top: 100px;
  width: 100%;
  background: transparent;
  box-shadow: 2px 1px 2px 2px rgba(0, 0, 0, 0.3);
  font-size: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MainNavbar = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavList = styled.ul`
  width: 650px;
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 1px;
    background-color: gold;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

const SecondaryNavbar = styled.div<{ $visible: boolean }>`
  height: 100px;
  background-color: #263238;
  color: white;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const HelpWrapper = styled.div`
  position: relative;
  cursor: pointer;
  color: #fff;
  width: 50px;
  margin: 0 10px;
`;

const Dropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  border-radius: 5px;
  width: 150px;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out,
    visibility 0.3s;
  visibility: hidden;
  pointer-events: none;

  ${({ $open }) =>
    $open &&
    css`
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
      pointer-events: auto;
    `}

  a {
    display: block;
    font-size: 13px;
    padding: 10px 15px;
    text-decoration: none;
    color: #333;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #f0f0f0;
      border-radius: 5px;
    }
  }
`;
