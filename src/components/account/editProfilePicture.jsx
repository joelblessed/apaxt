import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";

import "./ProfileImageUpload.css";

const EditProfilePicture = ({ api }) => {
  const { user } = useContext(AuthContext);
  const [User, setUser] = useState([])
  const token = localStorage.getItem("token");

  const [profileImage, setProfileImage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = localStorage.getItem("userId");

  // Fetch current profile image
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/profile/${userId}` // Fixed endpoint
        );
        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        if (data.profile_image) { // Fixed to match backend response
          setProfileImage(data.profile_image);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfileImage();
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset messages
    setError("");
    setSuccess("");

    // Validate file type
    if (!file.type.match("image/(jpeg|png|gif)")) {
      setError("Only JPEG, PNG, and GIF images are allowed");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setSelectedFiles(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Update profile info
      const updateProfileResponse = await fetch(`${api}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...User, id: userId }),
      });

      if (!updateProfileResponse.ok) {
        throw new Error(`Profile update failed: ${updateProfileResponse.statusText}`);
      }

      // Upload profile image if a file is selected
      if (selectedFiles) {
        const formData = new FormData();
        formData.append("profileImage", selectedFiles);

        const uploadImageResponse = await fetch(`${api}/profile/update-image/${userId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!uploadImageResponse.ok) {
          throw new Error(`Image upload failed: ${uploadImageResponse.statusText}`);
        }

        const imgResponse = await uploadImageResponse.json();
        setProfileImage(imgResponse.user.profile_image); // Update profile image state
      }

      setSuccess("Profile updated successfully!");
      setSelectedFiles(null); // Reset file input
    } catch (error) {
      console.error("Error during upload:", error.message);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-image-upload-container">
      <div className="image-preview-container">
        <img
          src={
            selectedFiles
              ? URL.createObjectURL(selectedFiles)
              : profileImage
              ? profileImage
              : user.gender === "male"
              ? "/images/svgviewer-man(2).svg"
              : "/images/svgviewer-woman(3).svg"
          }
          alt="Profile preview"
          className="profile-image-preview"
        />
      </div>

      <div className="upload-controls">
        <input
          type="file"
          id="profileImageUpload"
          accept="image/jpeg, image/png, image/gif"
          onChange={handleFileChange}
          disabled={isLoading}
          className="file-input"
        />

        <label htmlFor="profileImageUpload" className="file-upload-label">
          Choose Image
        </label>

        {selectedFiles && (
          <div className="file-info">
            <span>{selectedFiles.name}</span>
            <span>{Math.round(selectedFiles.size / 1024)} KB</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFiles || isLoading}
          className={`upload-button ${
            !selectedFiles || isLoading ? "disabled" : ""
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
        {success && <div className="success-message">{success}</div>}
      </div>
    </div>
  );
};

export default EditProfilePicture;
