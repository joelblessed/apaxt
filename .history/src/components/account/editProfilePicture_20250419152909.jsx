import React, { useState,useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";

import "./ProfileImageUpload.css";

const EditProfilePicture = ({ api }) => {
  const { user } = useContext(AuthContext);

  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = localStorage.getItem("userId");
  const gender = localStorage.getItem("gender")

  // Fetch current profile image
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        if (data.success && data.data.profileImage) {
          setProfileImage(data.data.profileImage);
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

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/profile-image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const result = await response.json();
      setProfileImage(result.data.profileImage);
      setSuccess("Profile image updated successfully!");
      setSelectedFile(null);
    } catch (err) {
      setError(err.message || "Failed to update profile picture");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("gender",user.gender)
  

  return (
    <div className="profile-image-upload-container">
      <div className="image-preview-container">
        <img
          src={
            selectedFile
            ? URL.createObjectURL(selectedFile)
            : profileImage || !profileImage user.gender === "male"
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

        {selectedFile && (
          <div className="file-info">
            <span>{selectedFile.name}</span>
            <span>{Math.round(selectedFile.size / 1024)} KB</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          className={`upload-button ${
            !selectedFile || isLoading ? "disabled" : ""
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
