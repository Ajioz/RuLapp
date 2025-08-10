import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DesktopNav from "./DesktopNav";
import { IoMenu } from "react-icons/io5";
import useNavbarMonitor from "./useNavbarMonitor";
import styled from "styled-components";
import Link from "next/link";
import { getLinks as links } from "@/data";
import Drawer from "./drawer";


interface NavbarProps {
  title?: string;
}

export default function Navbar({ title }: NavbarProps) {
  const router = useRouter();
  const [target, setTarget] = useState({ isHome: true, targetKey: "" });
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ADMIN_API_KEY) {
      setIsAdmin(true);
    }
  }, []);

  const processPath = useCallback(() => {
    const path = router.asPath;
    if (path === "/") {
      setTarget({ isHome: true, targetKey: "" });
    } else {
      const query = router.query;
      const targetKey = Object.keys(query)[0];
      setTarget({ isHome: false, targetKey });
    }
  }, []);

  useEffect(() => {
    processPath();
  }, [processPath]);

  return (
    <>
      <MobileNav isAdmin={isAdmin} />
      <DesktopNav
        router={router}
        target={target}
        title={title}
        loggedIn={loggedIn}
      />
    </>
  );
}

interface MobileNavProps {
  isAdmin: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ isAdmin }) => {
  const router = useRouter();
  const { navbarRef, isOutOfView } = useNavbarMonitor();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <MobileWrapper>
      <FirstNavBar>
        <Logo>🔧 RUL UI</Logo>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IoMenu size={30} onClick={handleToggleMenu} color="#fff" />
        </div>
        {!isOutOfView && (
          <Drawer isOpen={isOpen} handleToggleMenu={handleToggleMenu} />
        )}
      </FirstNavBar>

      <SecondaryNavbar visible={isOutOfView}>
        <NavLinks>
          {links(isAdmin).map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <NavLink $active={router.pathname === link.href}>
                {link.label}
              </NavLink>
            </Link>
          ))}
        </NavLinks>
        <IoMenu size={30} onClick={handleToggleMenu} color="#fff" />
        {isOutOfView && (
          <Drawer isOpen={isOpen} handleToggleMenu={handleToggleMenu} />
        )}
      </SecondaryNavbar>
    </MobileWrapper>
  );
};

// Styled Components
const MobileWrapper = styled.div`
  margin: -100px auto;
  z-index: 10;
  position: relative;
  top: 100px;
  width: 100%;
  background: transparent;
  box-shadow: 2px 1px 2px 2px rgba(0, 0, 0, 0.3);
  font-size: 14px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const FirstNavBar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  margin: -100px auto;
  padding: 1rem 2rem;
  background: transparent;
  box-shadow: 2px 1px 2px 2px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const SecondaryNavbar = styled.div<{ visible: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #263238;
  color: white;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  margin: -5px auto;
  z-index: 20;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0)" : "translateY(-100%)"};
  transition: opacity 0.3s ease, transform 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NavLink = styled.button<{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? "#ffd700" : "#ffffff")};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  text-decoration: ${({ $active }) => ($active ? "underline" : "none")};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
`;

const ToggleButton = styled.button`
  margin-left: 1rem;
  padding: 0.3rem 0.6rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;
