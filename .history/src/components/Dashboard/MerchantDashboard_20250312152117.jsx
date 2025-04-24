import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// Styled components
const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const MerchantDashboard = ({ api }) => {
  const [userInfo, setUserInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    fetchUserInfo();
    fetchProducts();
    fetchSoldProducts();
    fetchWallet();
  }, []);

  const fetchUserInfo = async () => {
    const username = sessionStorage.getItem("username");
    const response = await fetch(`${api}/users/${username}`);
    const data = await response.json();
    setUserInfo(data);
  };

  const fetchProducts = async () => {
    const response = await fetch(`${api}/products`);
    const data = await response.json();
    setProducts(data);
  };

  const fetchSoldProducts = async () => {
    const response = await fetch(`${api}/sold-products`);
    const data = await response.json();
    setSoldProducts(data);
  };

  const fetchWallet = async () => {
    const response = await fetch(`${api}/wallet`);
    const data = await response.json();
    setWallet(data.balance);
  };

  return (
    <DashboardContainer>
      <Section>
        <Title>User Info</Title>
        <Info>Username: {userInfo.username}</Info>
        <Info>Email: {userInfo.email}</Info>
      </Section>

      <Section>
        <Title>Products</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Stock</TableHeader>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      <Section>
        <Title>Sold Products</Title>
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Quantity</TableHeader>
            </tr>
          </thead>
          <tbody>
            {soldProducts.map((product) => (
              <tr key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      <Section>
        <Title>Wallet</Title>
        <Info>Balance: ${wallet}</Info>
      </Section>
    </DashboardContainer>
  );
};

export default MerchantDashboard;
