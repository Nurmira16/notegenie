import React, { useState } from 'react';

const LandingPage = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // Handle image upload (for now, just logs to the console)
  const handleImageUpload = () => {
    if (image) {
      console.log('Image uploaded:', image);
      // Add logic to upload the image, call an API, or process the image
    } else {
      alert('Please select an image first.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to NoteGenie!</h1>
      <p className="mb-6 text-xl">Upload an image of your notes to get started.</p>
      
      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 border p-2 rounded-lg"
      />
      
      {/* Display Image Preview */}
      {imagePreview && <img src={imagePreview} alt="Preview" className="w-64 h-64 object-cover mb-4" />}
      
      {/* Upload Button */}
      <button
        onClick={handleImageUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Upload Image
      </button>
    </div>
  );
};

export default LandingPage;
