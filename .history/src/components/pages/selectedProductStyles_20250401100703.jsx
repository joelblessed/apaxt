
export const Container = styled.div`
  padding: 20px;
  margin: 50px auto;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: white;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 50%;
    margin-bottom: 0;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const NoImage = styled.p`
  text-align: center;
  font-size: 14px;
  color: gray;
`;

export const DetailsContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

export const SellerLink = styled(Link)`
  font-size: 16px;
  color: blue;
  text-decoration: none;
  font-weight: bold;
`;

export const ProductTitle = styled.h1`
  font-size: 24px;
  margin: 10px 0;
`;

export const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

export const Rating = styled.div`
  font-size: 20px;
  margin: 10px 0;
  color: gold;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const ActionButton = styled.button`
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

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-bottom: 2px solid lightgray;
`;

export const TabButton = styled.button`
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

export const TabContent = styled.div`
  padding: 20px;
  font-size: 16px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: gray;
  padding: 20px;
`;