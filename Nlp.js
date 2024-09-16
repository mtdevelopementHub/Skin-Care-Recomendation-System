import React, { useState } from 'react';
import './Nlp.css'; // Include your CSS for modal and form styling

const Nlp = ({ isOpen = true, onClose }) => {
  const [skinType, setSkinType] = useState('');
  const [age, setAge] = useState('');
  const [conditions, setConditions] = useState({
    wrinkles: false,
    acne: false,
    darkCircles: false,
  });
  const [recommendations, setRecommendations] = useState([]);

  const handleSkinTypeChange = (e) => {
    setSkinType(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleConditionChange = (e) => {
    const { name, checked } = e.target;
    setConditions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      skin_type: skinType,
      age: age,
      skin_concerns: Object.keys(conditions).filter((key) => conditions[key]).join(', '),
    };

    try {
      const response = await fetch('http://127.0.0.2:2000/nlp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data); // Store recommendations
      } else {
        console.error('Failed to fetch recommendations');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleReset = () => {
    setSkinType('');
    setAge('');
    setConditions({
      wrinkles: false,
      acne: false,
      darkCircles: false,
    });
    setRecommendations([]); // Clear recommendations
  };

  if (!isOpen) return null;

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button> {/* "Cancel" button */}
        <h2>Skin Care Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Skin Type:</label>
            <select value={skinType} onChange={handleSkinTypeChange}>
              <option value="">Select...</option>
              <option value="oily">Oily</option>
              <option value="dry">Dry</option>
              <option value="combination">Combination</option>
              <option value="normal">Normal</option>
              <option value="sensitive">Sensitive</option>
            </select>
          </div>

          <div>
            <label>Age:</label>
            <input type="number" value={age} onChange={handleAgeChange} />
          </div>

          <div>
            <label>Conditions:</label>
            <div>
              <input
                type="checkbox"
                name="wrinkles"
                checked={conditions.wrinkles}
                onChange={handleConditionChange}
              />
              <label>Wrinkles</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="acne"
                checked={conditions.acne}
                onChange={handleConditionChange}
              />
              <label>Acne</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="darkCircles"
                checked={conditions.darkCircles}
                onChange={handleConditionChange}
              />
              <label>Dark Circles</label>
            </div>
          </div>

          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button> {/* Side-by-side buttons */}
          </div>
        </form>

        {recommendations.length > 0 ? (
          <div className="recommendations-container">
            <h3>Recommended Products</h3>
            <ul>
              {recommendations.map((product, index) => (
                <li key={index}>
                  <strong>{product.product_name}</strong> - {product.product_type} (${product.price}) - <a href={product.url} target="_blank" rel="noopener noreferrer">Buy Now</a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No recommendations yet. Submit the form to get recommendations.</p>
        )}
      </div>
    </div>
  );
};

export default Nlp;
