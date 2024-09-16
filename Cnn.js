import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './Cnn.css'; // Include your custom styles

const Cnn = ({ isOpen, onClose }) => {
  const webcamRef = useRef(null); // Reference to the webcam
  const [imageSrc, setImageSrc] = useState(null); // Store the captured image
  const [predictionResults, setPredictionResults] = useState(null); // Store the prediction results

  // Reset state to initial values
  const reset = () => {
    setImageSrc(null);
    setPredictionResults(null);
  };

  // Capture image from the webcam and store as base64
  const captureImage = () => {
    const image = webcamRef.current.getScreenshot(); // Capture the screenshot
    setImageSrc(image); // Save the captured image
  };

  // Submit the captured image to the backend
  const submitImage = async () => {
    if (imageSrc) {
      try {
        const formData = new FormData(); // Use FormData for file uploads
        const base64Data = imageSrc.split(',')[1]; // Extract the base64 part
        const byteCharacters = atob(base64Data); // Decode base64
        const byteArrays = [];

        // Convert base64 to a Blob
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length).fill(0).map((_, i) => slice.charCodeAt(i));
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: 'image/jpeg' }); // Create a Blob from byte arrays
        formData.append('image', blob, 'captured.jpg'); // Add the image to FormData

        // Make the POST request to the combined endpoint
        const response = await fetch('http://127.0.0.1:5000/combined-predict', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json(); // Get the JSON response
          setPredictionResults(result); // Store the comprehensive prediction results
        } else {
          console.error('Failed to submit image');
          setPredictionResults(null); // Reset if error occurs
        }
      } catch (error) {
        console.error('Error submitting image:', error);
        setPredictionResults(null); // Reset if error occurs
      }
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent background click */}
        <button className="close-button" onClick={onClose}>×</button> {/* Close button */}
        <h2>Live Camera</h2>

        {/* Display the webcam if there's no captured image */}
        {!imageSrc ? (
          <div className="webcam-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ width: 640, height: 480, facingMode: 'user' }}
            />
            <button onClick={captureImage} className="capture-button">Capture</button> {/* Capture image */}
          </div>
        ) : (
          <div className="captured-image-container">
            <img src={imageSrc} alt="Captured" className="captured-image" /> {/* Show captured image */}
            <div className="button-group">
              <button onClick={submitImage} className="submit-button">Submit</button> {/* Submit image */}
              <button onClick={reset} className="reset-button">Reset</button> {/* Reset everything */}
              <button onClick={() => setImageSrc(null)} className="cancel-button">Cancel</button> {/* Clear captured image */}
            </div>
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

export default Cnn;
