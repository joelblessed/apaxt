import React, { useState, useEffect , useContext,} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./ProfileImageUpload.css";
const EditProfile = ({ api }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    id: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    address: "",
    gender: "",
    phone_number: "",
    profile_image: "", // Ensure this property exists for consistency
  });

  const [selectedFiles, setSelectedFiles] = useState([]); // Correct state name
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const { user } = useContext(AuthContext);

  

  // 🔹 Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${api}/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again.");
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
    const files = Array.from(e.target.files); // Handle multiple files
    if (files.some((file) => !file.type.startsWith("image/"))) {
      alert("Please select valid image files.");
      return;
    }
    if (files.some((file) => file.size > 5 * 1024 * 1024)) {
      alert("Each file size must be less than 5MB.");
      return;
    }
    setSelectedFiles(files);
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError("");
    try {
      const updateProfile = await fetch(`${api}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user, id: userId }),
      });

      if (!updateProfile.ok) {
        throw new Error(`Profile update failed: ${updateProfile.statusText}`);
      }

      if (selectedFiles.length > 0) {
        const formData = new FormData();
        formData.append("profileImage", selectedFiles[0]); // Handle only the first file

        const uploadImage = await fetch(`${api}/profile/update-image/${userId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!uploadImage.ok) {
          throw new Error(`Image upload failed: ${uploadImage.statusText}`);
        }

        const imgResponse = await uploadImage.json();
        setUser((prevUser) => ({
          ...prevUser,
          profile_image: imgResponse.user.profile_image, // Correct property name
        }));
        setSelectedFiles([]); // Reset the file input
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error during form submission:", error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("user",user.gender)


  return (<>

<div  className="profile-image-upload-container">
        <div className="image-preview-container">
          <img
            src={
              selectedFiles.length > 0
                ? URL.createObjectURL(selectedFiles[0]) // Use the first file for preview
                : user.profile_image // Use the correct state object (user)
                ? user.profile_image
                : user.gender === "male" // Use user.gender instead of user.gender
                ? "/images/svgviewer-man(2).svg"
                : "/images/svgviewer-woman(3).svg"
            }
            alt="Profile preview"
            className="profile-image-preview"
            onError={(e) => {
              e.target.src =
                user.gender === "male"
                  ? "/images/svgviewer-man(2).svg"
                  : "/images/svgviewer-woman(3).svg";
            }}
          />
        </div>

        <div className="upload-controls">
          <input
            type="file"
            id="profileImageUpload"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleImageChange}
            disabled={isLoading}
            className="file-input"
          />

          <label htmlFor="profileImageUpload" className="file-upload-label">
            Choose Image
          </label>

          {selectedFiles.length > 0 && (
            <div className="file-info">
              <span>{selectedFiles[0].name}</span> {/* Show the first file name */}
              <span>{Math.round(selectedFiles[0].size / 1024)} KB</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedFiles.length === 0 || isLoading}
            className={`upload-button ${
              selectedFiles.length === 0 || isLoading ? "disabled" : ""
            }`}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Uploading...
              </>
            ) : (
              "Upload Image"
            )}
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <p style={styles.error}>{error}</p>}
    
      <label style={styles.label}>
        Username:
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        First Name:
        <input
          type="text"
          name="first_name"
          value={user.first_name}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={user.last_name}
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
          name="phone_number"
          value={user.phone_number}
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
    </>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",
    margin: "0 auto",
    backgrround: "red",
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
