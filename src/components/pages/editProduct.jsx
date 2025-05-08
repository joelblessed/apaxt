import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { color } from "framer-motion";

const EditProduct = ({ api }) => {
  const { id } = useParams();

  // Individual states for each product property
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button loading
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [numberInStock, setNumberInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState(0);
  const [location, setLocation] = useState([]);
  const [postedOn, setPostedOn] = useState(new Date().toISOString());
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]); // New state for selected images
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${api}/products/${id}`);
        const data = await response.json();
        setName(data.name || "");
        setCategory(data.category || "");
        setPrice(data.price || 0);
        setQuantity(data.quantity || 0);
        setNumberInStock(data.number_in_stock || 0);
        setDiscount(data.discount || 0);
        setDescription(data.description || "");
        setStatus(data.status || "");
        setAddress(data.address || "");
        setCity(data.city || "");
        setColor(data.color || "");
        setWeight(data.weight || 0);
        setLocation(data.location || []);
        setPostedOn(data.posted_on || new Date().toISOString());
        setImages(data.images || []);
        setSelectedImages(data.images || []); // Count fetched images as selected
        setProduct(data || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProduct();
  }, [api, id]);

  if (loading) {
    return <div className="loading">Loading product details...</div>; // Display loading message
  }

  const validateForm = () => {
    let validationErrors = {};

    if (!name) validationErrors.name = "Product name is required";
    if (!category) validationErrors.category = "Category is required";
    if (!price || isNaN(price) || price <= 0)
      validationErrors.price = "Valid price is required";
    if (!numberInStock || isNaN(numberInStock) || numberInStock <= 0)
      validationErrors.numberInStock = "Valid stock quantity is required";
    if (!status) validationErrors.status = "Status is required";
    if (!description) validationErrors.description = "Description is required";
    if (!color) validationErrors.color = "Product color is required";
    if (!weight || isNaN(weight) || weight <= 0)
      validationErrors.weight = "Weight is required";

    // Check if selectedImages or images have at least one entry
    if (selectedImages.length === 0 && images.length === 0) {
      validationErrors.images = "At least one image is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true); // Set submitting state to true
    const formData = new FormData();
    const product = {
      name,
      category,
      price,
      quantity,
      number_in_stock: numberInStock,
      discount,
      description,
      status,
      address,
      city,
      color,
      weight,
      location,
      posted_on: postedOn,
    };
    formData.append("product", JSON.stringify(product));

    // Ensure at least one valid image is included
    if (selectedImages.length > 0) {
      selectedImages.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    } else if (images.length > 0) {
      images.forEach((image) => {
        formData.append("existingImages", image); // Use existing images
      });
    } else {
      alert("At least one image is required.");
      return;
    }

    try {
      const response = await fetch(`${api}/uploadProduct/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Product updated successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to update product: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.", error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        {/* Category */}
        <label>Category</label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value={category}>{category}</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>
        {errors.category && <p className="error">{errors.category}</p>}

        {/* Price */}
        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {errors.price && <p className="error">{errors.price}</p>}

        {/* Number In Stock */}
        <label>Number In Stock</label>
        <input
          type="number"
          name="number_in_stock"
          placeholder="Number In Stock"
          value={numberInStock}
          onChange={(e) => setNumberInStock(e.target.value)}
          required
        />
        {errors.numberInStock && <p className="error">{errors.numberInStock}</p>}

        {/* Discount */}
        <label>Discount</label>
        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
        {errors.discount && <p className="error">{errors.discount}</p>}

        {/* Product Color */}
        <label>Product Color</label>
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
        {errors.color && <p className="error">{errors.color}</p>}

        {/* Product Weight */}
        <label>Product Weight</label>
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        {errors.weight && <p className="error">{errors.weight}</p>}

        {/* Description */}
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        {errors.description && <p className="error">{errors.description}</p>}

        {/* Status */}
        <label>Product Condition</label>
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value={status}>Select Status</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        {errors.status && <p className="error">{errors.status}</p>}

        {/* Address */}
        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {errors.address && <p className="error">{errors.address}</p>}

        {/* City */}
        <label>City</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        {errors.city && <p className="error">{errors.city}</p>}

        {/* Image Upload */}
        <label>Product Images (2 and above)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setSelectedImages(Array.from(e.target.files))} // Directly set selected images
        />
        {errors.images && <p className="error">{errors.images}</p>}

        {/* Display Uploaded Images */}
        {selectedImages.length > 0 ? (
          <div className="uploaded-images">
            <h3>Selected Images:</h3>
            {selectedImages.map((file, index) => (
              <img
                key={index}
                src={file instanceof File ? URL.createObjectURL(file) : file} // Ensure only File objects are passed
                alt={`Selected ${index}`}
                width="100"
              />
            ))}
          </div>
        ) : (
          images.length > 0 && (
            <div className="uploaded-images">
              <h3>Existing Images:</h3>
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Existing ${index}`} width="100" />
              ))}
            </div>
          )
        )}

        {/* Submit Button */}
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Product"}
        </button>
      </form>
      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .loading {
          text-align: center;
          font-size: 18px;
          color: #555;
          margin-top: 50px;
        }
        h2 {
          text-align: center;
          color: #333;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }
        input,
        select,
        textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: -10px;
          margin-bottom: 10px;
        }
        .uploaded-images {
          margin-top: 20px;
        }
        .uploaded-images img {
          margin: 5px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .button {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }
        .button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .button:hover:not(:disabled) {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default EditProduct;