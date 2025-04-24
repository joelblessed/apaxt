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
       
        {/* Product Name */}
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        {/* Brand Input */}
        <label>Product Brand</label>
        {brand.map((b, index) => (
          <div key={index} className="brand-input">
            <input
              type="text"
              placeholder="Brand Name"
              value={b.name}
              onChange={(e) => handleBrandChange(index, "name", e.target.value)}
              required
            />
          </div>
        ))}
        {errors.brand && <p className="error">{errors.brand}</p>}

        {/* Category Selection */}
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>
        {errors.category && <p className="error">{errors.category}</p>}

        {/* Price, Stock, Phone Number */}
        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <label>Number in stock</label>
        <input
          type="number"
          placeholder="Number in Stock"
          value={numberInStock}
          onChange={(e) => setNumberInStock(e.target.value)}
          required
        />
        {errors.numberInStock && (
          <p className="error">{errors.numberInStock}</p>
        )}

        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="670000001"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        {/* Color and Weight */}
        <label>Color</label>
        <input
          type="text"
          placeholder="Product Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
        {errors.color && <p className="error">{errors.color}</p>}

        <label>Weight</label>
        <input
          type="number"
          placeholder="Product Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        {errors.weight && <p className="error">{errors.weight}</p>}

        {/* Description */}
        <label>Product Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        {errors.description && <p className="error">{errors.description}</p>}

        {/* Status Selection */}
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        {errors.status && <p className="error">{errors.status}</p>}

        {/* Address and City */}
        <label>Address</label>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <label>City</label>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        {errors.city && <p className="error">{errors.city}</p>}

        {/* Image Upload */}
        <label>Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
        {errors.images && <p className="error">{errors.images}</p>}

        {/* Display Uploaded Images */}
        {images.length > 0 && (
          <div className="uploaded-images">
            <h3>Uploaded Images:</h3>
            {images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Uploaded ${index}`}
                width="100"
              />
            ))}
          </div>
        )}
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default FormUpload;