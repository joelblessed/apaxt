import React, { useState, useEffect } from "react";

const EditProfilePicture = ({ api }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
 const { username, profileImage } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage"));
  const [selectedFile, setSelectedFile] = useState(null);


  // 🔹 Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // 🔹 Upload Profile Image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select an image!");

    try {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      const uploadImage = await fetch(`${api}/profile/update-image/${userId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!uploadImage.ok) throw new Error("Image upload failed");

      const imgResponse = await uploadImage.json();
      setProfileImage(`${api}${imgResponse.user.profileImage}`); // Update image URL

      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label>
        <img
          src={profileImage ? `${api}${profileImage}` : "/default-profile.png"}
          alt="Profile"
          width="100"
          height="100"
          style={{ borderRadius: "50%" }}
         
        />
        
      </label>
      <label style={styles.label}>
        Upload New Profile Picture:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <button type="submit" style={styles.button}>
        Upload
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
  },
  label: { marginBottom: "10px", fontWeight: "bold" },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default EditProfilePicture;