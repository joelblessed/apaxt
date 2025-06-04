import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { color } from "framer-motion";

const EditProduct = ({ api }) => {
  const { id } = useParams();

  // Individual states for each product property
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button loading
  const [name_en, setName_en] = useState("");
  const [name_fr, setName_fr] = useState("");
  const [category, setCategory] = useState({ main: "", sud: "" });
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [numberInStock, setNumberInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description_en, setDescription_en] = useState("");
  const [description_fr, setDescription_fr] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [dimensions, setDimensions] = useState({ });
  const [weight, setWeight] = useState(0);
  const [postedOn, setPostedOn] = useState(new Date().toISOString());
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]); // New state for selected images
  const [errors, setErrors] = useState({});
  const [thumbnail_index, setThumbnail_index] = useState(); // New state for thumbnail index
  const [translations, setTranslations] = useState([]);
  const [attributes, setAttributes] = useState({ color: "black" });

  const [newAttrKey, setNewAttrKey] = useState("");
  const [newAttrValue, setNewAttrValue] = useState("");

  const [newDimKey, setNewDimKey] = useState("");
  const [newDimValue, setNewDimValue] = useState("");
  const Secategory = [
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
    {
      id: 4,
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
        {
          id: 9,
          name: "egusi",
          subsubcategories: [
            { id: 1, name: "cracked" },
            { id: 2, name: "uncracked" },
          ],
        },
      ],
    },
    {
      id: 5,
      name: "School",
      subcategories: [
        { id: 1, name: "Books" },
        { id: 2, name: "Stationery" },
        { id: 3, name: "Backpacks" },
        { id: 4, name: "Electronics" },
        { id: 5, name: "Art Supplies" },
        { id: 6, name: "Sports Equipment" },
      ],
    },
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
    },
  ];

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${api}/productPrev/127`);
        const data = await response.json();
        const product = data.product || data;

        // Use current_translation for default name and description

        // setCategory(
        //   `${product.category?.main || ""} > ${product.category?.sub || ""}`
        // );
        setPrice(product.user_products?.[0]?.price || 0);

        setNumberInStock(product.user_products?.[0]?.number_in_stock || 0);
        setDiscount(product.user_products?.[0]?.discount || 0);
        setStatus(product.user_products?.[0]?.status || "");
        setAddress(product.user_products?.[0]?.address || "");
        setCity(product.user_products?.[0]?.city || "");
        setColors(product.user_products?.[0]?.colors || []);
        setDimensions(product.dimensions || {}); // or compute from width/height if needed
        setAttributes(product.attributes || {});
        setPostedOn(product.created_at || new Date().toISOString());
        setImages(product.images || []);
        setSelectedImages(product.images || []);
        setProduct(product);
        setTranslations(product.translations);
        setThumbnail_index(product.thumbnail_index || 0);

        const enTranslation = product.translations?.find(
          (t) => t.language_code === "en"
        );
        const frTranslation = product.translations?.find(
          (t) => t.language_code === "fr"
        );

        setName_en(enTranslation?.name || "");
        setName_fr(frTranslation?.name || "");
        setDescription_en(enTranslation?.description || "");
        setDescription_fr(frTranslation?.description || "");

        if (product.category) {
          setCategory({
            main: product.category.main || "",
            sub: product.category.sub || "",
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [api, id]);

  // useEffect(() => {
  //   if (product?.dimensions) {
  //     if (Array.isArray(product.dimensions)) {
  //       setDimensions(product.dimensions);
  //     } else {
  //       setDimensions(product.dimensions); // Convert object to array
  //     }
  //   }
  // }, [product]);

  if (loading) {
    return <div className="loading">Loading product details...</div>; // Display loading message
  }

  const validateForm = () => {
    let validationErrors = {};

    if (!name_en) validationErrors.name_en = "Product name is required";
    if (!name_fr) validationErrors.name_fr = "Product name_fr is required";
    if (!category.main) validationErrors.category = "Main category is required";
    if (!category.sub) validationErrors.category = "Subcategory is required";
    if (!price || isNaN(price) || price <= 0)
      validationErrors.price = "Valid price is required";
    if (colors.length === 0)
      validationErrors.colors = "At least one color is required";

    if (!numberInStock || isNaN(numberInStock) || numberInStock <= 0)
      validationErrors.numberInStock = "Valid stock quantity is required";
    if (!status) validationErrors.status = "Status is required";
    if (!description_en)
      validationErrors.description_en = "Description is required";
    if (!description_fr)
      validationErrors.description_fr = "Description_fr is required";

    // Check if selectedImages or images have at least one entry
    if (selectedImages.length < 2 && images.length < 2) {
      validationErrors.images = "At least one image is required";
    }

    setErrors(validationErrors);
    console.log("validation erro:", validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true); // Set submitting state to true
    const formData = new FormData();
    const productData = {
      name_en,
      name_fr,
      category,
      price,
      dimensions,
      attributes,
      number_in_stock: numberInStock,
      discount,
      description_en,
      description_fr,
      status,
      address,
      city,
      colors,
      thumbnail_index,
    };
    formData.append("product", JSON.stringify(productData));

    // Ensure at least two valid image is included
    if (selectedImages.length > 1) {
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
      const response = await fetch(
        `${api}/adminEdit/127/1cce70d5-66f7-419e-8ad5-7b9dd56de5eb`,
        {
          method: "PUT",
          body: formData,
        }
      );
      console.log("form", formData)

      if (response.ok) {
        alert("Product updated successfully!");
      } else {
        const errorData = await response.json();
        alert(
          `Failed to update product: ${errorData.error || "Unknown error"}`
        );
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
      <form onSubmit={handleUpload}>
        <h3>{postedOn}</h3>

        {/* Render English only */}
        <div className="translation-block">
          <h4>English</h4>
          <label>Name (EN)</label>
          <input
            type="text"
            value={name_en}
            onChange={(e) => setName_en(e.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <h4>French</h4>
          <label>Nom (FR)</label>
          <input
            type="text"
            value={name_fr}
            onChange={(e) => setName_fr(e.target.value)}
          />
          {errors.name_fr && <p className="error">{errors.name_fr}</p>}
        </div>

        {/* Category */}
        <select
          name="category"
          value={category.main}
          onChange={(e) => setCategory({ main: e.target.value, sub: "" })}
        >
          <option value="">Select Category</option>
          {Secategory.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {category.main && (
          <select
            name="subcategory"
            value={category.sub}
            onChange={(e) =>
              setCategory((prev) => ({ ...prev, sub: e.target.value }))
            }
          >
            <option value="">Select Subcategory</option>
            {Secategory.find(
              (cat) => cat.name === category.main
            )?.subcategories.map((sub) => (
              <option key={sub.id} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
        )}
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
        {errors.numberInStock && (
          <p className="error">{errors.numberInStock}</p>
        )}

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
        <div>
      <h4>Colors</h4>

      {Array.isArray(colors) &&
        colors.map((color, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <input
              type="text"
              value={color}
              onChange={(e) => {
                const updated = [...colors];
                updated[index] = e.target.value;
                setColors(updated);
              }}
              style={{ marginRight: "10px" }}
            />
            <button
              type="button"
              onClick={() => {
                const updated = colors.filter((_, i) => i !== index);
                setColors(updated);
              }}
            >
              Remove
            </button>
          </div>
        ))}

      <div>
        <h3>Color</h3>
        <input
          type="text"
          placeholder="Add new color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (newColor.trim() && !colors.includes(newColor.trim())) {
                setColors([...colors, newColor.trim()]);
                setNewColor("");
              }
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (newColor.trim() && !colors.includes(newColor.trim())) {
              setColors([...colors, newColor.trim()]);
              setNewColor("");
            }
          }}
          style={{ marginLeft: "5px" }}
        >
          Add Color
        </button>
      </div>

      {errors.color && <p className="error">{errors.color}</p>}

      <pre>{JSON.stringify(colors, null, 2)}</pre>
    </div>

        {/* {custom daimention} */}

        {/* Existing Dimensions */}
        <div style={{ background: "orange,", border: "20px red" }}>
          <h3>Dimentions</h3>
          {Object.entries(dimensions).map(([key, value], index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newKey = e.target.value.trim();
                  if (!newKey) return;

                  const updated = { ...dimensions };
                  updated[newKey] = updated[key];
                  delete updated[key];
                  setDimensions(updated);
                }}
                placeholder="Key"
                style={{ marginRight: "0.5rem" }}
              />

              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setDimensions({ ...dimensions, [key]: e.target.value });
                }}
                placeholder="Value"
                style={{ marginRight: "0.5rem" }}
              />

              <button
                type="button"
                onClick={() => {
                  const updated = { ...dimensions };
                  delete updated[key];
                  setDimensions(updated);
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add New Dimension Key-Value */}
          <div>
            <input
              type="text"
              placeholder="Dimension key (e.g. depth)"
              value={newDimKey}
              onChange={(e) => setNewDimKey(e.target.value)}
              style={{ marginRight: "0.5rem" }}
            />
            <input
              type="text"
              placeholder="Dimension value (e.g. 30)"
              value={newDimValue}
              onChange={(e) => setNewDimValue(e.target.value)}
              style={{ marginRight: "0.5rem" }}
            />
            <button
              type="button"
              onClick={() => {
                if (newDimKey.trim()) {
                  setDimensions((prev) => ({
                    ...prev,
                    [newDimKey]: newDimValue,
                  }));
                  setNewDimKey("");
                  setNewDimValue("");
                }
              }}
            >
              Add Dimension
            </button>
          </div>

          {/* JSON Preview */}
          <pre>{JSON.stringify(dimensions, null, 2)}</pre>
        </div>

        {/* {attributes} */}

        <div>
          <h3>Attributes</h3>

          {Object.entries(attributes).map(([key, value], index) => (
            <div key={index}>
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newKey = e.target.value;
                  const updated = { ...attributes };
                  updated[newKey] = updated[key];
                  delete updated[key];
                  setAttributes(updated);
                }}
              />
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setAttributes({ ...attributes, [key]: e.target.value });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const updated = { ...attributes };
                  delete updated[key];
                  setAttributes(updated);
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div>
            <input
              type="text"
              placeholder="Attribute key (e.g. material)"
              value={newAttrKey}
              onChange={(e) => setNewAttrKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="Attribute value (e.g. plastic)"
              value={newAttrValue}
              onChange={(e) => setNewAttrValue(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (newAttrKey.trim()) {
                  setAttributes((prev) => ({
                    ...prev,
                    [newAttrKey]: newAttrValue,
                  }));
                  setNewAttrKey("");
                  setNewAttrValue("");
                }
              }}
            >
              Add Attribute
            </button>
          </div>
          <pre>{JSON.stringify(attributes, null, 2)}</pre>
        </div>

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

        {/* thumbnail */}
        <label>Thumbnail Index</label>
        <input
          type="number"
          name="thumbnail_index"
          placeholder="0"
          value={thumbnail_index}
          onChange={(e) => setThumbnail_index(e.target.value)}
          disabled
        />

        {/* comments */}

        <div className="translation-block">
          <label>Description (EN)</label>
          <textarea
            value={description_en}
            onChange={(e) => setDescription_en(e.target.value)}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}

          <label>Description (FR)</label>
          <textarea
            value={description_fr}
            onChange={(e) => setDescription_fr(e.target.value)}
          />
          {errors.description_fr && (
            <p className="error">{errors.description_fr}</p>
          )}
        </div>

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

            <h3>Choose your preview Image</h3>
            {selectedImages.map((file, index) => (
              <img
                key={index}
                src={file instanceof File ? URL.createObjectURL(file) : file} // Ensure only File objects are passed
                alt={`Selected ${index}`}
                width="100"
                onClick={() => {
                  setThumbnail_index(index); // Set thumbnail index on click
                }}
                style={{
                  cursor: "pointer",
                  border: thumbnail_index === index && "5px solid blue",
                  borderRadius: "4px",
                }} // Add cursor pointer for selected images
              />
            ))}
          </div>
        ) : (
          images.length > 0 && (
            <div className="uploaded-images">
              <h3>Existing Images:</h3>
              <h3>Choose your preview Image</h3>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Existing ${index}`}
                  width="100"
                  onClick={() => {
                    setThumbnail_index(index); // Set thumbnail index on click
                  }}
                  style={{
                    cursor: "pointer",
                    border: thumbnail_index === index && "5px solid blue",
                    borderRadius: "4px",
                    background: "red",
                  }} // Add cursor pointer for existing images
                />
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
