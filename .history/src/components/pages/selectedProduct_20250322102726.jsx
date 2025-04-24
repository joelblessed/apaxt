import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import Home from "../pages/Home";
// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import Products from "../pages/products";
import { color } from "framer-motion";
import { beforeWrite } from "@popperjs/core";

const SelectedProduct = ({ api, selectedProduct}) => {
  const [product, setProduct] = useState(
    selectedProduct || localStorage.getItem("selectedProduct")
  );
  const dispatch = useDispatch();
 

  // // Fetch the products on component mount
  // useEffect(() => {
  //   fetch(`${api}/products`) // Adjust the URL to your JSON API endpoint
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Find the selected product (you can adjust this logic as needed)
  //       const selectedProduct = data.find((prod) => prod.isSelected);
  //       setProduct(selectedProduct);
  //     })
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, []);

  // Slider settings for displaying product images
  const style = {
    sliderSettings: {
      dots: true, // Show navigation dots
      infinite: true, // Enable infinite looping
      speed: 100, // Transition speed (ms)
      slidesToShow: 1, // Show one image at a time
      slidesToScroll: 1, // Scroll one image per action
      autoplay: true,
      autoplaySpeed: 3000, // Autoplay speed (ms)
    },
    buttonsContainer: {
      display: "flex",
    },
    buttons: {
      color: "orangered",
      background: "none",
      border: "2px solid orangered",
      margin: "10px",
      borderRadius: "10px",
      before: "+",
    },
  };

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <>
     
    </>
  );
};

export default SelectedProduct;
