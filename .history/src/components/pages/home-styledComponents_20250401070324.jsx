import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;


  
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: center;
  @media (max-width: 768px) {
  
  // margin-top:80px;

  }
`;

export const ScrollContainer = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: 1300px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export const ScrollWrapper = styled.div`
  display: flex;
  gap: 10px;
  transform: ${({ translateX }) => `translateX(-${translateX}px)`};
  transition: transform 0.5s ease-in-out;
`;

export const Box = styled.div`
  width: 150px;
  height: 150px;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  flex-shrink: 0;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: white;
  transition: 0.3s;
  
  &:hover {
    background: #007bff;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    font-size: 16px;
  margin-top:100px;

  }
`;

export const NavButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background: orange;
  border: none;
  font-size: 18px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: darkorange;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px;
  }
`;