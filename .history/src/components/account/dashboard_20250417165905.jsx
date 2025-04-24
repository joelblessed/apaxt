import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Profile from "./profile";
import Wallet from "./wallet";
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
  grid-template-columns: 1fr;
  gap: 16px;

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

// Mock data (replace with API calls)
const mockProducts = [
  { id: 1, name: "Product A", price: 100, stock: 10 },
  { id: 2, name: "Product B", price: 200, stock: 5 },
];
const mockOrders = [
  { id: 1, product: "Product A", customer: "John Doe", status: "Shipped" },
  { id: 2, product: "Product B", customer: "Jane Smith", status: "Pending" },
];
// const mockUsers = [
//   { id: 1, name: "John Doe", email: "john@example.com" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com" },
// ];

const Dashboard = ({ api, user, error, ownersProducts, changeLanguage }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [users, setUsers] = useState([]);
  const { logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ownerId = localStorage.getItem("userId");
  const { t } = useTranslation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Delete product by ID
  const handleDelete = (id) => {
    fetch(`${api}/deleteProduct/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setProducts(products.filter((product) => product.id !== id)); // Remove from state
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
          <NavLink to="/d">{t("DashBoard")}</NavLink>
          <NavLink to="/dprofile">{t("Profile")}</NavLink>
          <NavLink to="/dproducts">{t("Products")}</NavLink>
          <NavLink to="/dorders">{t("Orders")}</NavLink>
          {/* <NavLink to="/users">{t("Users")}</NavLink> */}
          <NavLink to="/dwallet">{t("Wallet")}</NavLink>
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
            element={<Home products={products} orders={orders} users={users} />}
          />
          <Route
            path="/dproducts"
            element={
              <Products
                products={products}
                error={error}
                user={user}
                handleDelete={handleDelete}
                ownersProducts={ownersProducts}
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
          <Route path="/orders" element={<Orders orders={orders} />} />
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
const Home = ({ products, orders, users }) => {
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
          <p>{orders.length}</p>
        </Card>
      </ResponsiveGrid>
    </div>
  );
};

// Products Component
const Products = ({ ownersProducts, api, handleDelete }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header>{t("Product Management")}</Header>
      <ResponsiveGrid>
        {ownersProducts.map((product) => (
          <Card key={product.id}>
            <img
              src={product.images[0]}
              alt={t("Loading...")}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{product.name}</h3>
            <p>
              {t("Price")}: ${product.price}
            </p>
            <p>
              {t("Stock")}: {product.numberInStock}
            </p>

            <div>
              <EditButton to={`/editProduct/${product.id}`}>
                <img
                  src="/images/edit_24dp_00F70F_FILL0_wght400_GRAD0_opsz24.svg"
                  style={{ color: "red" }}
                />
              </EditButton>
              <DeleteButton onClick={() => handleDelete(product.id)}>
                <img
                  src="/images/delete_24dp_FC0202_FILL0_wght400_GRAD0_opsz24.svg"
                  style={{ color: "red" }}
                />
              </DeleteButton>
            </div>
          </Card>
        ))}
      </ResponsiveGrid>
    </div>
  );
};

// Orders Component
const Orders = ({ orders }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header>{t("Orders Management")}</Header>
      <ResponsiveGrid>
        {orders.map((order) => (
          <Card key={order.id}>
            <h3>{order.product}</h3>
            <p>
              {t("Customer")}: {order.customer}
            </p>
            <p>
              {t("Status")}: {order.status}
            </p>
          </Card>
        ))}
      </ResponsiveGrid>
    </div>
  );
};

// // Users Component
// const Users = ({ users }) => {
//   const { t } = useTranslation();

//   return (
//     <div>
//       <Header>{t("User Management")}</Header>
//       <ResponsiveGrid>
//         {users.map((user) => (
//           <Card key={user.id}>
//             <h3>{user.name}</h3>
//             <p>
//               {t("Email")}: {user.email}
//             </p>
//           </Card>
//         ))}
//       </ResponsiveGrid>
//     </div>
//   );
// };

// // Analytics Component
// const Analytics = () => {
//   const { t } = useTranslation();

//   return (
//     <div>
//       <Header>{t("Sales Analytics")}</Header>
//       <ChartPlaceholder>
//         <p>{t("Chart")}</p>
//       </ChartPlaceholder>
//     </div>
//   );
// };


<div>
  <Wallet />  
  
<div>

<h3>Profile</h3>
<Profile  />
</div>
</div>
const EditProfilePicture = ({ api }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage")
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select an image!");

    try {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      console.log("Uploading image..."); // Debugging log
      const uploadImage = await fetch(`${api}/profile/update-image/${userId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!uploadImage.ok) throw new Error("Image upload failed");

      const imgResponse = await uploadImage.json();
      console.log("Image upload response:", imgResponse); // Debugging log

      const updatedImageUrl = `${api}${imgResponse.user.profileImage}`;
      setProfileImage(updatedImageUrl);
      console.log("Updated profile image URL:", updatedImageUrl); // Debugging log

      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  return (
    <EditProfileForm onSubmit={handleSubmit}>
      <label>
        <ProfileImage src={profileImage} alt="Profile" />
      </label>
      <FormLabel>
        {t("Upload New Image")}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </FormLabel>
      <FormButton type="submit">{t("Update Profile Picture")}</FormButton>
    </EditProfileForm>
  );
};

export default Dashboard;
