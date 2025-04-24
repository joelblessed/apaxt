import React, { useState, useEffect } from 'react';
import './ProfileImageUpload.css';

const EditProfilePicture = ({ userId }) => {
  const [profileImage, setProfileImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch current profile image on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        
        const data = await response.json();
        if (data.success && data.data.profileImage) {
          setProfileImage(data.data.profileImage);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image/(jpeg|png|gif)')) {
      setError('Only JPEG, PNG, and GIF images are allowed');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError('');
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const token = localStorage.getItem('token'); // Assuming you use JWT
      const response = await fetch(`/api/users/${userId}/profile-image`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      setProfileImage(result.data.profileImage);
      setSuccess('Profile image updated successfully!');
      setSelectedFile(null);
    } catch (err) {
      setError(err.message || 'Failed to update profile picture');
    } finally {
      setIsLoading(false);
    }
  };

  // Display selected image or current profile image
  const imageToDisplay = selectedFile 
    ? URL.createObjectURL(selectedFile) 
    : profileImage || '/default-avatar.png';

  return (
    <div className="profile-image-upload">
      <div className="image-container">
        <img 
          src={imageToDisplay} 
          alt="Profile" 
          className="profile-image"
        />
      </div>

      <div className="upload-controls">
        <input
          type="file"
          id="profile-upload"
          accept="image/jpeg, image/png, image/gif"
          onChange={handleFileChange}
          disabled={isLoading}
          className="file-input"
        />
        <label htmlFor="profile-upload" className="upload-label">
          Choose New Image
        </label>
        
        {selectedFile && (
          <p className="file-info">{selectedFile.name}</p>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          className={upload-button `${(!selectedFile || isLoading) ? 'disabled' : ''}`}
        >
          {isLoading ? 'Uploading...' : 'Upload Image'}
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default EditProfilePicture;