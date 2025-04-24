import styled from "styled-components";
import { Link } from "react-router-dom";



export const categoryOptions = {
  1: "0px 0px 10px 1px red",
  2: "0px 0px 10px 1px yellow",
  3: "0px 0px 10px 1px orange",
  4: "0px 0px 10px 1px blue",
  5: "0px 0px 10px 1px black",
  6: "0px 0px 10px 1px violet",
};
export const categoryShadow = {
  farm: 1,
  computer: 2,
  Clothing: 3,
  accesseries: 4,
  other: 5,
};
export const CloseButton = styled.button`
  &:hover{
  transform: scale(1.1);
  `;

export const BoxContainer = styled.div`
  border: px solid red;
  border-radius: 12px;
  box-shadow: ${(props) => categoryOptions[props.categoryOption]};

  &:hover {
    transform: scale(1.1);
  }
`;
export const AddtocartButton = styled.button`
  background:none;
  border: 1px solid RED;
  color: red;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 100%,
  transition: all 0.3s ease;
  width: 90%;
  margin-top:${(props) => (props.main ? "40px" : "10px")};
  
  
  &:hover{
  transform: scale(1.1);
  border:1px solid green;
  color:green;
  
  }
  `;

export const fontSizes = {
  fr: {
    fontSize: "11px",
  },
  en: {
    fontSize: "16px",
  },
};

export const MAddtocartButton = styled.button`
  background: none;
  border: 1px solid red;
  color: red;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: ${(props) => props.fontSize.fontSize};
  transition: all 0.3s ease;
  width: auto;
  margin-top: ${(props) => (props.main ? "5px" : "-60px")};

  &:hover {
    transform: scale(1.1);
    border: 1px solid green;
    color: green;
  }
`;

export const positions = {
  fr: {
    left: "102px",
  },
  en: {
    left: "100px",
  },
};
const getOS = () =>
  /android/i.test(navigator.userAgent)
    ? "android"
    : /iPad|iPhone|iPod/.test(navigator.userAgent)
    ? "ios"
    : "other";

export const MAddToWishList = styled.button`
  position: relative;
  left: ${getOS()=== "android" ? ${(props) => props.position.left}};
  top: -8px;
  background: none;
  border: none;
  font-size: 50px;
  z-index: 1;

  color: orange;
`;
export const Name = styled.a`
  font-size: ${({ fontSize }) => fontSize || "20px"};
`;
export const DescriptionContainer = styled.label`
  font-size: 10px;
`;

export const DescriptionTitle = styled.h6`
  font-size: 13px;
`;
export const DescriptionContent = styled.a`
  font-size: 13px;
`;
export const Price = styled.h4`
  font-size: 16px;
`;
export const Discount = styled.h3`
  font-size: 13px;
`;
export const StatusContainer = styled.label`
  font-size: 13px;
`;
export const StatusTitle = styled.h6`
  font-size: 13px;
`;
export const StatusContent = styled.a`
  font-size: 13px;
`;

// selected Products
