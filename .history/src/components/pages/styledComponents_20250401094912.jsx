import styled from "styled-components";

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
export const MAddToWishList = styled.button`
  position: relative;
  left: ${(props) => props.position.left};
  top: -8px;
  background: none;
  border: none;
  font-size: 50px;

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



const Container = styled.div`
  padding: 20px;
  margin: 50px auto;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: white;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 50%;
    margin-bottom: 0;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const NoImage = styled.p`
  text-align: center;
  font-size: 14px;
  color: gray;
`;

const DetailsContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const SellerLink = styled(Link)`
  font-size: 16px;
  color: blue;
  text-decoration: none;
  font-weight: bold;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Rating = styled.div`
  font-size: 20px;
  margin: 10px 0;
  color: gold;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${(props) => (props.secondary ? "gray" : "orangered")};
  background: ${(props) => (props.secondary ? "none" : "orangered")};
  color: ${(props) => (props.secondary ? "gray" : "white")};
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${(props) => (props.secondary ? "lightgray" : "darkorange")};
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-bottom: 2px solid lightgray;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  background: ${(props) => (props.active ? "orangered" : "none")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? "darkorange" : "lightgray")};
  }
`;

const TabContent = styled.div`
  padding: 20px;
  font-size: 16px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: gray;
  padding: 20px;
`;