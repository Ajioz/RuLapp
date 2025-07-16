import Link from "next/link";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #fff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled.a`
  margin-left: 1rem;
  color: #0070f3;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <Nav>
        <div>
          <strong>🔧 RUL Prediction UI</strong>
        </div>
        <div>
          <Link href="/" passHref>
            <NavLink>Home</NavLink>
          </Link>
          <Link href="/rul" passHref>
            <NavLink>Predict</NavLink>
          </Link>
          <Link href="/upload" passHref>
            <NavLink>Upload</NavLink>
          </Link>
        </div>
      </Nav>
      <main>{children}</main>
    </>
  );
}
