import React from "react";
import Products from "../products/products";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Cart2({ api,searchTerm, highlightText }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch images from the local API
    fetch(`${api}/cart?_sort=_id&_order=desc`) // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Increment Products
  const incrementQuantity = (itemId,currentQuantity)=>{
    const updatedQuantity = currentQuantity + 1;
    var requestOptions = {
  method: 'PUT',
  redirect: 'follow'
};

fetch(`${api}/cart/${itemId}/increment`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  setProducts(
    filteredProducts.map((item) =>
     item.id === itemId ? { ...item, quantity: updatedQuantity } : item
   ));

  }      


  // Function to increment quantity in the database
  // const incrementQuantity = async (itemId, currentQuantity) => {
  //   const updatedQuantity = currentQuantity + 1;

  //   try {
  //     await fetch(`http://localhost:5000/cart/${itemId}`, {
  //       method: "PATCH", // Use PATCH to update a specific field
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ quantity: updatedQuantity }),
  //     });

  //     // Update local state to reflect the changes
  //     setProducts(
  //       filteredProducts.map((item) =>
  //         item.id === itemId ? { ...item, quantity: updatedQuantity } : item
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating quantity:", error);
  //   }
  // };

  // decrement Product
  const decrementQuantity = (itemId,currentQuantity)=>{
    const updatedQuantity = currentQuantity -1;
    if (currentQuantity <= 1) return;
    var requestOptions = {
  method: 'PUT',
  redirect: 'follow'
};

fetch(`${api}/cart/${itemId}/decrement`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  setProducts(
    filteredProducts.map((item) =>
     item.id === itemId ? { ...item, quantity: updatedQuantity } : item
   ));
  }

  // const decrementQuantity = async (itemId, currentQuantity) => {
  //   if (currentQuantity <= 1) return;
  //   const updatedQuantity = currentQuantity - 1;

  //   try {
  //     await fetch(`http://localhost:5000/cart/${itemId}`, {
  //       method: "PATCH", // Use PATCH to update a specific field
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ quantity: updatedQuantity }),
  //     });

  //     // Update local state to reflect the changes
  //     setProducts(
  //       filteredProducts.map((item) =>
  //         item.id === itemId ? { ...item, quantity: updatedQuantity } : item
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating quantity:", error);
  //   }
  // };

  // delet fron cart

  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  const deleteItem = async (itemId) => {
    try {
      await  fetch(`${api}/cart/${itemId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      // Remove the deleted item from state
      setProducts(filteredProducts.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  
  // useEffect(() => {
  //  if (updatedQuantity === 1){
  //   setDisable(true)
  //  }
  // });

  return (
    <div style={{ background: "none" }}>
      {filteredProducts.length === 0 ? (
        <h1>No items in the cart</h1>
      ) : (
        <div className="box1" style={{ width: "100%" }}>
          <h1></h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div style={{}}>
                {/* <div>
                        <a className='btn btn-primary btn-sm me-1' href="">
                            Edit
                        </a>
                        <button type='button' className='btn btn-danger btn-sm'>Delete</button>
                    </div> */}

                {filteredProducts.map((product, index) => (
                  <div
                    style={{
                      width: "90%",
                      margin: "20px",
                    }}
                  >
                    <div
                      key={product.id}
                      style={{
                        width: "auto",
                        height: "200px",
                        marginTop: "10px",
                      }}
                      className="box2"
                    >
                      <div style={{ display: "flex" }}>
                        <div style={{ display: "grid", marginRight: "10px" }}>
                        {product.images.length > 0 ? (
                       <img
                           src={product.images[0]} // Display first image only
                           alt={product.name}
                           style={{
                               width: "300px",
                               height: "300px",
                               objectFit: "cover",
                               borderRadius: "8px",
                           }}
                       />
                   ) : (
                       <p>No image available</p>
                   )}
                        </div>

                        <div style={{ display: "grid", width: "100%" }}>
                          <label
                            style={{ background: "yellow", height: "25px" }}
                          >
                            Description:{" "}
                          </label>
                          <p
                            style={{
                              background: "red",
                              height: "100px",
                              marginTop: "1px",
                              overflow: "auto",
                            }}
                          >
                            {product.desc}
                          </p>
                          <span
                            className="text"
                            style={{
                              background: "green",
                              height: "72px",
                              width: "200px",
                              marginTop: "-16px",
                            }}
                          >
                            <a
                              className="name"
                              style={{
                                background: "",
                                width: "auto",
                                height: "",
                                color: "black",
                                fontSize: "15px",
                              }}
                            >
                              <span
                                style={{ color: "black" }}
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(
                                    product.name,
                                    searchTerm
                                  ),
                                }}
                              ></span>
                            </a>
                            <a
                              style={{
                                background: "",
                                marginTop: "px",
                                fontSize: "14px",
                              }}
                            >
                              Price:<a>cfa {product.price}</a>
                            </a>
                            <div
                              style={{
                                background: "",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <label
                                style={{
                                  border: "1px solid blue",
                                  width: "40px",
                                  borderRadius: "8px",
                                  color: "white",
                                  fontWeight: "bold",
                                  background: "blue",
                                  height: "25px",
                                  textAlign: "center",
                                  fontSize: "15px",
                                }}
                              >
                                {product.quantity}
                              </label>
                              <button
                                style={{
                                  border: "1px solid grey",
                                  width: "50px",
                                  borderRadius: "8px",
                                  color: "white",
                                  fontWeight: "bold",
                                  background: "grey",
                                  height: "25px",
                                }}
                                onClick={() =>
                                  incrementQuantity(
                                    product.id,
                                    product.quantity
                                  )
                                }
                              >
                                +
                              </button>
                              <button 
                                style={{
                                  border: "1px solid grey",
                                  width: "50px",
                                  borderRadius: "8px",
                                  color: "white",
                                  fontWeight: "bold",
                                  background: "grey",
                                  height: "25px",
                                }}
                                onClick={() =>
                                  decrementQuantity(
                                    product.id,
                                    product.quantity
                                  )
                                }
                              >
                                -
                              </button>
                              <button
                                style={{
                                  border: "1px solid red",
                                  width: "50px",
                                  borderRadius: "8px",
                                  color: "red",
                                  fontWeight: "bold",
                                  background: "none",
                                  height: "25px",
                                }}
                                onClick={() => deleteItem(product.id)}
                              >
                                X
                              </button>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="cart">
                  <Link to={"/checkout"} className="btn btn-warning">
                    checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart2;
