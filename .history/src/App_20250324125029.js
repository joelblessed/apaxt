import logo from "./logo.svg";
import React, { createContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import { useDispatch } from "react-redux";
import { api } from "./config";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  useParams
} from "react-router-dom";
import LanguageSwitcher from "./components/translations/languageSwitcher";
import "./components/translations/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { loadCartAfterLogin } from "./cartAction";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import Products from "./components/pages/products";
import Cart from "./components/Cart/cart";
import Cart1 from "./components/Cart/cart1";
import Cart2 from "./components/Cart/Cart2";
import Home from "./components/pages/Home";
import NewProduct from "./components/pages/formUpload";
import Account from "./components/account/signUP";
import SelectedProduct from "./components/pages/selectedProduct";
import Category from "./components/pages/category";
import MobileCategory from "./components/pages/mobileCategory";
import CategoryPage from "./components/pages/categoryPage";
import EditProfilePicture from "./components/account/editProfilPicture";
import WishList from "./components/Cart/wishList";
import Brand from "./components/pages/brand";
import BrandPage from "./components/pages/brandPage";
import Payment from "./components/Payment/Payment";
import Alert from "./components/others/alert";
import ShowAlert from "./components/others/globalAlert";
import CartCount from "./components/others/cartCount";
import ProductSearch from "./components/others/search";
import ProductPreview from "./components/others/productPreview";
import DesktopNavbar from "./components/Navbar/DesktopNavbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import SignIN from "./components/account/signIN";
import SignUP from "./components/account/signUP";
import Profile from "./components/account/profile";
import EditProfile from "./components/account/editProfile";
import Dashboard from "./components/account/dashboard";
import CalculateDistance from "./components/pages/calculateDistance";
import Customer from "./components/others/customer";
import Test from "./components/pages/test";
import EditProduct from "./components/pages/editProduct";
import ProductsByOwner from "./components/pages/productsByOwner";
import ShoppingCart from "./components/others/incrementCart";
import DeleteCart from "./components/others/deleteCart";
import Checkout from "./components/Cart/checkout";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./components/account/forgotPasword";
import ResetPassword from "./components/account/resetPassword";
import FormUpload from "./components/pages/formUpload";
import ProductSelection from "./components/pages/productSelection";
import { addToCart } from "./cartSlice";
import DeleteProduct from "./components/pages/deleteProduct";
import Footer from "./components/pages/footer";

