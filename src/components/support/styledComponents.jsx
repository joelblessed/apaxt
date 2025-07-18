import styled from "styled-components";
import { Link } from "react-router-dom";

const getOS = () =>
  /android/i.test(navigator.userAgent)
    ? "android"
    : /iPad|iPhone|iPod/.test(navigator.userAgent)
    ? "ios"
    : "other";

export const categoryOptions = {
  1: "0px 0px 10px 1px black",
  2: "0px 0px 10px 1px green",
  3: "0px 0px 10px 1px orangered",
  4: "0px 0px 10px 1px red",
  5: "0px 0px 10px 1px gold",
  6: "0px 0px 10px 1px violet",
};
export const categoryShadow = {
  Electronics: 1,
  Farm: 2,
  Sport: 3,
  Fashion: 4,
  Music:5,
  Furniture: 6,
};
export const CloseButton = styled.button`
  &:hover{
  transform: scale(1.1);
  `;

export const BoxContainer = styled.div`
  border: px solid red;
  border-radius: 12px;
  box-shadow: ${(props) => categoryOptions[props.categoryOption]};
 transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(21, 237, 32, 0.2);
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
  margin-top:${(props) => (props.main ?  "10px" : "40px" )};
  
  
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
export const iosfontSizes = {
  fr: {
    fontSize: "10px",
  },
  en: {
    fontSize: "15px",
  },
};

export const MAddtocartButton = styled.button`
  background: none;
  border: 1px solid red;
  color: red;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size:${(props) =>
    getOS() === "android"
      ? props.fontSize?.fontSize
      : getOS() === "ios"
      ? props.IfontSize?.fontSize
      : props.fontSize?.fontSize};
  transition: all 0.3s ease;
  width: auto;
  margin-top: ${(props) => (props.main ? "-60px" : "0px")};

  &:hover {
    transform: scale(1.1);
    border: 1px solid green;
    color: green;
  }
`;

export const positions = {
  fr: {
    left: "109px",
  },
  en: {
    left: "107px",
  }
 
};
export const iospositions = {
  fr: {
    left: "107px",
  },
  en: {
    left: "108px",
  },
};


export const MAddToWishList = styled.button`
  position: relative;
  left: ${(props) =>
    getOS() === "android"
      ? props.position?.left
      : getOS() === "ios"
      ? props.Iposition?.left
      : "110px"};
  top: -0px;
  background: none;
  border: none;
  font-size: 10px;
  z-index: 1;
  color: orange;
  // background: blue;
`;



export const Name = styled.label`
  font-size: ${({ fontSize }) => fontSize || "20px"};
width: 150px;

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
