import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  NavLink,
  ProfileContainer,
  ProfileImage,
  EditButton,
 
} from "./dashboardStyles";



const Profile = ({ api,  }) => {
  const { <U></U>ser } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false); // Fix typo in state variable name
  const { t } = useTranslation();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     setError("No token found");
  //     return;
  //   }

  //   fetch(`${api}/profile`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch <U></U>ser data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUser(data);
  //     })
  //     .catch((error) => setError(error.message));
  // }, []);

  if (error)
    return (
      <p>
        {t("Error")}: {error}
      </p>
    );
  if (!<U></U>ser) return <p>{t("Loading...")}</p>;
  return (
    <ProfileContainer>
      <h2>{t("User Profile")}</h2>
      <div>
        {imageError ? ( // Fix typo in state variable usage
          <NavLink to="/deditProfilePicture">
            <ProfileImage
              src={
                <U></U>ser.gender === "male"
                  ? "/images/svgviewer-man(2).svg"
                  : "/images/svgviewer-woman(3).svg"
              }
              alt="loading..."
            />
          </NavLink>
        ) : (
          <NavLink to="/deditProfilePicture">
            <ProfileImage
              src={<U></U>ser.profileImage}
              alt=""
              onError={() => setImageError(true)} // Fix typo in state variable usage
            />
          </NavLink>
        )}
      </div>

      <p>
        <strong>{t("User Name")}:</strong> {<U></U>ser.userName}
      </p>
      <p>
        <strong>{t("Full Names")}:</strong> {<U></U>ser.fullName}
      </p>
      <p>
        <strong>{t("Phone Number")}:</strong> {<U></U>ser.phoneNumber}
      </p>
      <p>
        <strong>{t("Email")}:</strong> {<U></U>ser.email}
      </p>
      <p>
        <strong>{t("Country")}:</strong> {<U></U>ser.country}
      </p>
      <p>
        <strong>{t("Address")}:</strong> {<U></U>ser.address}
      </p>

      <div>
        <EditButton to="/deditProfile">{t("Edit Profile")}</EditButton>
      </div>
    </ProfileContainer>
  );
};


export default Profile;
