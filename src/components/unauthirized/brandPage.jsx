import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Box from '../ProductCards/boxes'

const BrandPage = ({
  api,
  SelectedProduct,
  highlightText,

}) => {

  const [products, setProducts] = useState([]);
  const { brandName } = useParams();
  const navigate = useNavigate();
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${api}/products`);
      const data = await response.json();
      const fetched = data.products || data;
      const filteredBrands = fetched.filter((product) =>
        product.brand.some((brand) => brand.name === brandName)
      );
      // setProducts(data);
      setProducts(filteredBrands);
    };
    fetchProducts();
  }, [api]);

 

  return (
    <div>
          <div>
            <Box
              Mobject={products}
              Dobject={products}
              SelectedProduct={SelectedProduct}
              handleProductClick={handleProductClick}
              highlightText={highlightText}
            />
          </div>
        </div>
  );
};

export default BrandPage;
