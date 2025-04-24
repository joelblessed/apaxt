import {
  setWishList,
  addToWishList,
  removeFromWishList,
  clearWishList,
} from "./wishlistSlice";

const API_URL = "http://localhost:5000/wishlist";

// *Add to Cart Before Login (Saves in LocalStorage)*
export const addToWishListBeforeLogin = (product) => (dispatch, getState) => {
  dispatch(addToWishList(product));
  localStorage.setItem("WishList", JSON.stringify(getState().cart.items));
};

// *Load Cart After Login (Merge Local with Server)*
export const loadWishListAfterLogin = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  let localCart = JSON.parse(localStorage.getItem("WishList")) || [];

  try {
    // Fetch user cart from the server
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    let userCart = response.ok ? await response.json() : { cart: [] };

    // Merge Local Cart & Server Cart (Remove Duplicates)
    const mergedCart = [
      ...new Map(
        [...localCart, ...userCart.cart].map((item) => [item.id, item])
      ).values(),
    ];

    dispatch(setWishList(mergedCart));
    console.log(setWishList);

    // Save merged cart to the server
    await fetch(`${API_URL}/merge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ localCart }),
    });

    // Clear local cart after merging
    localStorage.removeItem("WishList");
  } catch (error) {
    console.error("Error fetching :", error);
  }
};

// *Add to Cart After Login*
export const addWishListAPI = (product) => async (dispatch) => {
  const token = localStorage.getItem("token");

  dispatch(addToWishList(product));

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product }),
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

// *Remove Item from Cart*
export const removeFromWishListAPI = (productId) => async (dispatch, getState) => {
  const token = localStorage.getItem("token");

  dispatch(removeFromWishList(productId));

  try {
    await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};

// *Clear Cart (Logout)*
export const clearWishListOnLogout = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  dispatch(clearWishList());

  try {
    await fetch(API_URL, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};
