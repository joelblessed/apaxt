import { login, logout } from "../authJs/authSlice";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await authApi.login(credentials);
    const { token, user } = response;

    // Use AuthContext's login function
    const { login: authContextLogin } = useContext(AuthContext);
    authContextLogin(
      token,
      user.role,
      user.profile_image,
      user.gender,
      user.email,
      user.wallet,
      user.phone_number,
      user.address,
      user.country,
      user.first_name,
      user.last_name,
      user.username,
      user.referral_code,
      user.id,
      user.city,
      user.date_of_birth
    );

    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);

    dispatch(login(user));

    // Merge carts after successful login
    dispatch(mergeCartsAfterLogin());

    // Load fresh cart data
    dispatch(loadCart());
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => (dispatch) => {
  const { logout: authContextLogout } = useContext(AuthContext);
  authContextLogout();

  dispatch(logout());
};