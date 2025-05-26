import React, { useState, useEffect, useContext } from "react";
import "./formUpload.css";
import { AuthContext } from "../../AuthContext";

const FormUpload = ({ api }) => {
  const { user } = useContext(AuthContext);
  const userName = user?.username;
  const userId = localStorage.getItem("userId");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    brand: [{ id: Date.now(), name: "", image: "" }],
    category: "",
    subcategory: "",
    price: 0,
    quantity: 1,
    numberInStock: 0,
    discount: 0,
    weight: 0,
    unit_of_weight: "",
    color: "",
    phoneNumber: "",
    description: "",
    status: "",
    address: "",
    city: "",
    owner: userName,
    ownerId: userId,
    size: 0,
    unit_of_size: "",
    likes: 10,
    location: [{ id: Date.now(), location: "", latitude: "", longitude: "" }],
  });
  console.log("username", userName);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [success, setSuccess] = useState(false);

  const category = [
    {
      id: 1,
      name: "Electronics",
      subcategories: [
        { id: 1, name: "phone" },
        { id: 2, name: "TV" },
        { id: 26, name: "Smart TVs" },
        { id: 3, name: "gadget" },
        { id: 4, name: "Kitchen Appliances" },
        { id: 20, name: "tools" },
        { id: 5, name: "Accessories" },
        { id: 6, name: "Cameras" },
        { id: 7, name: "Audio" },
        { id: 8, name: "Wearables" },
        { id: 9, name: "Gaming" },
        { id: 10, name: "Smart Home" },
        { id: 11, name: "Computer" },
        { id: 12, name: "Networking" },
        { id: 13, name: "Printer" },
        { id: 14, name: "Drones" },
        { id: 15, name: "Health Tech" },
        { id: 16, name: "Virtual Reality" },
        { id: 17, name: "Smartwatches" },
        { id: 18, name: "Accessories" },
        { id: 19, name: "Home Appliances" },
        { id: 21, name: "Office Equipment" },
        { id: 22, name: "Security Systems" },
        { id: 23, name: "Car Electronics" },
        { id: 24, name: "Portable Devices" },
        { id: 25, name: "Gaming Consoles" },
        { id: 27, name: "Streaming Devices" },
        { id: 28, name: "E-readers" },
        { id: 29, name: "Speakers" },
        { id: 30, name: "Cameras" },
        { id: 31, name: "Home Theater Systems" },
        { id: 32, name: "Projectors" },
        { id: 33, name: "Smart Home Hubs" },
        { id: 34, name: "Robotics" },
        { id: 35, name: "3D Printers" },
      ],
    },
    {
      id: 2,
      name: "Fashion",
      subcategories: [
        { id: 1, name: "Men" },
        { id: 2, name: "Women" },
        { id: 3, name: "Children" },
        { id: 4, name: "Accessories" },
        { id: 5, name: "Footwear" },
        { id: 6, name: "Jewelry" },
        { id: 7, name: "Bags" },
        { id: 8, name: "Watches" },
        { id: 9, name: "Sunglasses" },
        { id: 10, name: "Hats" },
        { id: 11, name: "Scarves" },
        { id: 12, name: "Belts" },
        { id: 13, name: "Socks" },
        { id: 14, name: "Gloves" },
        { id: 15, name: "Lingerie" },
        { id: 16, name: "T-shirt" },
        { id: 17, name: "Activewear" },
        { id: 18, name: "Formal Wear" },
        { id: 19, name: "Casual Wear" },
        { id: 20, name: "Outerwear" },
      ],
    },
    {
      id: 3,
      name: "Home & Garden",
      subcategories: [
        { id: 1, name: "Furniture" },
        { id: 2, name: "Kitchenware" },
        { id: 3, name: "Gardening" },
        { id: 4, name: "Decor" },
        { id: 5, name: "Bedding" },
        { id: 6, name: "Lighting" },
        { id: 7, name: "Tools" },
        { id: 8, name: "Outdoor" },
        { id: 9, name: "Storage" },
        { id: 10, name: "Appliances" },
      ],
    },
    {id: 4,
      name: "Farm",
      subcategories: [
        { id: 1, name: "Agricultural Equipment" },
        { id: 2, name: "Livestock" },
        { id: 3, name: "Seeds & Plants" },
        { id: 4, name: "Fertilizers" },
        { id: 5, name: "Irrigation Systems" },
        { id: 6, name: "Farm Tools" },
        { id: 7, name: "Pesticides" },
        { id: 8, name: "herbicides" },
        { id: 9, name: "egusi",subsubcategories: [
          { id: 1, name: "cracked" },
          { id: 2, name: "uncracked" },
       
        ] },
      

    
   ] },
   {id: 5,
      name: "School",
      subcategories: [
        { id: 1, name: "Books" },
        { id: 2, name: "Stationery" },
        { id: 3, name: "Backpacks" },
        { id: 4, name: "Electronics" },
        { id: 5, name: "Art Supplies" },
        { id: 6, name: "Sports Equipment" },
      ]},
    {
      id: 6,
      name: "Sports & Outdoors",
      subcategories: [
        { id: 1, name: "Fitness Equipment" },
        { id: 2, name: "Outdoor Gear" },
        { id: 3, name: "Sports Apparel" },
        { id: 4, name: "Cycling" },
        { id: 5, name: "Camping" },
        { id: 6, name: "Fishing" },
        { id: 7, name: "Hiking" },
        { id: 8, name: "Running" },
        { id: 9, name: "Water Sports" },
      ],
    }
  ];

  // Initialize form with user data from localStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    setFormData((prev) => ({
      ...prev,
      owner: username,
      ownerId: userId,
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
    setFormData((prev) => {
      const updatedBrands = [...prev.brand];
      updatedBrands[index][field] = value;
      return { ...prev, brand: updatedBrands };
    });
  };

  // Add/remove brands
  const addBrand = () => {
    setFormData((prev) => ({
      ...prev,
      brand: [...prev.brand, { id: Date.now(), name: "", image: "" }],
    }));
  };

  const removeBrand = (index) => {
    setFormData((prev) => ({
      ...prev,
      brand: prev.brand.filter((_, i) => i !== index),
    }));
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form Validation
  const validateForm = () => {
    const validationErrors = {};
    const {
      name,
      brand,
      category,
      price,
      numberInStock,
      phoneNumber,
      description,
      status,
      address,
      city,
      weight,
      color,
      size,
      unit_of_size,
      unit_of_weight,
    } = formData;

    if (!name) validationErrors.name = "Product name is required";
    if (!weight || weight <= 0)
      validationErrors.weight = "Valid weight is required";
    if (!size || size <= 0) validationErrors.size = "Valid size is required";
    if (!color) validationErrors.color = "Product color is required";
    if (!category) validationErrors.category = "Category is required";
    if (!price || isNaN(price) || price <= 0)
      validationErrors.price = "Valid price is required";
    if (!numberInStock || isNaN(numberInStock) || numberInStock < 0) {
      validationErrors.numberInStock = "Valid stock quantity is required";
    }
    if (!phoneNumber || isNaN(phoneNumber) || phoneNumber.length < 8) {
      validationErrors.phoneNumber = "Valid phone number is required";
    }
    if (!status) validationErrors.status = "Status is required";
    if (!description) validationErrors.description = "Description is required";
    if (brand.some((b) => !b.name))
      validationErrors.brand = "Brand details must be complete";
    if (images.length === 0)
      validationErrors.images = "At least one image is required";
    if (!address) validationErrors.address = "Address is required";
    if (!city) validationErrors.city = "City is required";
    if (!unit_of_size)
      validationErrors.unit_of_size = "put a unit of measurement";
    if (!unit_of_weight)
      validationErrors.unit_of_weight = "put a unit of measurement";

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
      if (key === "brand" || key === "location") {
        // Ensure proper JSON formatting
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value);
      }
    });

    // Append images
    images.forEach((file) => {
      formDataToSend.append("images", file);
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
        subcategory: "",
        unit_of_size: "",
        unit_of_weight: "",
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
        location: [
          { id: Date.now(), location: "", latitude: "", longitude: "" },
        ],
        owner: localStorage.getItem("username") || "",
        ownerId: localStorage.getItem("userId") || "",
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
        <div className="success-message">Product uploaded successfully!</div>
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
                onChange={(e) =>
                  handleBrandChange(index, "name", e.target.value)
                }
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
          <button type="button" onClick={addBrand} className="add-brand-btn">
            + Add Brand
          </button>
          {errors.brand && <span className="error">{errors.brand}</span>}
        </div>

        {/* Category Dropdown */}

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Subcategory Dropdown */}
          {formData.category && (
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
            >
              <option value="">Select Subcategory</option>
              {category
                .find((cat) => cat.name === formData.category)
                ?.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
            </select>
          )}
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
          {errors.numberInStock && (
            <span className="error">{errors.numberInStock}</span>
          )}
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
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
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

        {/* size */}
        <div className="form-group">
          <label>Size*</label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="cm"
            step="0.1"
            min="0"
          />
          {errors.size && <span className="error">{errors.size}</span>}
        </div>

        {/* size */}
        <div className="form-group">
          <label>unit of Measurement *</label>
          <input
            type="text"
            name="unit_of_size"
            value={formData.unit_of_size}
            onChange={handleChange}
            placeholder="Product size"
            step="0.1"
            min="0"
          />
          {errors.unit_of_size && (
            <span className="error">{errors.unit_of_size}</span>
          )}
        </div>

        {/* Weight */}
        <div className="form-group">
          <label>Weight *</label>
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

        {/* Weight */}
        <div className="form-group">
          <label> unit of measurement *</label>
          <input
            type="text"
            name="unit_of_weight"
            value={formData.unit_of_weight}
            onChange={handleChange}
            placeholder="kg "
            step="0.1"
            min="0"
          />
          {errors.unit_of_weight && (
            <span className="error">{errors.unit_of_weight}</span>
          )}
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
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status *</label>
          <select name="status" value={formData.status} onChange={handleChange}>
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
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
};

export default FormUpload;
