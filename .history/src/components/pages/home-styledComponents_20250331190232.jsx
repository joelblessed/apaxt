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
`;

export const ScrollContainer = styled.div`
  overflow: hidden;
  width: 1300px;
`;

export const ScrollWrapper = styled.div`
  display: flex;
  gap: 10px;
  transform: ${({ translateX }) => `translateX(-${translateX}px)};
  transition: transform 0.5s ease-in-out;
`;

export const Box = styled.div`
  width: 150px;
  height: 150px;
  background: lightblue;
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
`;