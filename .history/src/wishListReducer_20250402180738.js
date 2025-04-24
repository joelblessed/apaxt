const initialState = {
    items: [], // Ensure the wishlist starts as an empty array
  };
  
  const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case "wishlist/add":
        return {
          ...state,
          items: [...state.items, action.payload], // Add item to wishlist
        };
      case "wishlist/remove":
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload), // Remove by ID
        };
      default:
        return state;
    }
  };
  
  export default wishlistReducer;