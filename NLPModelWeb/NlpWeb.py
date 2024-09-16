from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Load the dataset and model
dataset_path = r"C:\Users\PMLS\OneDrive\Desktop\SkinCareFYP\SkinCareFYP\PredictionModels\NLPModelWeb/skincare_products_clean.csv"
model_save_path = r"C:\Users\PMLS\OneDrive\Desktop\SkinCareFYP\SkinCareFYP\PredictionModels\NLPModelWeb//skincare_recommender.pkl"

data = pd.read_csv(dataset_path)

with open(model_save_path, "rb") as file:
    loaded_data = pickle.load(file)
    model = loaded_data["model"]
    vectorizer = loaded_data["vectorizer"]

# Define the endpoint to get recommendations based on user input
@app.route('/nlp', methods=['POST'])
def recommend():
    user_input = request.get_json()

    # Extract and validate user input
    skin_type = user_input.get("skin_type", "").strip().lower()
    age = user_input.get("age", "0").strip()
    skin_concerns = user_input.get("skin_concerns", "").strip()

    try:
        age = int(age)
        if age <= 0:
            raise ValueError("Age must be positive.")
    except ValueError:
        age = 0  # Default to 0 if invalid

    # Formulate user query
    user_query = f"{skin_type} skin {age} years old concerns: {skin_concerns}"

    # Get recommendations
    query_vector = vectorizer.transform([user_query])
    similar_indices = model.kneighbors(query_vector, return_distance=False)

    # Extract recommended products and their URLs
    recommendations = []
    for index in similar_indices[0]:
        recommendation = {
            "product_name": data.iloc[index]["product_name"],
            "product_type": data.iloc[index]["product_type"],
            "price": data.iloc[index]["price"],
            "url": data.iloc[index]["product_url"]
        }
        recommendations.append(recommendation)

    # Return recommendations as JSON
    return jsonify(recommendations), 200


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.2', port=2000)
