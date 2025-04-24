mport React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.category === categoryName);
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryName]);

  return (
    <div style={styles.container}>
      <h1>{categoryName}</h1>
      <div style={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productBox}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
      <Link to="/" style={styles.backButton}>Back</Link>
    </div>
  );
};

const styles = {
  container: { width: "80%", margin: "auto", textAlign: "center" },
  productsGrid: { display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" },
  productBox: {
    width: "120px",
    height: "150px",
    backgroundColor: "lightgray",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
  },
  image: { width: "80px", height: "80px", objectFit: "cover" },
  backButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "8px 15px",
    backgroundColor: "red",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default CategoryPage;