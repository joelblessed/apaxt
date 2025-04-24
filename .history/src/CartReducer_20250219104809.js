const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return { ...state, items: [...state.items, action.payload] };
        case "SET_CART":
            return { ...state, items: action.payload };
        default:
            return state;
    }
};