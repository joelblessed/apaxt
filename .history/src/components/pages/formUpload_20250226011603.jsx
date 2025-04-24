import React, { useState } from "react";

const FormUpload = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState([{  name: "", image: [] }]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [numberInStock, setNumberInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [owner, setOwner] = useState("hold");y
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("")
  const [likes, setLikes] = useState(0);
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  // Handle brand updates
  const handleBrandChange = (index, field, value) => {
    const updatedBrands = [...brand];
    updatedBrands[index][field] = value;
    setBrand(updatedBrands);
  };

  // Add a new brand
  const addBrand = () => {
    setBrand([...brand, { id: "", name: "", image: "" }]);
  };

  // Remove a brand
  const removeBrand = (index) => {
    const updatedBrands = brand.filter((_, i) => i !== index);
    setBrand(updatedBrands);
  };

  //   // Handle image uploads
  //   const handleImageUpload = (e) => {
  //     const files = Array.from(e.target.files);
  //     const imagePaths = files.map((file) => URL.createObjectURL(file));
  //     setImages([...images, ...imagePaths]);
  //   };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const imagePaths = [];

    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          images: "Only JPG, JPEG, and PNG formats allowed",
        }));
        return;
      }
      imagePaths.push(URL.createObjectURL(file));
    }

    setImages([...images, ...imagePaths]);
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  // Form Validation
  const validateForm = () => {
    let validationErrors = {};

    if (!name) validationErrors.name = "Product name is required";
    if (!category) validationErrors.category = "Category is required";
    if (!price || isNaN(price) || price <= 0)
      validationErrors.price = "Valid price is required";
    if (!numberInStock || isNaN(numberInStock) || numberInStock < 0)
      validationErrors.numberInStock = "Valid stock quantity is required";
    if (!phoneNumber || isNaN(phoneNumber) || phoneNumber.length < 5)
      validationErrors.phoneNumber = "Valid phone number is required";
    if (!status) validationErrors.status = "Status is required";
    if (!description) validationErrors.description = "Description is required";
    
    if (brand.some((b) => !b.name ))
      validationErrors.brand = "Brand details must be complete";
    if (images.length === 0)
      validationErrors.images = "At least one image is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Construct the product object
    const newProduct = {
      id: Math.floor(Math.random() * 1000), // Random ID for now
      name,
      brand,
      category,
      price: parseFloat(price),
      images,
      quantity: parseInt(quantity),
      numberInStock: parseInt(numberInStock),
      discount: parseFloat(discount),
      owner,
      phoneNumber,
      description,
      status,
      address,
      likes: parseInt(likes),
      location,
    };

    try {
      const response = await fetch('http://localhost:3002/uploads', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert("Product uploaded successfully!");
        // Reset form
        setName("");
        setBrand([{ id: "", name: "", image: "" }]);
        setCategory("");
        setPrice("");
        setImages([]);
        setQuantity(1);
        setNumberInStock(0);
        setDiscount(0);
        setOwner("");
        setPhoneNumber("");
        setDescription("");
        setStatus("");
        setAddress("");
        setLikes(0);
        setLocation("");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };
//   ////////////////////////////


// /////////////////////////

  return (
    <div style={{ display: "row", marginTop: "90px", width: "60%" }}>
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        {/* Brand Input */}
        {brand.map((b, index) => (
          <div key={index} style={{ display: "grid" }}>
            <input
              type="text"
              placeholder="Brand Name"
              value={b.name}
              onChange={(e) => handleBrandChange(index, "name", e.target.value)}
              required
            />
            {brand.length > 1 && (
              <button type="button" onClick={() => removeBrand(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        {errors.brand && <p style={{ color: "red" }}>{errors.brand}</p>}
        <button type="button" onClick={addBrand}>
          Add Another Brand
        </button>

        {/* Category Selection */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ display: "grid" }}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>
        {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}

        <div style={{ display: "grid" }}>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}

         
          <input
            type="number"
            placeholder="Number In Stock"
            value={numberInStock}
            onChange={(e) => setNumberInStock(e.target.value)}
            required
          />
          {errors.numberInStock && (
            <p style={{ color: "red" }}>{errors.numberInStock}</p>
          )}

          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
          {errors.discount && <p style={{ color: "red" }}>{errors.discount}</p>}

          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {errors.phoneNumber && (
            <p style={{ color: "red" }}>{errors.phoneNumber}</p>
          )}

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description}</p>
          )}
        </div>
        {/* Status Selection */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          style={{ display: "grid" }}
        >
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        {errors.status && <p style={{ color: "red" }}>{errors.status}</p>}

        <div style={{ display: "grid" }}>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}

          {/* Image Upload */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          {errors.images && <p style={{ color: "red" }}>{errors.images}</p>}
        </div>
        {/* Display Uploaded Images */}
        {images.length > 0 && (
          <div>
            <h3>Uploaded Images:</h3>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
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
