import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { addToWishListAPI } from "../../wishlistAction";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useNavigate, useParams, Link } from "react-router-dom";
import Box from './boxes'
import { addToCart, removeFromCart } from "../../cartSlice";
import "../translations/i18n";
import {
  BoxContainer,
  AddtocartButton,
  MAddtocartButton,
  MAddToWishList,
  Price,
  Discount,
  DescriptionContainer,
  DescriptionTitle,
  DescriptionContent,
  StatusContainer,
  StatusContent,
  StatusTitle,
  CloseButton,
  Name,
  positions,
  fontSizes,
  categoryShadow,
} from "./styledComponents";


const ProductsByOwner = ({
  api,
  loading,
  add,
  images,

  SelectedProduct,
  addToCart,
  addToWishList,
  handleShowAlert,
  showAlert,
  mobilefilteredProducts,
  searchTerm,
  highlightText,
  filteredProducts,

  selectedCategory,
  Fortop,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDProduct, setDSelectedProduct] = useState(null);
  const [selected, setSelected] = useState(false);
  const userId = localStorage.getItem("userId");
  const [showDetails, setShowDetails] = useState(true);
  const username = localStorage.getItem("username");
  const previewRef = useRef(null);
  const { ownerName } = useParams();
  const buttonRef = useRef(null);
  const { t,i18n } = useTranslation();
    const position = positions[i18n.language] || position.en;
    const fontSize = fontSizes[i18n.language] || fontSize.en;
  const dispatch = useDispatch(); // Function to check screen size

  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  const hanldleProductHid = () => {
    setSelectedProduct(null);
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Toggle the selection state of a product
  const toggleSelection = (id, currentSelection) => {
    // Update the product on the server using PATCH
    fetch(`${api}/updateProducts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isSelected: !currentSelection }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        // Update the local state to reflect the change
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${api}/products`);
      const data = await response.json();
      const filteredByOwner = data.filter(
        (product) => product.owner === ownerName
      );
      setProducts(filteredByOwner);
      // setProducts(data);
    };
    fetchProducts();
  }, [api]);

  // // Toggle like/dislike with one button
  // const toggleLike = async (product) => {
  //   if (!product) return;

  //   const liked = product.likedBy.some((user) => user.userId === userId);
  //   const endpoint = liked ? "dislike" : "like";

  //   const response = await fetch(`${api}/products/${product.id}/${endpoint}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userId, username }), // Send user info
  //   });

  //   const updatedProduct = await response.json();

  //   // Update state
  //   setProducts(
  //     products.map((p) =>
  //       p.id === product.id ? { ...p, ...updatedProduct } : p
  //     )
  //   );
  //   setSelectedProduct({ ...product, ...updatedProduct });
  // };
  // ////////////////////////////////////////////////////////

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  // ///////////////////////////////////////////////////////////

  const show = (event) => {
    setShowDetails((prevShow) => !prevShow);
    if (previewRef.current && !previewRef.current.contains(event.target)) {
    }
  };

  // useEffect(() => {
  //   // Attach event listener to the whole document
  //   document.addEventListener("mousedown", show);
  //   return () => {
  //     document.removeEventListener("mousedown", show);
  //   };
  // }, []);
 

  return (
    <div>
         <div>
           <Box
             Mobject={products}
             Dobject={products}
             selectedDProduct={selectedProduct}
            //  toggleLike={toggleLike}
             show={show}
             handleProductClick={handleProductClick}
             hanldleProductHid={handleProductClick}
             isMobile={isMobile}
             setSelectedProduct={setSelectedProduct}
             selectedProduct={selectedProduct}
             showDetails={showDetails}
             position={position}
             fontSize={fontSize}
             highlightText={highlightText}
           />
         </div>
       </div>
  );
};

export default ProductsByOwner;
