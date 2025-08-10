import React from "react";
import { getLinks as menu } from "@/data";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";

interface DrawerProps {
  isOpen: boolean;
  handleToggleMenu: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, handleToggleMenu }) => {
  const { push } = useRouter();

  const openChoice = (link: string) => {
    push(link);
  };

  const forceBack = (link: string = "/") => {
    push(link);
  };

  type MenuItem = {
    icon?: React.ElementType;
    label: string;
    href: string;
  };

  const renderMenuItems = (items: MenuItem[]) =>
    items?.map(({ icon, label, href }) => (
      <DrawerMenuItem key={label} onClick={() => openChoice(href)}>
        <IconWrapper>{icon ? React.createElement(icon) : null}</IconWrapper>
        <MenuText>{label}</MenuText>
      </DrawerMenuItem>
    ));

  return (
    <MenuContainer isOpen={isOpen}>
      <DrawerHeader>
        <Image
          src="/logo.png"
          width={142}
          height={50}
          alt="RuL"
          onClick={() => forceBack("/")}
        />
        <CloseButton onClick={handleToggleMenu}>✕</CloseButton>
      </DrawerHeader>
      {renderMenuItems(menu(false))}
    </MenuContainer>
  );
};

export default Drawer;

interface MenuContainerProps {
  isOpen: boolean;
}

const MenuContainer = styled.div<MenuContainerProps>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 70%;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 5;
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  width: 98%;
  height: 80px;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background: inherit;
  width: 30px;
  height: 30px;
  padding: 5px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, padding 0.3s ease,
    border-radius 0.3s ease;

  &:hover {
    background: #333;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
  }
`;

const DrawerMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1px auto;
  height: 100px;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  width: 100%;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  color: #00695c;
  font-size: 25px;
`;

const MenuText = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  color: #333;
`;
