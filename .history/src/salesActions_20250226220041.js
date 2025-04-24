import { SET_SALES_RECORDS, SET_WALLET_BALANCE } from "./types";

const API_URL = "http://localhost:5000/sales";

// Fetch sales records and wallet balance
export const fetchSalesRecords = (userId) => async (dispatch) => {
    try {
        const response = await fetch(${API_URL}/user/${userId});
        const data = await response.json();

        dispatch({ type: SET_SALES_RECORDS, payload: data.records });
        dispatch({ type: SET_WALLET_BALANCE, payload: data.walletBalance });
    } catch (error) {
        console.error("Error fetching sales records:", error);
    }
};