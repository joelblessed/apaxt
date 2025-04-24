import React, { useState, useEffect } from "react";

function  FormUpload({api}) {
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
   
  );
}

export default  FormUpload;