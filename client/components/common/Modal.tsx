"use client";

import React, { ReactNode } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  width?: string; // Optional width, e.g., "600px"
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  width = "550px",
  children,
}) => {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Dialog
        width={width}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
      >
        <CloseButton onClick={onClose}>
          <IoClose size={25} />
        </CloseButton>
        <Content>{children}</Content>
      </Dialog>
    </Overlay>
  );
};

export default Modal;

// -------------------- Styled Components --------------------
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Dialog = styled.div<{ width: string }>`
  background-color: #212121;
  color: #ddd;
  border-radius: 20px;
  padding: 20px 30px;
  width: ${({ width }) => width};
  max-height: 80vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

const Content = styled.div`
  h1 {
    font-size: 16px;
    color: #ff8f00;
    text-transform: uppercase;
    margin-top: 20px;
  }

  p {
    font-size: 16px;
    text-align: justify;
    margin: 5px 0;
  }
`;
