import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
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
  color: ${({ $active }) => ($active ? "#0056b3" : "#0070f3")};
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

const Main = styled.main`
  padding: 2rem;
  min-height: 80vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Logo = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const ToggleButton = styled.button`
  margin-left: 1rem;
  padding: 0.3rem 0.6rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = "App" }: LayoutProps) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  // Check admin status from env
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ADMIN_API_KEY) {
      setIsAdmin(true);
    }
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/rul", label: "Predict" },
    { href: "/upload", label: "Upload" },
    ...(isAdmin
      ? [{ href: "/admin/upload-model", label: "⚙ Upload Artefact" }]
      : []),
  ];

  return (
    <>
      <Head>
        <title>{title} | DaroApp</title>
      </Head>
      <Nav>
        <Header>
          <Logo>🔧 RUL UI</Logo>
          <ToggleButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </ToggleButton>
        </Header>
        <NavLinks>
          {links.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <NavLink $active={router.pathname === link.href}>
                {link.label}
              </NavLink>
            </Link>
          ))}
        </NavLinks>
      </Nav>
      <Main>{children}</Main>
    </>
  );
}
