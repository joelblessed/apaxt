import React, { useState, useEffect } from "react";
import "./formUpload.css";

const FormUpload = ({ api }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState([{ id: Date.now(), name: "", image: "" }]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [numberInStock, setNumberInStock] = useState(0);
  const [owner, setOwner] = useState(localStorage.getItem("username"));
  const [ownerId, setOwnerId] = useState(localStorage.getItem("userId"));
  const [color, setColor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [weight, setWeight] = useState(0);
  const [address, setAddress] = useState("");
  const [likes, setLikes] = useState(0);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState([
    { id: Date.now(), location: "", latitude: "", longitude: "" },
  ]);
  const [postedOn, setPostedOn] = useState(
    new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );
  const [errors, setErrors] = useState({});

  // Check if user exists, create if not
  useEffect(() => {
    const checkOrCreateUser = async () => {
      if (!ownerId) {
        alert("You must be logged in to upload a product.");
        return;
      }

      try {
        const response = await fetch(`${api}/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: owner, userId: ownerId }),
        });

        if (!response.ok) {
          throw new Error("Failed to create user");
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    checkOrCreateUser();
  }, [api, owner, ownerId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const productData = {
      name,
      brand,
      category,
      price,
      quantity,
      numberInStock,
      owner,
      weight,
      ownerId,
      color,
      phoneNumber,
      description,
      status,
      address,
      likes,
      city,
      location,
      postedOn,
      images: images.map((file) => URL.createObjectURL(file)), // Save image URLs
    };

    try {
      const response = await fetch(`${api}/api/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product uploaded successfully!");
        resetForm();
      } else {
        alert("Failed to upload product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setName("");
    setBrand([{ id: Date.now(), name: "", image: "" }]);
    setCategory("");
    setPrice("");
    setImages([]);
    setQuantity(1);
    setNumberInStock(0);
    setWeight(0);
    setPhoneNumber("");
    setDescription("");
    setStatus("");
    setAddress("");
    setLikes(0);
    setCity("");
    setColor("");
    setLocation([
      { id: Date.now(), location: "", latitude: "", longitude: "" },
    ]);
    setPostedOn(
      new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  };

  // Form validation (unchanged)
  const validateForm = () => {
    let validationErrors = {};
    // Add validation logic here
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle image upload (unchanged)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="form-container">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields (unchanged) */}
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default FormUpload;