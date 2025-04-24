import logo from "./logo.svg";
import React, { createContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import { api } from "./config";
import { addToWishlist, removeFromWishlist } from "./wishlistSlice";
import { useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import LanguageSwitcher from "./components/translations/languageSwitcher";
import "./components/translations/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loadCartAfterLogin } from "./cartAction";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import Products from "./components/pages/products";
import Cart from "./components/Cart/cart";
import Cart1 from "./components/Cart/cart1";
import Box from "./components/pages/boxes";
import Cart2 from "./components/Cart/Cart2";
import Home from "./components/pages/Home";
import NewProduct from "./components/pages/formUpload";
import Account from "./components/account/signUP";
import Discounts from "./components/pages/discountedProducts";
import SelectedProduct from "./components/pages/selectedProduct";
import Category from "./components/pages/category";
import CategoryPage from "./components/pages/categoryPage";
import EditProfilePicture from "./components/account/editProfilPicture";
import DesktopCards from "./components/pages/ProductCards/desktopCards";
import WishlistPage from "./components/pages/wishListPage";
import WishlistButton from "./components/pages/wishlistButton";
// import WishList from "./components/pages/wishList";
// import Brand from "./components/pages/brands";
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
import Orders from "./components/orders/orders";
import Orders2 from "./components/orders/orders2";
import EditProduct from "./components/pages/editProduct";
import ProductsByOwner from "./components/pages/productsByOwner";

import Checkout from "./components/Cart/checkout";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./components/account/forgotPasword";
import ResetPassword from "./components/account/resetPassword";
import FormUpload from "./components/pages/formUpload";
// import ProductSelection from "./components/pages/productSelection";
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
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState();
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
  const [mobilefilteredProducts, setMobilefilteredProducts] = useState([]);
  const [ownersProducts, setOwnersProducts] = useState([]);
  const [discounts, setDiscount] = useState([]);
  const [inwishlist, setInWishList] = useState([null]);
  const [searchFunction, setSearchFunction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(1); // Number of items per p
  const [likedProducts, setLikedProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1); // Track current page for infinite scroll
  const [hasMore, setHasMore] = useState(true);

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

  const userId = Number(localStorage.getItem("userId" || "guest"));

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
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${api}/products?page=${page}&limit=1`);
      const data = await res.json();
      if (data.products.length > 0) {
        setHasMore(true);
      } else {
        setFilteredProducts((prev) => [...prev, ...data.products]);
        setProducts((prev) => [...prev, ...data.products]);
      }
      const productsData = data.products || data;

      // Memoize heavy operations
      processProductData(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const processProductData = (productsData) => {
    // Unique categories
    const uniqueCategories = [...new Set(productsData.map((p) => p.category))];
    setCategories(uniqueCategories);

    // Discounted products
    const discounted = productsData.filter((p) => p.discount > 0);
    setDiscount(discounted);

    // Mobile filtered products by selected category
    const mobileFiltered =
      category === "All"
        ? productsData
        : productsData.filter((p) => p.category === category);
    setMobilefilteredProducts(mobileFiltered);

    // Owner's products
    const owned = productsData.filter((p) => p.ownerId === userId);
    setOwnersProducts(owned);

    // Unique brands
    const uniqueBrands = [
      ...new Set(
        productsData.flatMap((product) => product.brand.map((bra) => bra.name))
      ),
    ];
    setBrands(uniqueBrands);
  };

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (nearBottom && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Handle filtering logic
  const handleSearch = () => {
    const query = searchTerm.trim().toLowerCase();

    let filtered = products.filter((product) => {
      const categoryMatch = product.category.toLowerCase().includes(query);
      const productNameMatch = product.name.toLowerCase().includes(query);
      const ownerNameMatch = product.owner.toLowerCase().includes(query);
      const brandMatch = product.brand.some((b) =>
        b.name.toLowerCase().includes(query)
      );

      return categoryMatch || productNameMatch || brandMatch || ownerNameMatch;
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
                brands={brands}
                categories={categories}
                discounts={discounts}
                SelectedProduct={setSelectedProduct}
                addToCart={addToCart}
                filteredProducts={filteredProducts}
                ownersProducts={ownersProducts}
                mobilefilteredProducts={mobilefilteredProducts}
                searchTerm={searchTerm}
                search={handleSearch}
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
                highlightText={highlightText}
                api={api}
              />
            }
          ></Route>

          <Route
            path="/discountedProducts"
            element={
              <Discounts
                discounts={discounts}
                filteredProducts={filteredProducts}
                SelectedProduct={setSelectedProduct}
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
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                getProducts={products}
                categories={categories}
                setCategories={setCategories}
                // sendSearchFunction={sendSearchFunction}
                // setSelectedProduct={setSelectedProduct}
              />
            }
          ></Route>

          <Route
            path="/boxes"
            element={
              <Box
                api={api}
                selectedCategory={selectedCategory}
                SelectedProduct={setSelectedProduct}
                mobilefilteredProducts={mobilefilteredProducts}
                highlightText={highlightText}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                getProducts={products}
                categories={categories}
                setCategories={setCategories}
              />
            }
          />

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
            path="/wishlistButton"
            element={<WishlistButton api={api} />}
          />
          <Route
            path="/signUP"
            element={<SignUP api={api} allProfiles={allProfiles} />}
          />
          <Route
            path="/orders"
            element={
              <Orders
                token={token}
                userId={userId}
                api={api}
                allProfiles={allProfiles}
              />
            }
          />
          <Route
            path="/orders2"
            element={
              <Orders2
                token={token}
                userId={userId}
                api={api}
                allProfiles={allProfiles}
              />
            }
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
            path="/desktopCards"
            element={<DesktopCards Dobject={filteredProducts} api={api} />}
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
            path="/productsByOwner/:ownerName"
            element={
              <ProductsByOwner
                api={api}
                items={products}
                filteredProducts={filteredProducts}
                selectedCategory={selectedCategory}
                SelectedProduct={setSelectedProduct}
                mobilefilteredProducts={mobilefilteredProducts}
                highlightText={highlightText}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                getProducts={products}
                categories={categories}
                setCategories={setCategories}
                // sendSearchFunction={sendSearchFunction}
                setSelectedProduct={setSelectedProduct}
              />
            }
          />

<Route
            path="/test"
            element={
              <Test
                api={api}
                token={token}
                product={product}
                likedProducts={likedProducts}
                filteredProducts={filteredProducts}
              />
            }
          />

          <Route
            path="/languageSwitcher"
            element={<LanguageSwitcher api={api} />}
          />

          <Route
            path="/brand/:brandName"
            element={
              <BrandPage
                api={api}
                items={products}
                mobilefilteredProducts={mobilefilteredProducts}
                filteredProducts={filteredProducts}
                selectedCategory={selectedCategory}
                highlightText={highlightText}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSelectedProduct={setSelectedProduct}
              />
            }
          />

          <Route
            path="/wishlistPage"
            element={
              <WishlistPage
                api={api}
                searchTerm={searchTerm}
                highlightText={highlightText}
                filteredProducts={filteredProducts}
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
                SelectedProduct={setSelectedProduct}
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
                product={product}
                user={user}
                searchTerm={searchTerm}
                highlightText={highlightText}
                inwishlist={inwishlist}
              />
            }
          />
          

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
              <Dashboard
                api={api}
                user={user}
                error={error}
                ownersProducts={ownersProducts}
                changeLanguage={changeLanguage}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Checkout
                  api={api}
                  userId={userId}
                  user={user}
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
