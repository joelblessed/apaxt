import { UPDATE_PROFILE_PICTURE, SET_USER } from "./types";

const API_URL = "http://localhost:5000/user";

export const updateProfilePicture = (userId, formData) => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/${userId}/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload image");

        const data = await response.json();
        dispatch({ type: UPDATE_PROFILE_PICTURE, payload: data.imageUrl });

        // Update user info
        dispatch({ type: SET_USER, payload: data.user });
    } catch (error) {
        console.error("Error updating profile picture:", error);
    }
};