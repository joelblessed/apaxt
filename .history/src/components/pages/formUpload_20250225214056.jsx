import React, { useState } from "react";
import "./ProductUploadForm.css"; // Import the CSS file

const ProductUploadForm = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState([{ id: "", name: "", image: "" }]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [numberInStock, setNumberInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [owner, setOwner] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
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

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const imagePaths = [];

    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, images: "Only JPG, JPEG, and PNG formats allowed" }));
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
    if (!price || isNaN(price) || price <= 0) validationErrors.price = "Valid price is required";
    if (!quantity || isNaN(quantity) || quantity <= 0) validationErrors.quantity = "Valid quantity is required";
    if (!numberInStock || isNaN(numberInStock) || numberInStock < 0) validationErrors.numberInStock = "Valid stock quantity is required";
    if (!phoneNumber || isNaN(phoneNumber) || phoneNumber.length < 5) validationErrors.phoneNumber = "Valid phone number is required";
    if (!status) validationErrors.status = "Status is required";
    if (!description) validationErrors.description = "Description is required";
    if (!owner) validationErrors.owner = "Owner name is required";
    if (brand.some((b) => !b.id || !b.name || !b.image)) validationErrors.brand = "Brand details must be complete";
    if (images.length === 0) validationErrors.images = "At least one image is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Construct the product object
    const newProduct = {
      id: Math.floor(Math.random() * 1000),
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
      location
    };

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert("Product uploaded successfully!");
        setName(""); setBrand([{ id: "", name: "", image: "" }]); setCategory("");
        setPrice(""); setImages([]); setQuantity(1); setNumberInStock(0);
        setDiscount(0); setOwner(""); setPhoneNumber(""); setDescription("");
        setStatus(""); setAddress(""); setLikes(0); setLocation("");
        setErrors({});
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Brand:</label>
        {brand.map((b, index) => (
          <div key={index} className="brand-container">
            <input type="number" placeholder="Brand ID" value={b.id} onChange={(e) => handleBrandChange(index, "id", e.target.value)} />
            <input type="text" placeholder="Brand Name" value={b.name} onChange={(e) => handleBrandChange(index, "name", e.target.value)} />
            <input type="text" placeholder="Brand Image URL" value={b.image} onChange={(e) => handleBrandChange(index, "image", e.target.value)} />
            {brand.length > 1 && <button type="button" onClick={() => removeBrand(index)}>Remove</button>}
          </div>
        ))}
        <button type="button" onClick={addBrand}>Add Another Brand</button>

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>

        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Upload Images:</label>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        {images.length > 0 && images.map((img, index) => <img key={index} src={img} alt={Preview ${index}} className="preview-image" />)}

        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default ProductUploadForm