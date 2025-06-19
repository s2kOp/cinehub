from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import recommend

app = Flask(__name__)
CORS(app)

@app.route("/recommend")
def get_recommendations():
    title = request.args.get("title", "")
    results = recommend(title)
    return jsonify({"recommendations": results})

@app.route("/")
def home():
    return "CineHub backend is live!"

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 3000))
    app.run(host="0.0.0.0", port=port)