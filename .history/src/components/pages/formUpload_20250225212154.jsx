import React, { useState } from "react";

const FormUpload = () => {
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
    const imagePaths = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imagePaths]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div style={{display:"row", marginTop:"90px", width}}>
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />

        {/* Brand Input */}
        {brand.map((b, index) => (
          <div key={index} style={{display:"grid"}} >
            <input type="number" placeholder="Brand ID" value={b.id} onChange={(e) => handleBrandChange(index, "id", e.target.value)} required />
            <input type="text" placeholder="Brand Name" value={b.name} onChange={(e) => handleBrandChange(index, "name", e.target.value)} required />
            <input type="text" placeholder="Brand Image URL" value={b.image} onChange={(e) => handleBrandChange(index, "image", e.target.value)} required />
            {brand.length > 1 && <button type="button" onClick={() => removeBrand(index)}>Remove</button>}
          </div>
        ))}
        <button type="button" onClick={addBrand}>Add Another Brand</button>

        {/* Category Selection */}
        <select value={category} onChange={(e) => setCategory(e.target.value)} required  style={{display:"grid"}}>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>
       
       <div  style={{display:"grid"}}>
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <input type="number" placeholder="Number In Stock" value={numberInStock} onChange={(e) => setNumberInStock(e.target.value)} required />
        <input type="number" placeholder="Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} required />

        <input type="text" placeholder="Owner Name" value={owner} onChange={(e) => setOwner(e.target.value)} required />
        <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        {/* Status Selection */}
        <select value={status} onChange={(e) => setStatus(e.target.value)} required  style={{display:"grid"}}>
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
       <div  style={{display:"grid"}}>
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="number" placeholder="Likes" value={likes} onChange={(e) => setLikes(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />

        {/* Image Upload */}
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        </div>
        {/* Display Uploaded Images */}
        {images.length > 0 && (
          <div>
            <h3>Uploaded Images:</h3>
            {images.map((img, index) => (
              <img key={index} src={img} alt={`Uploaded ${index}`} width="100" />
            ))}
          </div>
        )}

        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default FormUpload