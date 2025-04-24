import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import styled, { keyframes } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import CategoryBox from "./categoryBox";
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

const Category = ({
  filteredProducts,
  mobilefilteredProducts,
  api,
  searchTerm,
  highlightText,
  SelectedProduct,
  addToWishList,
  addToCart,
  categoryName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDProduct, setDSelectedProduct] = useState(null);
  const [selected, setSelected] = useState(false);
  const userId = localStorage.getItem("userId");
  const [showDetails, setShowDetails] = useState(true);
  const username = localStorage.getItem("username");
  const previewRef = useRef(null);
  const buttonRef = useRef(null);
  const { t, i18n } = useTranslation();
  const position = positions[i18n.language] || position.en;
  const fontSize = fontSizes[i18n.language] || fontSize.en;
  const navigate = useNavigate();
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

  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  const handleProductHid = () => {
    setSelectedProduct(null);
  };
  // const nextImage = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  // };

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
      setProducts(data);
    };
    fetchProducts();
  }, [api]);

  // Toggle like/dislike with one button
  const toggleLike = async (product) => {
    if (!product) return;

    const liked = product.likedBy.some((user) => user.userId === userId);
    const endpoint = liked ? "dislike" : "like";

    const response = await fetch(`${api}/products/${product.id}/${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, username }), // Send user info
    });

    const updatedProduct = await response.json();

    // Update state
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, ...updatedProduct } : p
      )
    );
    setSelectedProduct({ ...product, ...updatedProduct });
  };
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
  const CategoryName = (category) => {
    categoryName(category);
  };

  // useEffect(() => {
  //   // Attach event listener to the whole document
  //   document.addEventListener("mousedown", show);
  //   return () => {
  //     document.removeEventListener("mousedown", show);
  //   };
  // }, []);
 

  const groupByCategory = (filteredProducts) => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCategory(filteredProducts);
  // const  Dobject = Object.keys(groupedProducts).map((category) =>groupedProducts[category].slice(0,5)).flat()
  const Dobject = Object.keys(groupedProducts);
  const Dobject1 = Dobject.reduce((acc, category) => {
    acc[category] = groupedProducts[category].slice(0, 5);
    return acc;
  },{});
  return (
    <div>
      <div>
        <CategoryBox
          Mobject={mobilefilteredProducts}
          Dobject={Dobject}
          Dobject1={Dobject1}
          selectedDProduct={selectedProduct}
          toggleLike={toggleLike}
          show={show}
          handleProductClick={handleProductClick}
          hanldleProductHid={handleProductHid}
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

export default Category;
