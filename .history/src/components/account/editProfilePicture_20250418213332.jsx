import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const ProfilePictureUpload = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset messages
    setError(null);
    setSuccess(false);

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

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !currentUser) return;

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      setIsUploading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(
        `/api/profile/update-image/${currentUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      updateUser(result.data.user);
      setSuccess(true);
      setSelectedFile(null);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to update profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const imagePreview = selectedFile 
    ? URL.createObjectURL(selectedFile) 
    : currentUser?.profileImage || '/default-avatar.png';

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img 
          src={imagePreview} 
          alt="Profile" 
          style={styles.image}
        />
      </div>

      <div style={styles.uploadSection}>
        <input
          type="file"
          id="profile-upload"
          accept="image/jpeg, image/png, image/gif"
          onChange={handleFileChange}
          disabled={isUploading}
          style={styles.hiddenInput}
        />
        <label htmlFor="profile-upload" style={styles.uploadLabel}>
          Choose Image
        </label>
        
        {selectedFile && (
          <p style={styles.fileName}>{selectedFile.name}</p>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        style={{
          ...styles.uploadButton,
          ...((!selectedFile || isUploading) && styles.disabledButton)
        }}
      >
        {isUploading ? 'Uploading...' : 'Upload Picture'}
      </button>

      {error && (
        <p style={styles.errorMessage}>{error}</p>
      )}

      {success && (
        <p style={styles.successMessage}>Profile picture updated successfully!</p>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  imageContainer: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #f0f0f0'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  uploadSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    width: '100%'
  },
  hiddenInput: {
    display: 'none'
  },
  uploadLabel: {
    padding: '12px 24px',
    backgroundColor: '#4a6cf7',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    width: '100%',
    textAlign: 'center'
  },
  fileName: {
    fontSize: '14px',
    color: '#666',
    margin: '0'
  },
  uploadButton: {
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    width: '100%'
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed'
  },
  errorMessage: {
    color: '#dc3545',
    margin: '0',
    textAlign: 'center'
  },
  successMessage: {
    color: '#28a745',
    margin: '0',
    textAlign: 'center'
  }
};

export default ProfilePictureUpload;