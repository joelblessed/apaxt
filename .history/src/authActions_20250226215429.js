import { LOGOUT_USER, SET_USER } from "./types";

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT_USER });
};