import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Profile from "./profile";
import Wallet from "./wallet";
import EditProfilePicture from "./editProfilePicture";
import EditProfile from "./editProfile";
import Orders from "../orders/orders"; // Add this import statement
import ProductList from "../products/productList";
import {
  DashboardContainer,
  Sidebar,
  MainContent,
  NavLink,
  LogoutButton,
  Card,
  Grid,
  Header,
  ProfileContainer,
  ProfileImage,
  EditButton,
  DeleteButton,
  EditProfileForm,
  FormLabel,
  FormButton,
  ChartPlaceholder,
} from "./dashboardStyles";
import { filter } from "lodash";

// Add responsive styles
const ResponsiveDashboardContainer = styled(DashboardContainer)`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ResponsiveSidebar = styled(Sidebar)`
  width: 100%;
  margin-bottom: 16px;
  display: ${(props) => (props.isVisible ? "block" : "none")};

  @media (min-width: 768px) {
    display: block;
    width: 250px;
    margin-bottom: 0;
  }
`;

const ResponsiveMainContent = styled(MainContent)`
  width: 100%;

  @media (min-width: 768px) {
    width: calc(100% - 250px);
  }
`;

const ResponsiveGrid = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ToggleButton = styled.button`
  display: block;
  margin: 8px auto;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;



const Dashboard = ({
  api,
  user,
  error,
  changeLanguage,
  glofilteredProducts,
  orderCount
}) => {
  ;
  const [users, setUsers] = useState([]);

  const { logout } = useContext(AuthContext);
  const [ownersProducts, setOwnersProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ownerId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const userId = localStorage.getItem('userId') ;
  

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    fetch(`${api}/allProducts?_sort=_id&_order=desc`) // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => {
        const products = data.products || data ; // Extract products from the response

        const filteredProducts = products.filter((product) =>
          product.user_products?.some((up) => up?.owner_id === userId)
        );
        
        setOwnersProducts(filteredProducts);
        console.log("test", filteredProducts)
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Delete product by ID
  const handleDelete = (id) => {
    fetch(`${api}/deleteProduct/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setOwnersProducts(
            ownersProducts.filter((product) => product.id !== id)
          ); // Remove from state
        } else {
          console.error("Error deleting product");
        }
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  return (
    <ResponsiveDashboardContainer>
      {/* Toggle Button for Sidebar */}
      <ToggleButton onClick={toggleSidebar}>
        {isSidebarVisible ? t("Hide Options") : t("Show Options")}
      </ToggleButton>

      {/* Sidebar */}
      <ResponsiveSidebar isVisible={isSidebarVisible}>
        <h2 style={{ marginBottom: "16px" }}>{t("DashBoard")}</h2>
        <nav>
          <NavLink onClick={toggleSidebar} to="/d">
            {t("DashBoard")}
          </NavLink>
          <NavLink onClick={toggleSidebar} to="/dprofile">
            {t("Profile")}
          </NavLink>
          <NavLink onClick={toggleSidebar} to="/productList">
            {t("Products List")}
          </NavLink>
          <NavLink onClick={toggleSidebar} to="/dimageSelect">
            {t("Image Select")}
          </NavLink>

          <NavLink onClick={toggleSidebar} to="/dorders">
            {t("Orders")}
          </NavLink>
          {/* <NavLink to="/users">{t("Users")}</NavLink> */}
          <NavLink onClick={toggleSidebar} to="/dwallet">
            {t("Wallet")}
          </NavLink>
          {/* <NavLink to="/analytics">{t("Analytics")}</NavLink> */}
          <LogoutButton onClick={changeLanguage}>
            {t("Francaise")} {/* Display the toggle Button text */}
          </LogoutButton>
          <LogoutButton onClick={logout}>{t("Logout")}</LogoutButton>
        </nav>
      </ResponsiveSidebar>

      {/* Main Content */}
      <ResponsiveMainContent>
        <Routes>
          <Route
            path="/d"
            element={
              <Home
                products={products}
                orderCount={orderCount}
                ownersProducts={ownersProducts}
                users={users}
              />
            }
          />

          <Route
            path="/dimageSelect"
            element={
              <ImageSelect
                api={api}
                glofilteredProducts={glofilteredProducts}
                products={products}
               
                ownersProducts={ownersProducts}
                users={users}
              />
            }
          />
          
           
         
          <Route
            path="/deditProfilePicture"
            element={
              <EditProfilePicture
                products={products}
                handleDelete={handleDelete}
              />
            }
          />
          <Route path="/deditProfile" element={<EditProfile api={api} />} />
          <Route
            path="/dorders"
            element={
              <Orders
                api={api}
                glofilteredProducts={glofilteredProducts}
                Card={Card}
                ResponsiveGrid={ResponsiveGrid}
                Header={Header}
             
                
              />
            }
          />
          {/* <Route path="/users" element={<Users users={users} />} /> */}
          <Route
            path="/dwallet"
            element={<Wallet error={error} user={user} />}
          />

          <Route
            path="/dprofile"
            element={
              <Profile
                user={user}
                error={error}
                api={api}
                useDispatch={useDispatch}
              />
            }
          />
          {/* <Route path="/analytics" element={<Analytics />} /> */}
        </Routes>
      </ResponsiveMainContent>
    </ResponsiveDashboardContainer>
  );
};

// Home Component
const Home = ({ products, orderCount, ownersProducts, users }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header>{t("DashBoard Overview")}</Header>
      <ResponsiveGrid>
        <Card>
          <h3>{t("Total Products")}</h3>
          <p>{ownersProducts.length}</p>
        </Card>
        <Card>
          <h3>{t("Total Orders")}</h3>
          <p>{localStorage.getItem("OrdersCount")}</p>
        </Card>
      </ResponsiveGrid>
    </div>
  );
};

const ImageSelect = ({ products, orders, ownersProducts, users }) => {
  const { t } = useTranslation();
console.log("settings" ,localStorage.getItem("imageSelect"));
  return (
    <div >
    {ownersProducts.map((product) => (
      <div
   
      >
        <h3>{t("Product Name")}: {product.name}</h3>
        {product.images.map((images, index) =>(
          <span key={index}    style={{ hover:"background:blue", border:"1px solid red", borderRadius:"10px", height:"220px"}}>
          <img
          src={images}
          style={{ width: "100px", height: "100px", margin:"15px", }} 
          onClick={() => {localStorage.setItem("imageSelect", JSON.stringify({ id: product.id, imgIndex: index }));}}
          />
          </span>
        ))}
      </div>
    ))}
    </div>
  );
}

// Products Component


<div>
 
  <div>
    <Wallet />
  </div>

  <div>
    <h3>Profile</h3>
    <Profile />
  </div>

  <div>
    <EditProfilePicture />
  </div>
  <div>
    <EditProfile />
  </div>
  <div>
    <Orders  />
  </div>
</div>;

export default Dashboard;
