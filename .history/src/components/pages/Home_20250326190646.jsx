import React, { createContext, useEffect, useState } from "react";

const Home = ({ api, brands, filteredProducts, ownersProducts }) => {
  // const [products, setProducts] = useState([])
  // const owner = 9
  // useEffect(() => {
  //   fetch(`${api}/products`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const filteredProducts = data.filter((product) => product.ownerId === owner);
  //       setProducts(filteredProducts);
  //     })
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, [owner]);
  const id = localStorage.getItem("userId");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        marginTop: "100px",
      }}
    >
      {brands.map((brand, index) => (
        <div>
          <div
            style={{
              boxShadow: "0px 0px 10px 10px red",
              width: "200px",
              height: "200px",
              textAlign: "center",
              justifyContent: "center",
              background: "blue",
            }}
            key={index}
          >
            <label
              style={{
                color: "white",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "50px",
                alignContent:"center",
                alignItems
                background:"green"
              }}
            >
              {brand}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
