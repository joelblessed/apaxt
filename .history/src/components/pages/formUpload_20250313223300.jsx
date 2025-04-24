import React, { useState } from "react";
import "./formUpload.css"
const FormUpload = ({api}) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState([{ id:Date.now(), name: "", image: "" }]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [numberInStock, setNumberInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [owner, setOwner] = useState(localStorage.getItem("USE"));
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [likes, setLikes] = useState(0);
  const [city,setCity] = useState("")
  const [location, setLocation] = useState([{ id:Date.now(),location:"", latitude:"", longitude:""}]);
  const [postedOn, setPostedOn ]= useState( new Date().toLocaleString('en-US',{year:"numeric", month:"2-digit",day:"2-digit",hour:"2-digit", minute:"2-digit",second:"2-digit"}))
  const [errors, setErrors] = useState({});

  // Handle brand updates
  const handleBrandChange = (index, field, value) => {
    const updatedBrands = [...brand];
    updatedBrands[index][field] = value;
    setBrand(updatedBrands);
  };

  // Add a new brand
  const addBrand = () => {
    setBrand([...brand, { name: "", image: "" }]);
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
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          images: "Only JPG, jpg, JPEG, and PNG formats allowed",
        }));
        return;
      }
    }

    setImages(files);
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
    if (brand.some((b) => !b.name))
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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand",JSON.stringify(brand))
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("numberInStock", numberInStock);
    formData.append("discount", discount);
    formData.append("owner", owner);
    formData.append("phoneNumber", phoneNumber);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("address", address);
    formData.append("likes", likes);
    formData.append("city",city);
    formData.append("location", JSON.stringify(location));
    formData.append("postedOn", postedOn)
  
      
    images.forEach((file, index) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`${api}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product uploaded successfully!");
        // Reset form
        setName("");
        setBrand([{id:Date.now(), name: "", image: "" }]);
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
        setCity("")
        setLocation([{id:Date.now(), name:locationName, latitude, longitude}]);
        setPostedOn(new Date().toLocaleString('en-US',{year:"numeric", month:"2-digit",day:"2-digit",hour:"2-digit", minute:"2-digit",second:"2-digit"}))
      } else {
        alert("Failed to upload product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        {/* Brand Input */}
        {brand.map((b, index) => (
          <div key={index} className="brand-input">
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
        {errors.brand && <p className="error">{errors.brand}</p>}
        <button type="button" onClick={addBrand} className="add-brand-button">
          Add Another Brand
        </button>

        {/* Category Selection */}
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

        {/* Price, Stock, Discount, Phone Number */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <input
          type="number"
          placeholder="Number In Stock"
          value={numberInStock}
          onChange={(e) => setNumberInStock(e.target.value)}
          required
        />
        {errors.numberInStock && (
          <p className="error">{errors.numberInStock}</p>
        )}

        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
        {errors.discount && <p className="error">{errors.discount}</p>}

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        {errors.phoneNumber && (
          <p className="error">{errors.phoneNumber}</p>
        )}

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        {errors.description && (
          <p className="error">{errors.description}</p>
        )}

        {/* Status Selection */}
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

        {/* Address and Location and country */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        {errors.location && <p className="error">{errors.location}</p>}

        

        {/* Image Upload */}
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

        {/* Submit Button */}
        <button className="button" type="submit">Upload Product</button>
      </form>
    </div>
  );
};
export default FormUpload;