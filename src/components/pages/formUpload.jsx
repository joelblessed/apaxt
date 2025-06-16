import React, { useState, useEffect, useContext } from "react";
import "./formUpload.css";
import { AuthContext } from "../../AuthContext";
import {Categories} from "../support/usefulArrays"

const FormUpload = ({ api }) => {
  const { user } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token")

  // Form state
  const [formData, setFormData] = useState({
    name_en: "",
    name_fr: "",
    category: { main: "", sub: "" },
    price: 0,
    dimensions: {},
    attributes: {},
    number_in_stock: 0,
    discount: 0,
    description_en: "",
    description_fr: "",
    status: "",
    address: "",
    city: "",
    colors: [],
    thumbnail_index: 0,
    phone_number: "",
    brand: { name: "" },
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newColor, setNewColor] = useState("");
  const [attributes, setAttributes] = useState({});
  const [newAttributeKey, setNewAttributeKey] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [newDimKey, setNewDimKey] = useState("");
  const [newDimValue, setNewDimValue] = useState("");

  // Categories data
  const categories = Categories
  

  // Initialize form with user data
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      owner: user?.username,
      ownerId: userId,
    }));
  }, [user, userId]);

  // Handle color management
  const addColor = () => {
    if (newColor.trim() && !formData.colors.includes(newColor.trim())) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()],
      }));
      setNewColor("");
    }
  };

  const removeColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  // Handle attribute management
  const addAttribute = () => {
    if (newAttributeKey.trim() && newAttributeValue.trim()) {
      setAttributes((prev) => ({
        ...prev,
        [newAttributeKey.trim()]: newAttributeValue.trim(),
      }));
      setNewAttributeKey("");
      setNewAttributeValue("");
    }
  };

  const removeAttribute = (key) => {
    const newAttributes = { ...attributes };
    delete newAttributes[key];
    setAttributes(newAttributes);
  };

  // Handle Dimentions management
  const addDimentions = () => {
    if (newDimKey.trim() && newDimValue.trim()) {
      setDimensions((prev) => ({
        ...prev,
        [newDimKey.trim()]: newDimValue.trim(),
      }));
      setNewDimKey("");
      setNewDimValue("");
    }
  };

  const removeDimensions = (key) => {
    const newDimensions = { ...dimensions };
    delete newDimensions[key];
    setAttributes(newDimensions);
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const invalidFiles = files.some(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFiles) {
      setErrors((prev) => ({
        ...prev,
        images: "Only JPG, JPEG, and PNG formats allowed",
      }));
      return;
    }

    setImages(files);
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category changes
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      category: {
        ...prev.category,
        [name]: value,
      },
    }));
  };

  // Form Validation
  const validateForm = () => {
    const validationErrors = {};
    const { name_en, name_fr, category, price, number_in_stock } = formData;

    if (!name_en) validationErrors.name_en = "English name is required";
    if (!name_fr) validationErrors.name_fr = "French name is required";
    if (!category.main) validationErrors.category = "Main category is required";
    if (!category.sub) validationErrors.category = "Subcategory is required";
    if (!price || isNaN(price) || price <= 0)
      validationErrors.price = "Valid price is required";
    if (!number_in_stock || isNaN(number_in_stock) || number_in_stock < 0)
      validationErrors.number_in_stock = "Valid stock quantity is required";
    if (images.length < 2)
      validationErrors.images = "At least two images are required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const formDataToSend = new FormData();

    // Prepare the product data
    const productData = {
      ...formData,
      attributes,
      dimensions: formData.dimensions,
      colors: formData.colors,
      thumbnail_index: formData.thumbnail_index,
    };

    // Append all data
    formDataToSend.append("product", JSON.stringify(productData));


    // Append images
    images.forEach((file) => {
      formDataToSend.append("images", file);
    });


    try {
      const response = await fetch(`${api}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
    console.log("form", formDataToSend)


      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      setSuccess(true);
      // Reset form on success
      setFormData({
        name_en: "",
        name_fr: "",
        category: { main: "", sub: "" },
        price: 0,
        dimensions: {},
        attributes: {},
        number_in_stock: 0,
        discount: 0,
        description_en: "",
        description_fr: "",
        status: "",
        address: "",
        city: "",
        colors: [],
        thumbnail_index: 0,
        phone_number: "",
        brand: { name: "" },
      });
      setImages([]);
      setAttributes({});
    } catch (error) {
      console.error("Error uploading product:", error);
      alert(`Failed to upload product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Product</h2>
      {success && (
        <div className="success-message">Product uploaded successfully!</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* English Name */}
        <div className="form-group">
          <label>Product Name (English) *</label>
          <input
            type="text"
            name="name_en"
            value={formData.name_en}
            onChange={handleChange}
            placeholder="English product name"
          />
          {errors.name_en && <span className="error">{errors.name_en}</span>}
        </div>

        {/* French Name */}
        <div className="form-group">
          <label>Product Name (French) *</label>
          <input
            type="text"
            name="name_fr"
            value={formData.name_fr}
            onChange={handleChange}
            placeholder="French product name"
          />
          {errors.name_fr && <span className="error">{errors.name_fr}</span>}
        </div>

        {/* Brand */}
        <div className="form-group">
          <label>Brand *</label>
          <input
            type="text"
            name="brand.name"
            value={formData.brand.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                brand: { ...prev.brand, name: e.target.value },
              }))
            }
            placeholder="Brand name"
          />
        </div>

        {/* Category Selection */}
        <div className="form-group">
          <label>Category *</label>
          <select
            name="main"
            value={formData.category.main}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {formData.category.main && (
            <select
              name="sub"
              value={formData.category.sub}
              onChange={handleCategoryChange}
            >
              <option value="">Select Subcategory</option>
              {categories
                .find((c) => c.name === formData.category.main)
                ?.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
            </select>
          )}
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
            name="number_in_stock"
            value={formData.number_in_stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
          {errors.number_in_stock && (
            <span className="error">{errors.number_in_stock}</span>
          )}
        </div>

       

        {/* Color Management */}
        <div className="form-group">
          <label>Colors *</label>
          <div className="color-input">
            <input
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              placeholder="Add color"
              onKeyDown={(e) => e.key === "Enter" && addColor()}
            />
            <button type="button" onClick={addColor}>
              Add
            </button>
          </div>
          <div className="color-list">
            {formData.colors.map((color, index) => (
              <div key={index} className="color-item">
                <span>{color}</span>
                <button type="button" onClick={() => removeColor(index)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Attributes Management */}
        <div className="form-group">
          <label>Attributes</label>
          <div className="attribute-input">
            <input
              type="text"
              value={newAttributeKey}
              onChange={(e) => setNewAttributeKey(e.target.value)}
              placeholder="Attribute key"
            />
            <input
              type="text"
              value={newAttributeValue}
              onChange={(e) => setNewAttributeValue(e.target.value)}
              placeholder="Attribute value"
            />
            <button type="button" onClick={addAttribute}>
              Add
            </button>
          </div>
          <div className="attribute-list">
            {Object.entries(attributes).map(([key, value]) => (
              <div key={key} className="attribute-item">
                <span>
                  {key}: {value}
                </span>
                <button type="button" onClick={() => removeAttribute(key)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* {Dimensions} */}

        <div className="form-group">
          <label>Dimentions</label>
          <div className="dimensions-input">
            <input
              type="text"
              value={newDimKey}
              onChange={(e) => setNewDimKey(e.target.value)}
              placeholder="dimension key"
            />
            <input
              type="text"
              value={newDimValue}
              onChange={(e) => setNewDimValue(e.target.value)}
              placeholder="dimension value"
            />
            <button type="button" onClick={addDimentions}>
              Add
            </button>
          </div>
          <div className="dimensions-list">
            {Object.entries(dimensions).map(([key, value]) => (
              <div key={key} className="dimensions-item">
                <span>
                  {key}: {value}
                </span>
                <button type="button" onClick={() => removeDimensions(key)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <label>Product Condition</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option>Select Status</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        {errors.status && <p className="error">{errors.status}</p>}

        {/* description */}
        <div className="translation-block">
          <label>Description (EN)</label>
          <textarea
            value={formData.description_en}
            name="description_en"
            onChange={handleChange}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}

          <label>Description (FR)</label>
          <textarea value={formData.description_fr} onChange={handleChange} name="description_fr" />
          {errors.description_fr && (
            <p className="error">{errors.description_fr}</p>
          )}
        </div>

        {/* City */}
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="city"
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        {/* phone number */}
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone number"
          />
          {errors.phone_number && (
            <span className="error">{errors.phone_number}</span>
          )}
        </div>
        {/* thumbnail Index */}
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="number"
            name="thumbnail_index"
            value={formData.thumbnail_index}
            onChange={handleChange}
            placeholder="thumbnail index"
            disabled
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Product Images * (At least 2)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          {errors.images && <span className="error">{errors.images}</span>}
          <div className="image-previews">
            {images.map((file, index) => (
              <div key={index} className="image-preview">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, thumbnail_index: index }))
                  }
                  className={
                    formData.thumbnail_index === index ? "selected" : ""
                  }
                  style={{
                    cursor: "pointer",
                    border:
                      formData.thumbnail_index === index && "5px solid blue",
                    borderRadius: "4px",
                    background: "red",
                  }} // Add cursor pointer for existing images
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
};

export default FormUpload;
