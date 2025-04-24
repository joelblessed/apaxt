import React, { useState, useEffect } from "react";

function  Form({api}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${api}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Select an image first!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    const response = await fetch(`${api}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
    setPosts([...posts, data.post]);
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <div>
      <h2>Upload Post</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br />
        <button type="submit">Upload</button>
      </form>

      <h3>Uploaded Posts</h3>
      {posts.map((post, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h4>{post.title}</h4>
          <p>{post.description}</p>
          <img src={`${api}/${post.imageUrl}`} alt="Uploaded" width="200" />
        </div>
      ))}
    </div>
  );
}

export default  Form;