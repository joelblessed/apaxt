import React, { useState,use } from "react";

const NewProduct = (e) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "",
    like: 0,
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Failed to add data.");
    }
  };
  // uploads

  // const handleUpload = async (file) => {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   const response = await fetch("http://localhost:5000/images", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const imageUrl = await response.json();

  //   // Save the image URL to db.json
  //   await fetch("http://localhost:3000/images", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id: Date.now(), url: imageUrl }),
  //   });
  // };





  const [image, setImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/images")
      .then((res) => res.json())
      .then((data) => setUploadedImages(data));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Select an image first!");

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
    setUploadedImages([...uploadedImages, { url: data.url }]);
  };
  return (
    <div>
      <h2 className="text-center mb-3">Create New Product</h2>

      {/* {erroMessage} */}

      <div className="row">
        <div className="col-lg-6 mx-auto"></div>
        <form
          onSubmit={(event) => handleSubmit(event)}
          method="POST"
          action="/products/newproduct'"
        >
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Name</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                name="name"
                defaultValue=""
                placeholder="Product Name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Brand</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                name="brand"
                Value=""
                onChange={handleChange}
                placeholder="Brand Name"
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Category</label>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="category"
                value={formData.category}
                placeholder="Choose a Category"
                onChange={handleChange}
              >
                <option value="">Choose a Category</option>
                <option value="Phones">Phones</option>
                <option value="Computers">Computers</option>
                <option value="Acceessories">Acceessories</option>
                <option value="Farm">Farm</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Status</label>
            <div className="col-sm-8">
              <select
                className="form-select"
                name="status"
                defaultValue=""
                value={formData.status}
                onChange={handleChange}
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Number in stock</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                name="numberInStock"
                type="number"
                defaultValue=""
                placeholder="Enter Quantity "
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Price</label>
            <div className="col-sm-8">
              <input
                className="form-control"
                name="price"
                type="number"
                defaultValue=""
                placeholder="Enter Amount"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Image</label>
            <div className="col-sm-8">
            <h2>Upload Image</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      <h3>Uploaded Images</h3>
      {uploadedImages.map((img, index) => (
        <img key={index} src={`http://localhost:3001/${img.url}`} alt="Uploaded" width="200" />
      ))}
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Description</label>
            <div className="col-sm-8">
              <textarea
                className="form-control"
                name="desc"
                defaultValue=""
                type="text"
                placeholder="Details of your Product"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="offset-sm-4 col-sm-4 d-grid">
              <button type="submit" className="btn btn-primary btn-sm me-3">
                Save
              </button>
            </div>
            <div className="col-sm-4 d-grid">
              <button type="submit">Submit</button>
              {/* <button type='button' className='btn btn-secondary me-2'>Cancel</button> */}
            </div>
          </div>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default NewProduct;
