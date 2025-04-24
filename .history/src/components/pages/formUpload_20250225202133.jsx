import React, { useState } from "react";

const FormUpload = ({api}) => {
    const [name, setName] = useState("");
    const [category]
    const [description, setDescription] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    // Handle form submission (upload files + text data)
    const handleUpload = async () => {
        if (!name || !description || selectedFiles.length === 0) {
            alert("Please fill in all fields and select files.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files", selectedFiles[i]);
        }

        try {
            const response = await fetch(`${api}/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            setResponseMessage("Files uploaded successfully!");
            console.log("Upload Success:", data);
        } catch (error) {
            console.error("Upload Error:", error);
            setResponseMessage("Error uploading files.");
        }
    };

    return (
        <div>
            <h2>Upload Files and Text</h2>
            <input 
                type="text" 
                placeholder="product name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <br />
            <textarea 
                placeholder="Enter Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            <br />
            <input type="file" multiple onChange={handleFileChange} />
            <br />
            <button onClick={handleUpload}>Upload</button>

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default FormUpload