import logo from "./logo.png";
import React, {
  createContext,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import {HelmetProvider} from "react-helmet-async"
import { AuthContext, AuthProvider } from "./AuthContext";
import { SnackbarProvider } from "notistack";
import { api } from "./config";
import { addToWishlist, removeFromWishlist } from "./wishlistSlice";
import { useMemo } from "react";
import { debounce } from "lodash";
import Fuse from "fuse.js";
import { loadCart } from "./cartJs/cartThunks";
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
import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ProductPage from "./components/products/product"
import "react-toastify/dist/ReactToastify.css";
import Products from "./components/products/products";
import Cart from "./components/Cart/cart";
import Cart1 from "./components/Cart/cart1";
import Box from "./components/ProductCards/boxes";
import Cart2 from "./components/Cart/Cart2";
import Home from "./components/home/Home";
import NewProduct from "./components/formUpload/formUpload";
import Account from "./components/account/signUP";
import Discounts from "./components/products/discountedProducts";
import SelectedProduct from "./components/products/selectedProduct";
import Category from "./components/category/category";
import CategoryPage from "./components/category/categoryPage";
import EditProfilePicture from "./components/account/editProfilePicture";
import DesktopCards from "./components/ProductCards/desktopCards";
import WishlistPage from "./components/wishlist/wishListPage";
import WishlistButton from "./components/wishlist/wishlistButton";
// import WishList from "./components/pages/wishList";
import Wallet from "./components/account/wallet";
import LastViewedProducts from "./components/account/lastviewedProducts";
import BrandPage from "./components/unauthirized/brandPage";
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
import CalculateDistance from "./components/support/calculateDistance";
import Customer from "./components/others/customer";
import Test from "./components/support/test";
import Orders from "./components/orders/orders";
import Orders2 from "./components/orders/orders2";
import EditProduct from "./components/products/editProduct";
import ProductsByOwner from "./components/products/productsByOwner";
import Logs from "./components/account/logs";
import Checkout from "./components/Cart/checkout";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./components/account/forgotPasword";
import ResetPassword from "./components/account/resetPassword";
import FormUpload from "./components/formUpload/formUpload";
import About from "./components/Navbar/about";
import ProductList from "./components/products/productList";
import ProductCard from "./components/ProductCards/productCard";
import DeleteProduct from "./components/products/deleteProduct";
import Footer from "./components/Navbar/footer";
import OrdersReview from "./components/orders/ordersReview";
import OrdersPreview from "./components/orders/ordersPreview";
import Unauthorized from "./components/unauthirized/unauthorized";

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
  const [seller, setSeller] = useState([]);
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
  const [ownersProducts, setOwnersProducts] = useState([]);
  const [discounts, setDiscount] = useState([]);
  const [inwishlist, setInWishList] = useState([null]);
  const [handleProductSearch, setHandleProductSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(1); // Number of items per p
  const [likedProducts, setLikedProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const { t, i18n } = useTranslation();
  const [searchFunction, setSearchFunction] = useState(null);
  const [page, setPage] = useState(1); // Track current page for infinite scroll
  const [hasMore, setHasMore] = useState(true);
  const [isEnglish, setIsEnglish] = useState(i18n.language === "en");
  const loaderRef = useRef();
  const [orderCount, setOrderCount] = useState(0);

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
    // Load cart on app initialization
    dispatch(loadCart());
  }, [dispatch]);

  // /////////////////////////////////////////////

  useEffect(() => {
    fetch(`${api}/AllProfiles`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch profiles: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setAllProfiles(data);
        console.log("Fetched profiles successfully:", data); // Debug log
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${api}/allProducts`) // Adjust the URL if necessary
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const products = data.products; // Extract products from the response
        setAllProducts(products);
        setFilteredProducts(products);

        const filteredProducts = products.filter(
          (product) => product.owner_id === userId
        );
        setOwnersProducts(filteredProducts);

        // Extract unique categories from the products
        const uniqueCategories = [
          ...new Set(products.map((product) => product.category?.main)),
        ];
        setCategories(uniqueCategories);

        // Filter products that have a discount
        const discountedProducts = products.filter(
          (product) => product.discount > 0
        );
        setDiscount(discountedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [userId]);

  const mobilefilteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category?.main === category);

  // Handle filtering logic
  const handleSearch = (query) => {
    setSearchTerm(query);
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
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "1.2rem" }}>loading...</p>
      </div>
    );
  }

  return (
    <HelmetProvider>
    
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
            glofilteredProducts={allProducts}
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
            handleProductSearch={handleProductSearch}
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
                glofilteredProducts={allProducts}
                discounts={discounts}
                SelectedProduct={setSelectedProduct}
                filteredProducts={filteredProducts}
                ownersProducts={ownersProducts}
                mobilefilteredProducts={mobilefilteredProducts}
                searchTerm={searchTerm}
                search={handleSearch}
                product={setProduct}
                getProducts={products}
                setSearchTerm={setSearchTerm}
                highlightText={highlightText}
                products={products}
                loaderRef={loaderRef}
                handleSearchButton={setHandleProductSearch}
                allProducts={allProducts}
                category={category}
                Seller={setSeller}
              />
            }
          ></Route>
          <Route
            path="/products"
            element={
              <Products
                filteredProducts={filteredProducts}
                SelectedProduct={setSelectedProduct}
                Seller={setSeller}
                highlightText={highlightText}
                products={products}
                loaderRef={loaderRef}
                handleSearchButton={setHandleProductSearch}
                api={api}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                glofilteredProducts={allProducts}
                category={category}
              />
            }
          ></Route>
          <Route path="/product/:productSlug" 
          element={<ProductPage  
                  filteredProducts={filteredProducts}
                SelectedProduct={setSelectedProduct}
                Seller={setSeller}
                highlightText={highlightText}
                products={products}
                loaderRef={loaderRef}
                handleSearchButton={setHandleProductSearch}
                api={api}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                glofilteredProducts={allProducts}
                category={category}
           />} />
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
                filteredProducts={filteredProducts}
                seller={seller}
                cart={cart}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
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
                filteredProducts={filteredProducts}
                SelectedProduct={setSelectedProduct}
                highlightText={highlightText}
                products={products}
                loaderRef={loaderRef}
                handleSearchButton={setHandleProductSearch}
                api={api}
                allProducts={allProducts}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                glofilteredProducts={allProducts}
                category={category}
              />
            }
          ></Route>
          <Route
            path="/boxes"
            element={
              <Box
                api={api}
                selectedCategory={selectedCategory}
                Seller={setSeller}
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
              <ProtectedRoute allowedRoles={["admin"]}>
                <Customer api={api} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/ordersReview"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller"]}>
                <OrdersReview api={api} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/ordersPreview"
            element={
              // <ProtectedRoute allowedRoles={["admin", "seller",, "user"]}>
              <OrdersPreview api={api} />
              // </ProtectedRoute>
            }
          ></Route>
          <Route path="/signIN" element={<SignIN api={api} />} />
          <Route path="/logs" element={<Logs api={api} />} />
          <Route
            path="/lastViewedProducts"
            element={<LastViewedProducts api={api} />}
          />
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
              <ProtectedRoute allowedRoles={["admin"]}>
                <Orders OrderCount={setOrderCount} api={api} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders2"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller"]}>
                <Orders2
                  token={token}
                  userId={userId}
                  api={api}
                  glofilteredProducts={allProducts}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller", "user"]}>
                <Profile api={api} user={user} error={error} />
              </ProtectedRoute>
            }
          />
          <Route path="/wallet" element={<Wallet api={api} user={user} />} />
          <Route
            path="/editProfile"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller", "user"]}>
                <EditProfile api={api} userInfo={user} error={error} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/desktopCards"
            element={
              <DesktopCards
                Dobject={filteredProducts}
                highlightText={highlightText}
                api={api}
              />
            }
          />
          <Route
            path="/editProduct/:productId/:userId"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditProduct api={api} />
              </ProtectedRoute>
            }
          />
          <Route path="/productCard" element={<ProductCard api={api} />} />
          <Route
            path="/deleteProduct"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller"]}>
                <DeleteProduct api={api} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calculateDistance"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CalculateDistance api={api} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editProfilePicture"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller", "user"]}>
                <EditProfilePicture api={api} />
              </ProtectedRoute>
            }
          />
          ``
          <Route
            path="/productsByOwner/:sellerId/:ownerName"
            element={
              <ProductsByOwner
                api={api}
                SelectedProduct={setSelectedProduct}
                highlightText={highlightText}
                loaderRef={loaderRef}
                searchTerm={searchTerm}
                glofilteredProducts={allProducts}
                setSearchTerm={setSearchTerm}
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
                SelectedProduct={setSelectedProduct}
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
                api={api}WishlistPWishlistP
                searchTerm={searchTerm}
                highlightText={highlightText}
                glofilteredProducts={allProducts}
                Seller={setSeller}
              />
            }
          />
          <Route
            path="/forgotPassword"
            element={<ForgotPassword api={api} />}
          />
          <Route
            path="/resetPassword"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller", , "user"]}>
                <ResetPassword api={api} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productList"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller"]}>
                <ProductList
                  SelectedProduct={setSelectedProduct}
                  api={api}
                  highlightText={highlightText}
                  loaderRef={loaderRef}
                  searchTerm={searchTerm}
                  glofilteredProducts={allProducts}
                  setSearchTerm={setSearchTerm}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categoryPage"
            element={
              <CategoryPage
                api={api}
                items={products}
                glofilteredProducts={allProducts}
                selectedCategory={selectedCategory}
                highlightText={highlightText}
                SelectedProduct={setSelectedProduct}
                setSelectedProduct={setSelectedProduct}
                cart={cart}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/Payment"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Payment
                  api={api}
                  amount={calalculateTotal}
                  checkout={checkout}
                  setPaymentStatus={setPaymentStatus}
                  setPhoneNumber={setPhoneNumber}
                  setPaymentId={setPaymentId}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Cart2"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Cart2
                  api={api}
                  searchTerm={searchTerm}
                  highlightText={highlightText}
                  inwishlist={inwishlist}
                />
              </ProtectedRoute>
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
                glofilteredProducts={allProducts}
                inwishlist={inwishlist}
              />
            }
          />
          <Route
            path="/formUpload"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller", "user"]}>
                <FormUpload api={api} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller", "user"]}>
                <Dashboard
                  api={api}
                  user={user}
                  error={error}
                  ownersProducts={ownersProducts}
                  changeLanguage={changeLanguage}
                  glofilteredProducts={allProducts}
                  orderCount={orderCount}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["admin", "seller", "user"]}>
                <Checkout
                  api={api}
                  userId={userId}
                  user={user}
                  setCalculateTotal={setCalculateTotal}
                  setCheckOut={setCheckOut}
                  glofilteredProducts={allProducts}
                  paymentStatus={paymentStatus}
                  paymentNumber={phoneNumber}
                  paymentId={paymentId}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About api={api} />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* Redirect unknown routes */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
        {/* <Test/> */}
        <div className="app-container">
          {/* Your main content goes here */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
