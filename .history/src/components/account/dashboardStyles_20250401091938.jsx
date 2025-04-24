import styled from "styled-components";
import { Link } from "react-router-dom";

// Shared Styles
export const Card = styled.div`
  background-color: #fff;
  width:150px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

export const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

// Dashboard Layout
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    
  }
       @media (max-width: 768px) {
  
      margin-top:100px;
  }
`;


export const Sidebar = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  padding: 16px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {

    width: 240px;
    height: 100vh;
  }
`;

export const MainContent = styled.div`
  flex-grow: 1;
  padding: 16px;
  background-color: #fff;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: block;
  padding: 8px 16px;
  margin: 8px 0;
  border-radius: 4px;
  background-color: #e0e0e0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ccc;
  }
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  margin: 8px 0;
  border-radius: 4px;
  background-color: #ff4444;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;

// Profile Styles
export const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const EditButton = styled(Link)`
  border: 1px solid green;
  padding: 10px;
  border-radius: 10px;
  color: green;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  margin-right: 10px;
`;

export const DeleteButton = styled.button`
  border: 1px solid red;
  background: none;
  padding: 10px;
  border-radius: 10px;
  color: red;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;

// Edit Profile Picture Styles
export const EditProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

export const FormLabel = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

export const FormButton = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

// Analytics Styles
export const ChartPlaceholder = styled.div`
  height: 400px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;