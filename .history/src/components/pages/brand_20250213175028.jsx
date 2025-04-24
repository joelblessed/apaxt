import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Brands = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:5000/products")
//       .then((res) => res.json())
//       .then((data) => setBrands(data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

  return (
    <div style={styles.container}>
      <h1>Our Brands</h1>
      <div style={styles.brandsGrid}>
        {products.map((brand) => (
          <div 
            key={brand.id} 
            style={styles.brandBox} 
            onClick={() => navigate(`/brand/${brand.id}`)}
          >
            <img src={brand.image} alt={brand.name} style={styles.image} />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { width: "80%", margin: "auto", textAlign: "center" },
  brandsGrid: { display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" },
  brandBox: {
    width: "200px",
    height: "180px",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    cursor: "pointer",
    padding: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
  },
  image: { width: "100px", height: "100px", objectFit: "contain", marginBottom: "10px" }
};

export default Brands;