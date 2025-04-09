import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const LandingPage = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setExtractedText('');
    }
  };

  const handleImageUpload = () => {
    if (image) {
      setLoading(true);
      Tesseract.recognize(image, 'eng', {
        logger: m => console.log(m),
      }).then(({ data: { text } }) => {
        setExtractedText(text);
        setLoading(false);
      });
    } else {
      alert('Please select an image first.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6 landing_div">
      <h1 className="text-4xl font-bold mb-4">Welcome to NoteGenie!</h1>
      <p className="mb-6 text-xl">Upload your notes to extract the text.</p>

      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 border p-2 rounded-lg" />
      {imagePreview && <img src={imagePreview} alt="Preview" className="w-64 h-64 object-cover mb-4" />}
      
      <button
        onClick={handleImageUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Upload & Extract"}
      </button>

      {extractedText && (
        <div className="mt-6 w-full max-w-xl bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Extracted Text:</h2>
          <p className="whitespace-pre-wrap">{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
