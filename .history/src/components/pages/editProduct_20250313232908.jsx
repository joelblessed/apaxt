import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./formUpload.css";
import { color } from "framer-motion";

const EditProduct = ({ api }) => {
  // const { id } = useParams();
  const id = 355
  const [product, setProduct] = useState({
    name: "",
    brand: [{ id: Date.now(), name: "", image: "" }],
    category: "",
    price: 0,
    quantity: 0,
    numberInStock: 0,
    discount: 0,
    owner: "",
    phoneNumber: "",
    description: "",
    status: "",
    address: "",
    likes: 0,
    city: "",
    color:"",
    
    location: [{ id: Date.now(), name: "", latitude: 0, longitude: 0 }],
    postedOn: new Date().toISOString(),
    images: []
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${api}/products/${id}`);
        const data = await response.json();
        setProduct((prev) => ({
          ...prev,
          ...data,
          images: data.images || []
        }));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [api, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrandChange = (index, field, value) => {
    const updatedBrands = [...product.brand];
    updatedBrands[index][field] = value;
    setProduct((prev) => ({ ...prev, brand: updatedBrands }));
  };

  const addBrand = () => {
    setProduct((prev) => ({
      ...prev,
      brand: [...prev.brand, { id: Date.now(), name: "", image: "" }],
    }));
  };

  const removeBrand = (index) => {
    const updatedBrands = product.brand.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, brand: updatedBrands }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          images: "Only JPG, JPEG, and PNG formats allowed",
        }));
        return;
      }
    }

    setProduct((prev) => ({ ...prev, images: files }));
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!product.name) validationErrors.name = "Product name is required";
    if (!product.category) validationErrors.category = "Category is required";
    if (!product.price || isNaN(product.price) || product.price <= 0)
      validationErrors.price = "Valid price is required";
    if (!product.numberInStock || isNaN(product.numberInStock) || product.numberInStock < 0)
      validationErrors.numberInStock = "Valid stock quantity is required";
    if (!product.phoneNumber || isNaN(product.phoneNumber) || product.phoneNumber.length < 5)
      validationErrors.phoneNumber = "Valid phone number is required";
    if (!product.status) validationErrors.status = "Status is required";
    if (!product.description) validationErrors.description = "Description is required";
    if (product.brand.some((b) => !b.name))
      validationErrors.brand = "Brand details must be complete";
    if (product.images.length === 0)
      validationErrors.images = "At least one image is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    product.images.forEach((file, index) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch(`${api}/updateProduct/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        {/* Brand Input */}
        {product.brand && product.brand.map((b, index) => (
          <div key={index} className="brand-input">
            <input
              type="text"
              placeholder="Brand Name"
              value={b.name}
              onChange={(e) => handleBrandChange(index, "name", e.target.value)}
              required
            />
            {product.brand.length > 1 && (
              <button type="button" onClick={() => removeBrand(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        {errors.brand && <p className="error">{errors.brand}</p>}
        <button type="button" onClick={addBrand} className="add-brand-button">
          Add Another Brand
        </button>

        {/* Category Selection */}
        <select
          name="category"
          value={product.category}
          onChange={handleInputChange}
          required
        >
          <option value={product.category}>{product.category}</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>
        {errors.category && <p className="error">{errors.category}</p>}

        {/* Price, Stock, Discount, Phone Number */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleInputChange}
          required
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <input
          type="number"
          name="numberInStock"
          placeholder="Number In Stock"
          value={product.numberInStock}
          onChange={handleInputChange}
          required
        />
        {errors.numberInStock && (
          <p className="error">{errors.numberInStock}</p>
        )}

        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={product.discount}
          onChange={handleInputChange}
          required
        />
        {errors.discount && <p className="error">{errors.discount}</p>}

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={product.phoneNumber}
          onChange={handleInputChange}
          required
        />
        {errors.phoneNumber && (
          <p className="error">{errors.phoneNumber}</p>
        )}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleInputChange}
          required
        ></textarea>
        {errors.description && (
          <p className="error">{errors.description}</p>
        )}

        {/* Status Selection */}
        <select
          name="status"
          value={product.status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        {errors.status && <p className="error">{errors.status}</p>}

        {/* Address and Location and country */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={product.address}
          onChange={handleInputChange}
          required
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <input
          type="text"
          name="city"
          placeholder="City"
          value={product.city}
          onChange={handleInputChange}
          required
        />
        {errors.city && <p className="error">{errors.city}</p>}

        {/* Image Upload */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
        {errors.images && <p className="error">{errors.images}</p>}

        {/* Display Uploaded Images */}
        {product.images.length > 0 && (
          <div className="uploaded-images">
            <h3>Uploaded Images:</h3>
            {product.images.map((file, index) => (
              <img
                key={index}
                src={file instanceof File ? URL.createObjectURL(file) : file}
                alt={`Uploaded ${index}`}
                width="100"
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button className="button" type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;