function App() {
  const [calalculateTotal, setCalculateTotal] = useState();
  const [checkout, setCheckOut] = useState();
  const [sendCart, setSendCart] = useState([]);
  const [increment, setIncrement] = useState();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [desktopCategories, setDesktopCategories] = useState(null);
  const [displayusername, displayusernameupdate] = useState();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [paymentId, setPaymentId] = useState("");
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]); // full list of products
  const [filteredProducts, setFilteredProducts] = useState([]); // filtered list
  const [searchTerm, setSearchTerm] = useState(""); // single input for filtering
  const [categories, setCategories] = useState([]); // Unique categories
  const [category, setCategory] = useState("All");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("All");
  const [inwishlist, setInWishList] = useState([null]);
  const [searchFunction, setSearchFunction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(1); // Number of items per p
  const [likedProducts, setLikedProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [allProfiles, setAllProfiles] = useState(null);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [isEnglish, setIsEnglish] = useState(i18n.language === "en");

  // Load saved language from localStorage or default to "en"
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
    setIsEnglish(savedLanguage === "en");
  }, [i18n]);

  // Function to toggle between English and French
  const changeLanguage = () => {
    const newLanguage = isEnglish ? "fr" : "en";
    i18n.changeLanguage(newLanguage); // Change the language
    localStorage.setItem("language", newLanguage); // Save the selected language
    setIsEnglish(!isEnglish); // Update the toggle state
  };

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      dispatch(loadCartAfterLogin(userId));
    }
  }, [userId, dispatch]);

  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 760);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /////////////////////////////////////////////////

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      return;
    }

    fetch(`${api}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token in the headers
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
        localStorage.setItem("username", data.userName);
        localStorage.setItem("profileImage", data.profileImage);
      })

      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    fetch(`${api}/AllProfiles`)
      .then((response) => response.json())
      .then((data) => {
        setAllProfiles(data);
      })
      .catch((error) => console.error("Error fetching profies:", error));
  }, []);

  // //////////////////////////////////////////////

  useEffect(() => {
    fetch(`${api}/products`)
      .then((response) => response.json())
      .then((data) => {
        const productsData = data.products || data;
        setProducts(productsData);
        setFilteredProducts(productsData);

        // Extract unique categories from the products
        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        const filteredCategory = data.filter((product) => product.category === categoryName);
        set(filteredCategory);

        // Extract unique brands from the products
        const uniqueBrands = [
          ...new Set(productsData.map((product) => product.brand.name)),
        ];
        setBrands(uniqueBrands);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle filtering logic
  const handleSearch = () => {
    const query = searchTerm.trim().toLowerCase();

    let filtered = products.filter((product) => {
      const categoryMatch = product.category.toLowerCase().includes(query);
      const productNameMatch = product.name.toLowerCase().includes(query);
      const brandMatch = product.brand.some((b) =>
        b.name.toLowerCase().includes(query)
      );

      return categoryMatch || productNameMatch || brandMatch;
    });

    // Apply category filter if a category is selected
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
    setSearchTerm(""); // Clear input after search
  };

  const mobilefilteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const filteredBrands =
    brand === "All"
      ? products
      : products.filter((product) => product.brand.b.name === brand);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const addToWishList = async (item) => {
    setWishList((prevCart) => [...prevCart, item]);

    await fetch(`${api}/addTowishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  // const toggleLike = (product) => {
  //   setLikedProducts((prevLiked) =>
  //     prevLiked.includes(product.id)
  //       ? prevLiked.filter((id) => id !== product.id)
  //       : [...prevLiked, product.id]
  //   );
  // };

  useEffect(() => {
    // Fetch images from the local API
    fetch(`${api}/cart?_sort=_id&_order=desc`) // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []);

  const highlightText = (text, term) => {
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<strong>$1</strong>");
  };

  if (loading) {
    return <p>loading...</p>;
  }

  const sendSearchFunction = (fn) => {
    setSearchFunction(() => fn);
  };

  return (
    <AuthProvider>
      <ToastContainer theme="colored" position="top-center"></ToastContainer>

      <Router>
        {isMobile ? (
          <MobileNavbar
            cart={cart}
            cartCount={cartCount}
            search={handleSearch}
            searchFunction={searchFunction}
            setCategory={setCategory}
            setBrand={setBrand}
            brand={brand}
            brands={brands}
            categories={categories}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            category={category}
            displayusername={displayusername}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            changeLanguage={changeLanguage}
          />
        ) : (
          <DesktopNavbar
            api={api}
            cart={cart}
            cartCount={cartCount}
            search={handleSearch}
            searchFunction={searchFunction}
            categories={categories}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            displayusername={displayusername}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            changeLanguage={changeLanguage}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                api={api}
                filteredProducts={filteredProducts}
                SelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                mobilefilteredProducts={mobilefilteredProducts}
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                searchTerm={searchTerm}
                product={setProduct}
                getProducts={products}
                setSearchTerm={setSearchTerm}
                highlightText={highlightText}
              />
            }
          ></Route>

          <Route
            path="/Products"
            element={
              <Products
                filteredProducts={filteredProducts}
                SelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                cart={cart}
                likedProducts={likedProducts}
                api={api}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                highlightText={highlightText}
              />
            }
          ></Route>

          <Route
            path="/selectedProduct"
            element={
              <SelectedProduct
                api={api}
                selectedProduct={selectedProduct}
                addToCart={addToCart}
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                searchTerm={searchTerm}
                filteredProducts={filteredProducts}
                setSelectedProduct={setSelectedProduct}
                cart={cart}
                likedProducts={likedProducts}
                selectedCategory={selectedCategory}
                highlightText={highlightText}
              />
            }
          ></Route>

          <Route
            path="/mobileCategory"
            element={
              <MobileCategory
                api={api}
                items={products}
                filteredProducts={filteredProducts}
                selectedCategory={selectedCategory}
                SelectedProduct={SelectedProduct}
                mobilefilteredProducts={mobilefilteredProducts}
                highlightText={highlightText}
                addToCart={addToCart}
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                getProducts={products}
                categories={categories}
                setCategories={setCategories}
                sendSearchFunction={sendSearchFunction}
                setSelectedProduct={setSelectedProduct}
              />
            }
          ></Route>

          <Route
            path="/category"
            element={
              <Category
                api={api}
                items={products}
                filteredProducts={filteredProducts}
                selectedCategory={selectedCategory}
                SelectedProduct={setSelectedProduct}
                mobilefilteredProducts={mobilefilteredProducts}
                highlightText={highlightText}
                addToCart={addToCart}
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                getProducts={products}
                categories={categories}
                setCategories={setCategories}
                sendSearchFunction={sendSearchFunction}
                setSelectedProduct={setSelectedProduct}
              />
            }
          ></Route>

          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Customer api={api} />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signIN" element={<SignIN api={api} />} />
          <Route
            path="/signUP"
            element={<SignUP api={api} allProfiles={allProfiles} />}
          />
          <Route
            path="/profile"
            element={<Profile api={api} user={user} error={error} />}
          />
          <Route
            path="/editProfile"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <EditProfile api={api} userInfo={user} error={error} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <WishList api={api} />
              </ProtectedRoute>
            }
          />
          <Route path="/editProduct/:id" element={<EditProduct api={api} />} />

          <Route path="/deleteProduct" element={<DeleteProduct api={api} />} />
          <Route
            path="/calculateDistance"
            element={<CalculateDistance api={api} />}
          />
          <Route
            path="/editProfilePicture"
            element={<EditProfilePicture api={api} />}
          />
          <Route
            path="/productsByOwner"
            element={
              <ProductsByOwner
                api={api}
                highlightText={highlightText}
                searchTerm={searchTerm}
                filteredProducts={filteredProducts}
              />
            }
          />
          <Route
            path="/test"
            element={
              <Test
                api={api}
                likedProducts={likedProducts}
                filteredProducts={filteredProducts}
              />
            }
          />
          <Route
            path="/productSelection"
            element={
              <ProductSelection api={api} addToWishList={addToWishList} />
            }
          />
          <Route
            path="/languageSwitcher"
            element={
              <LanguageSwitcher api={api} addToWishList={addToWishList} />
            }
          />

          <Route
            path="/brand"
            element={
              <Brand
                api={api}
                filteredProducts={filteredProducts}
                searchTerm={searchTerm}
                addToWishList={addToWishList}
              />
            }
          />
          <Route
            path="/brand/:brandId"
            element={
              <BrandPage
                api={api}
                filteredProducts={filteredProducts}
                searchTerm={searchTerm}
              />
            }
          />

          <Route
            path="/forgotPassword"
            element={<ForgotPassword api={api} />}
          />
          <Route path="/resetPassword" element={<ResetPassword api={api} />} />

          <Route
            path="/category/:categoryName"
            element={
              <CategoryPage
                api={api}
                items={products}
                mobilefilteredProducts={mobilefilteredProducts}
                filteredProducts={filteredProducts}
                selectedCategory={selectedCategory}
                highlightText={highlightText}
                addToCart={addToCart}
                addToWishList={addToWishList}
                inwishlist={inwishlist}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSelectedProduct={setSelectedProduct}
              />
            }
          />

          <Route
            path="/Payment"
            element={
              <Payment
                api={api}
                amount={calalculateTotal}
                checkout={checkout}
                setPaymentStatus={setPaymentStatus}
                setPhoneNumber={setPhoneNumber}
                setPaymentId={setPaymentId}
              />
            }
          />

          <Route
            path="/Cart2"
            element={
              <Cart2
                api={api}
                searchTerm={searchTerm}
                highlightText={highlightText}
                inwishlist={inwishlist}
              />
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <Cart
                api={api}
                user={user}
                searchTerm={searchTerm}
                highlightText={highlightText}
                inwishlist={inwishlist}
              />
            }
          ></Route>

          <Route
            path="/formUpload"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <FormUpload api={api} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Dashboard api={api} user={user} error={error} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Checkout
                  api={api}
                  setCalculateTotal={setCalculateTotal}
                  setCheckOut={setCheckOut}
                  paymentStatus={paymentStatus}
                  paymentNumber={phoneNumber}
                  paymentId={paymentId}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* <Test/> */}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
