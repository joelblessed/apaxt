import React, { useState, useEffect } from "react";
import "./formUpload.css";

const FormUpload = ({ api }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    brand: [{ id: Date.now(), name: "", image: "" }],
    category: "cat",
    price: 0,
    quantity: 1,
    numberInStock: 0,
    weight: 0,
    color: "",
    phoneNumber: "",
    description: "",
    status: "",
    address: "",
    city: "",
    size: "sm",
    wallet:97,
    likes: 10,
    location: [{ id: Date.now(), location: "", latitude: "", longitude: "" }]
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(["cat","shoes","clothes"]);
  const [success, setSuccess] = useState(false);

  // Initialize form with user data from localStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    
    setFormData(prev => ({
      ...prev,
      owner: username || "kfffffffffff",
      ownerId: userId || "3"
    }));

    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [api]);

  // Handle brand updates
  const handleBrandChange = (index, field, value) => {
    setFormData(prev => {
      const updatedBrands = [...prev.brand];
      updatedBrands[index][field] = value;
      return { ...prev, brand: updatedBrands };
    });
  };

  // Add/remove brands
  const addBrand = () => {
    setFormData(prev => ({
      ...prev,
      brand: [...prev.brand, { id: Date.now(), name: "", image: "" }]
    }));
  };

  const removeBrand = (index) => {
    setFormData(prev => ({
      ...prev,
      brand: prev.brand.filter((_, i) => i !== index)
    }));
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const invalidFiles = files.some(file => !allowedTypes.includes(file.type));

    if (invalidFiles) {
      setErrors(prev => ({
        ...prev,
        images: "Only JPG, JPEG, and PNG formats allowed"
      }));
      return;
    }

    setImages(files);
    setErrors(prev => ({ ...prev, images: "" }));
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form Validation
  const validateForm = () => {
    const validationErrors = {};
    const { 
      name, brand, category, price, numberInStock, 
      phoneNumber, description, status, address, city,
      weight, color
    } = formData;

    if (!name) validationErrors.name = "Product name is required";
    if (!weight || weight <= 0) validationErrors.weight = "Valid weight is required";
    if (!color) validationErrors.color = "Product color is required";
    if (!category) validationErrors.category = "Category is required";
    if (!price || isNaN(price) || price <= 0) validationErrors.price = "Valid price is required";
    if (!numberInStock || isNaN(numberInStock) || numberInStock < 0) {
      validationErrors.numberInStock = "Valid stock quantity is required";
    }
    if (!phoneNumber || isNaN(phoneNumber) || phoneNumber.length < 8) {
      validationErrors.phoneNumber = "Valid phone number is required";
    }
    if (!status) validationErrors.status = "Status is required";
    if (!description) validationErrors.description = "Description is required";
    if (brand.some(b => !b.name)) validationErrors.brand = "Brand details must be complete";
    if (images.length === 0) validationErrors.images = "At least one image is required";
    if (!address) validationErrors.address = "Address is required";
    if (!city) validationErrors.city = "City is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const formDataToSend = new FormData();
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'brand' || key === 'location') {
        // Ensure proper JSON formatting
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value);
      }
    });

    // Append images
    images.forEach(file => {
      formDataToSend.append('images', file);
    });

    try {
      const response = await fetch(`${api}/upload`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      setSuccess(true);
      
      // Reset form on success
      setFormData({
        name: "",
        brand: [{ id: Date.now(), name: "", image: "" }],
        category: "",
        price: "",
        quantity: 1,
        numberInStock: 0,
        weight: 0,
        color: "",
        phoneNumber: "",
        description: "",
        status: "",
        address: "",
        city: "",
        likes: 0,
        location: [{ id: Date.now(), location: "", latitude: "", longitude: "" }],
        owner: localStorage.getItem("username") || "",
        ownerId: localStorage.getItem("userId") || ""
      });
      setImages([]);

    } catch (error) {
      console.error("Error uploading product:", error);
      alert(`Failed to upload product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="form-container">
      <h2>Upload Product</h2>
      {success && (
        <div className="success-message">
          Product uploaded successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Brand Input */}
        <div className="form-group">
          <label>Product Brand *</label>
          {formData.brand.map((b, index) => (
            <div key={b.id} className="brand-input-group">
              <input
                type="text"
                value={b.name}
                onChange={(e) => handleBrandChange(index, "name", e.target.value)}
                placeholder="Brand name"
              />
              {formData.brand.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeBrand(index)}
                  className="remove-brand-btn"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            onClick={addBrand}
            className="add-brand-btn"
          >
            + Add Brand
          </button>
          {errors.brand && <span className="error">{errors.brand}</span>}
        </div>

        {/* Category Selection */}
        <div className="form-group">
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        {/* Stock Quantity */}
        <div className="form-group">
          <label>Number in Stock *</label>
          <input
            type="number"
            name="numberInStock"
            value={formData.numberInStock}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
          {errors.numberInStock && <span className="error">{errors.numberInStock}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="e.g., 677331862"
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        {/* Color */}
        <div className="form-group">
          <label>Color *</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Product color"
          />
          {errors.color && <span className="error">{errors.color}</span>}
        </div>

        {/* Weight */}
        <div className="form-group">
          <label>Weight (kg) *</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Product weight in kg"
            step="0.1"
            min="0"
          />
          {errors.weight && <span className="error">{errors.weight}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed product description"
            rows="4"
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Refurbished">Refurbished</option>
          </select>
          {errors.status && <span className="error">{errors.status}</span>}
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street address"
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        {/* City */}
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Product Images *</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            // className="file-input"
          />
          {errors.images && <span className="error">{errors.images}</span>}
          
          {/* Preview uploaded images */}
          {images.length > 0 && (
            <div className="image-previews">
              {images.map((file, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button 
          style={{ width: "100px" }} 
          type="submit" 
          disabled={loading} 
          className="submit-btn"
        >
          {loading ? 'Uploading...' : 'Upload Product'}
        </button>
      </form>
    </div>
  );
};

export default FormUpload;