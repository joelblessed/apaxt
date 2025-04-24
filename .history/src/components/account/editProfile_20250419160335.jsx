import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const EditProfile = ({ api }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    id: "",
    email: "",
    userName: "",
    fullName: "",
    phone: "",
    country: "",
    address: "",
    gender: "",
    profileImage: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const response = await fetch(`${api}/profile?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        console.log("User data fetched successfully:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [api, userId, token]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size must be less than 5MB.");
        return;
      }
      setSelectedFile(file);
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: URL.createObjectURL(file), // Preview the image before upload
      }));
    }
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    console.log("Submitting form...");
    setIsLoading(true);
    setError("");
    try {
      console.log("Updating profile fields...");
      const updateProfile = await fetch(`${api}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user, id: userId }),
      });

      if (!updateProfile.ok) throw new Error("Profile update failed");
      console.log("Profile fields updated successfully.");

      if (selectedFile) {
        console.log("Uploading profile image...");
        const formData = new FormData();
        formData.append("profileImage", selectedFile);

        const uploadImage = await fetch(
          `${api}/profile/update-image/${userId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );

        if (!uploadImage.ok) throw new Error("Image upload failed");

        const imgResponse = await uploadImage.json();
        console.log("Image uploaded successfully:", imgResponse);
        setUser((prevUser) => ({
          ...prevUser,
          profileImage: imgResponse.user.profileImage, // Update profileImage state
        }));
        setSelectedFile(null); // Reset the file input
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error during form submission:", error);
      setError(error.message);
    } finally {
      console.log("Form submission process completed.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <p style={styles.error}>{error}</p>}
      <Link to="/deditProfilePicture">
        <img
          src={
            selectedFile
              ? URL.createObjectURL(selectedFile)
              : user.profileImage
              ? user.profileImage
              : user.gender === "male"
              ? "/images/svgviewer-man(2).svg"
              : "/images/svgviewer-woman(3).svg"
          }
          alt="Profile"
          width="100"
          height="100"
          style={{ borderRadius: "50%" }}
        />
      </Link>
      {/* <label style={styles.label}>
        Profile Image:
        <input
          type="file"
          name="profileImage"
          onChange={handleImageChange}
          style={styles.fileInput}
        />
      </label> */}
      <label style={styles.label}>
        Username:
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Phone:
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Address:
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <button type="submit" style={styles.button} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
  },
  label: { marginBottom: "10px", fontWeight: "bold" },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  fileInput: {
    marginBottom: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default EditProfile;
