import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";

const EditProfilePicture = ({ api }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { profileImage, updateProfileImage } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    setError(null);
    setSuccess(false);
    const file = e.target.files[0];
    
    // Basic client-side validation
    if (file) {
      if (!file.type.match('image.*')) {
        setError("Please select an image file (JPEG, PNG, GIF)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    if (!token) {
      setError("Authentication required. Please login again.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append("profileImage", selectedFile); // Match backend field name

      const response = await fetch(${api}/profile/update-image/${userId}, {
        method: "PUT",
        headers: { 
          Authorization: Bearer ${token} 
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Image upload failed");
      }

      const result = await response.json();
      const newImageUrl = `${api}${result.user.profileImage};
      
      // Update context with new image
      updateProfileImage(newImageUrl);
      setSuccess(true);
      setSelectedFile(null);
      
    } catch (error) {
      setError(error.message || "An error occurred while uploading the image.");
    } finally {
      setIsLoading(false);
    }
  };

  const imageSrc = selectedFile 
    ? URL.createObjectURL(selectedFile) 
    : profileImage || "/default-profile.png";

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.imageContainer}>
        <img
          src={imageSrc}
          alt="Profile"
          style={styles.profileImage}
        />
      </div>
      
      <label style={styles.label}>
        Upload New Profile Picture:
        <input 
          type="file" 
          accept="image/jpeg, image/png, image/gif"
          onChange={handleImageChange}
          style={styles.fileInput}
          disabled={isLoading}
        />
      </label>
      
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>Profile picture updated successfully!</div>}
      
      <button 
        type="submit" 
        style={styles.button}
        disabled={!selectedFile || isLoading}
      >
        {isLoading ? "Uploading..." : "Upload"}
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
    gap: "15px",
  },
  imageContainer: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #ddd",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontWeight: "500",
    width: "100%",
  },
  fileInput: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.2s",
    ":disabled": {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
  },
  error: {
    color: "#dc3545",
    padding: "8px",
    borderRadius: "4px",
    backgroundColor: "#f8d7da",
    width: "100%",
    textAlign: "center",
  },
  success: {
    color: "#28a745",
    padding: "8px",
    borderRadius: "4px",
    backgroundColor: "#d4edda",
    width: "100%",
    textAlign: "center",
  },
};

export default EditProfilePicture;