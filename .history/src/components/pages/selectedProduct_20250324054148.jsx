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
  // const [product, setProduct] = useState(
  //   selectedProduct || localStorage.getItem("selectedProduct")
  // );
  const dispatch = useDispatch();
 const product

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
      <div
        style={{
          padding: "20px",
          margin: "0 auto",
          marginTop: "90px",
          maxWidth: "90%",
          maxHeight: "100vh",
          border: "1px solid green",
          borderRadius: "20px",
          // background:'red',
          boxShadow: "10px 0px 50px 0px pink",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ background: "", width: "40%" }}>
            {product.images && product.images.length > 0 ? (
              <Slider {...style.sliderSettings}>
                {product.images.map((imgUrl, index) => (
                  <div key={index}>
                    <img
                      src={imgUrl}
                      alt={`${product.title} - Image ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "500px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div>{SelectedProduct}</div>
          <div
            style={{ background: "#4ECDC4", width: "100%", marginLeft: "30px" }}
          >
            <div style={{ padding: "20px", margin: "0 auto" }}>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> {product.price}
              </p>
            </div>
            <div style={style.buttonsContainer}>
              <div>
                <button
                  style={style.buttons}
                  onClick={() => dispatch(addToCartBeforeLogin(product))}
                >
                  Add To Cart
                </button>
              </div>
              <div>
                <button
                  style={{ ...style.buttons }}
                  onClick={() => dispatch(product)}
                >
                  [add To WishList]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
     
    </>
  );
};

export default SelectedProduct;
