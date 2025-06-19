
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv("tmdb_movies_with_keywords.csv").fillna('')
df['combined'] = df['title'] + ' ' + df['overview'] + ' ' + df['genres'] + ' ' + df['keywords']
df['title_lower'] = df['title'].str.lower()

def compute_similarity_matrix():
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df['combined'])
    return cosine_similarity(tfidf_matrix)

similarity_matrix = compute_similarity_matrix()

def recommend(title, n=5):
    title = title.lower()
    if title not in df['title_lower'].values:
        return []

    idx = df[df['title_lower'] == title].index[0]
    scores = list(enumerate(similarity_matrix[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:n+1]

    return [df.iloc[i[0]]['title'] for i in scores]