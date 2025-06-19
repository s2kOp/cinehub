from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

df = pd.read_csv("tmdb_movies_with_keywords.csv").fillna('')
df['combined'] = df['title'] + ' ' + df['overview'] + ' ' + df['genres'] + ' ' + df['keywords']
df['title_lower'] = df['title'].str.lower()

tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['combined'])
similarity_matrix = cosine_similarity(tfidf_matrix)

@app.route('/recommend', methods=['GET'])
def recommend():
    title = request.args.get('title', '').lower()

    if title not in df['title_lower'].values:
        return jsonify({"recommendations": ["Movie not found in database."]})

    idx = df[df['title_lower'] == title].index[0]
    scores = list(enumerate(similarity_matrix[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:6]
    recommendations = [df.iloc[i[0]]['title'] for i in scores]

    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True)
