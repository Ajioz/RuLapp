import React from "react";
import { useRouter } from "next/router";
import { IoBasket, IoBagSharp, IoSearch } from "react-icons/io5";
import styled from "styled-components";

interface BuyProps {
  value: string;
  showHeart?: boolean;
  onClick?: () => void;
}

const Buy: React.FC<BuyProps> = ({
  value= "Buy Plan",
  showHeart = false,
  onClick = () => {},
}) => {
  const { push } = useRouter();

    const router = useRouter();

  return (
    <DonateContainer>
      <IoSearch size={30} />
      <IoBasket size={30} />
      <CustomBtn
        showHeart={showHeart}
        value={value}
       onClick={onClick ?? (() => router.push("/contact"))}
      />
    </DonateContainer>
  );
};

export default Buy;

export const CustomBtn: React.FC<BuyProps> = ({
  value = "Buy Plan",
  showHeart = false,
  onClick,
}) => {
  return (
    <StyledDonateBtn onClick={onClick}>
      {showHeart && (
        <IoBagSharp size={20} style={{ color: "#fff", zIndex: 1 }} />
      )}
      <span>{value}</span>
    </StyledDonateBtn>
  );
};

/* Styled Components */
const DonateContainer = styled.div`
  display: flex;
  width: 300px;
  align-items: center;
  justify-content: space-around;
  border-left: 1px solid #ddd;
`;

const StyledDonateBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  width: 120px;
  height: 40px;
  background-color: #e65100;
  padding: 10px;
  border-radius: 30px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #222;
    border-radius: 30px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
    z-index: 0;
  }

  span {
    color: #fff;
    position: relative;
    z-index: 1;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;
