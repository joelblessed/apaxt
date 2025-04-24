import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
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
  ChartPlaceholder
} from "./DashboardStyles";

// Mock data (replace with API calls)
const mockProducts = [
  { id: 1, name: "Product A", price: 100, stock: 10 },
  { id: 2, name: "Product B", price: 200, stock: 5 },
];
const mockOrders = [
  { id: 1, product: "Product A", customer: "John Doe", status: "Shipped" },
  { id: 2, product: "Product B", customer: "Jane Smith", status: "Pending" },
];
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const Dashboard = ({ api, user, error, ownersProducts, changeLanguage }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [users, setUsers] = useState(mockUsers);
  const { logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ownerId = localStorage.getItem("userId");
  const { t } = useTranslation();

  // Delete product by ID
  const handleDelete = (id) => {
    fetch(${api}/deleteProduct/${id}, { method: "DELETE" })
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
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <h2 style={{ marginBottom: "16px" }}>{t("DashBoard")}</h2>
        <nav>
          <NavLink to="/d">{t("DashBoard")}</NavLink>
          <NavLink to="/dprofile">{t("Profile")}</NavLink>
          <NavLink to="/dproducts">{t("Products")}</NavLink>
          <NavLink to="/orders">{t("Orders")}</NavLink>
          <NavLink to="/users">{t("Users")}</NavLink>
          <NavLink to="/analytics">{t("Analytics")}</NavLink>
          <button onClick={changeLanguage}>
            {t("Francaise")} {/* Display the toggle Button text */}
          </button>
          <LogoutButton onClick={logout}>{t("Logout")}</LogoutButton>
        </nav>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
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
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/dprofile"
            element={
              <Profile users={users} api={api} useDispatch={useDispatch} />
            }
          />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
};

// Home Component
const Home = ({ products, orders, users }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header>{t("DashBoard Overview")}</Header>
      <Grid>
        <Card>
          <h3>{t("Total Products")}</h3>
          <p>{products.length}</p>
        </Card>
        <Card>
          <h3>{t("Total Orders")}</h3>
          <p>{orders.length}</p>
        </Card>
      </Grid>
    </div>
  );
};

// Products Component
const Products = ({ ownersProducts, api, handleDelete }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header>{t("Product Management")}</Header>
      <Grid>
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
              <EditButton to={/editProduct/${product.id}}>
                {t("Edit Product")}
              </EditButton>
              <DeleteButton onClick={() => handleDelete(product.id)}>
                {t("Delete Product")}
              </DeleteButton>
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

// Orders Component
const Orders = ({ orders }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header>{t("Orders Management")}</Header>
      <Grid>
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
      </Grid>
    </div>
  );
};

// Users Component
const Users = ({ users }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header>{t("User Management")}</Header>
      <Grid>
        {users.map((user) => (
          <Card key={user.id}>
            <h3>{user.name}</h3>
            <p>
              {t("Email")}: {user.email}
            </p>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

// Analytics Component
const Analytics = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header>{t("Sales Analytics")}</Header>
      <ChartPlaceholder>
        <p>{t("Chart")}</p>
      </ChartPlaceholder>
    </div>
  );
};

const Profile = ({ api, useDispatch }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [imageError, setiImageError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      return;
    }

    fetch(${api}/profile, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${token},
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p>{t("Error")}: {error}</p>;
  if (!user) return <p>{t("Loading...")}</p>;

  return (
    <ProfileContainer>
      <h2>{t("User Profile")}</h2>
      <div>
        {imageError ? (
          <NavLink to="/deditProfilePicture">
            <ProfileImage
              src={
                user.gender === "male"
                  ? "/images/svgviewer-output(2).svg"
                  : "/images/svgviewer-output(3).svg"
              }
              alt="loading..."
            />
          </NavLink>
        ) : (
          <NavLink to="/deditProfilePicture">
            <ProfileImage
              src={user.profileImage}
              alt=""
              onError={() => setiImageError(true)}
            />
          </NavLink>
        )}
      </div>

      <p>
        <strong>{t("User Name")}:</strong> {user.userName}
      </p>
      <p>
        <strong>{t("Full Names")}:</strong> {user.fullName}
      </p>
      <p>
        <strong>{t("Phone Number")}:</strong> {user.phone}
      </p>
      <p>
        <strong>{t("Email")}:</strong> {user.email}
      </p>
      <p>
        <strong>{t("Country")}:</strong> {user.country}
      </p>
      <p>
        <strong>{t("Address")}:</strong> {user.address}
      </p>

      <div>
        <EditButton to={/editProfile}>{t("Edit Profile")}</EditButton>
      </div>
    </ProfileContainer>
  );
};

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

      const uploadImage = await fetch(`${api}/profile/update-image/${userId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!uploadImage.ok) throw new Error("Image upload failed");

      const imgResponse = await uploadImage.json();
      setProfileImage(`${api}${imgResponse.user.profileImage}`);

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
      <FormButton type="submit">
        {t("Update Profile Picture")}
      </FormButton>
    </EditProfileForm>
  );
};

export default Dashboard;