import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import styled from '@emotion/styled';

const ProfilePictureUpload = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image/(jpeg|png|gif)')) {
      enqueueSnackbar('Only JPEG, PNG, and GIF images are allowed', { variant: 'error' });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      enqueueSnackbar('Image size must be less than 5MB', { variant: 'error' });
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
      
      const response = await axios.put(
        `/api/profile/update-image/${currentUser.id},
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      updateUser(response.data.data.user);
      enqueueSnackbar('Profile picture updated successfully!', { variant: 'success' });
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile picture';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const imagePreview = selectedFile 
    ? URL.createObjectURL(selectedFile) 
    : currentUser?.profileImage || '/default-avatar.png';

  return (
    <UploadContainer>
      <ProfileImageContainer>
        <ProfileImage src={imagePreview} alt="Profile" />
      </ProfileImageContainer>

      <InputContainer>
        <HiddenInput
          type="file"
          id="profile-upload"
          accept="image/jpeg, image/png, image/gif"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <Label htmlFor="profile-upload">
          Choose Image
        </Label>
        {selectedFile && (
          <FileName>{selectedFile.name}</FileName>
        )}
      </InputContainer>

      <UploadButton
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload Picture'}
      </UploadButton>
    </UploadContainer>
  );
};

// Styled Components
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProfileImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f0f0f0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Label = styled.label`
  padding: 0.75rem 1.5rem;
  background-color: #4a6cf7;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: #3a5bd9;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const FileName = styled.span`
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.5rem;
  text-align: center;
`;

const UploadButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default ProfilePictureUpload;