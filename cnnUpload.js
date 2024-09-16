import React, { useState } from 'react';
import './cnnUpload.css'; // Include any CSS for the modal

const CnnUpload = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected file
  const [predictionResults, setPredictionResults] = useState(null); // State to hold prediction results
  const [error, setError] = useState(null); // State for error handling

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file in state
    setError(null); // Reset error state
  };

  // Handle file upload to the backend
  const handleSubmit = () => {
    if (selectedFile) {
      const formData = new FormData(); // Use FormData for file uploads
      formData.append('image', selectedFile); // Add the image to FormData
  
      fetch('http://127.0.0.1:5000/combined-predict', {
        method: 'POST',
        body: formData,
      })
        .then(async (response) => {
          if (response.ok) {
            const result = await response.json(); // Get JSON response
            console.log('Image uploaded successfully');
            setPredictionResults(result); // Store the prediction results
          } else {
            console.error('Failed to upload image');
            setError('Failed to upload image. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          setError('Error uploading image. Please try again.');
        });
    }
  };

  if (!isOpen) return null; // If modal is not open, don't render it

  return (
    <div className="modal-background" onClick={onClose}> {/* Handle background click */}
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}> {/* Prevent click propagation */}
        <h2>Upload an Image</h2>

        {/* File input for images */}
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*" 
        />

        <div className="button-group">
          <button 
            onClick={handleSubmit} 
            className="submit-button" 
            disabled={!selectedFile} // Disable if no file is selected
          >
            Submit
          </button>

          <button 
            onClick={onClose} 
            className="cancel-button"
          >
            Cancel
          </button>

          {/* Reset button to clear state */}
          <button 
            onClick={() => { 
              setSelectedFile(null); 
              setPredictionResults(null); 
              setError(null); 
            }} 
            className="btn"
          >
            Reset
          </button>
        </div>

        {/* Display error message if there is an error */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Display prediction results if available */}
        {predictionResults && (
          <div className="prediction-results">
            {/* Predicted Age */}
            {predictionResults.age_predictions && (
              <div>
                <h3>Predicted Age:</h3>
                <p>{predictionResults.age_predictions.join(', ')}</p>
              </div>
            )}

            {/* Predicted Skin Type */}
            {predictionResults.predicted_skin_type && (
              <div>
                <h3>Predicted Skin Type:</h3>
                <p>{predictionResults.predicted_skin_type}</p>
              </div>
            )}

            {/* Predicted Skin Defect */}
            {predictionResults.predicted_skin_defect && (
              <div>
                <h3>Predicted Skin Defect:</h3>
                <p>{predictionResults.predicted_skin_defect}</p>
              </div>
            )}

            {/* Recommended Products */}
            {predictionResults.recommendations && predictionResults.recommendations.length > 0 && (
              <div>
                <h3>Recommended Products:</h3>
                <ul>
                  {predictionResults.recommendations.map((rec, index) => (
                    <li key={index}>
                      {rec.product_name} - {rec.product_type} - ${rec.price} - <a href={rec.url} target="_blank" rel="noopener noreferrer">More Info</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CnnUpload;
