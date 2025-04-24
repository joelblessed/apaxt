import React, { useState } from "react";

const ProfileImageUploader = ({ api }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select an image file first.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await fetch(`${api}/profile/update-image/${userId} `, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile image updated successfully.");
        console.log(data);
      } else {
        setMessage(data.message || "Failed to update profile image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h3>Update Profile Image</h3>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" style={{ width: 150, marginTop: 10 }} />}
        <br />
        <button type="submit" style={{ marginTop: 10 }}>Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfileImageUploader;