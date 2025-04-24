import React, { useState } from "react";

const ProfileImageUploader = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return setMessage("Please select an image.");

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await fetch(`$/profile/update/${userId}, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || "Profile updated.");
    } catch (err) {
      console.error(err);
      setMessage("Error uploading image.");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Upload Profile Image</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ProfileImageUploader;