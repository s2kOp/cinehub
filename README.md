# 🎬 Cinehub

**Cinehub** is a sleek and powerful movie search web application built using React and TMDB API. It allows users to search for movies, view detailed information including cast, and get personalized movie recommendations using machine learning.

---

## 🔍 Features

- 🔎 **Search Movies**  
  Search for your favorite movies using The Movie Database (TMDB) API.

- 📱 **Fully optimized for mobile devices**

- 🎭 **Movie Details**  
  Click on any movie to view detailed information such as:
  - Title, release date, overview
  - Language, rating
  - Cast with profile pictures and character names

- 🤖 **ML-based Recommendations**  
  Get smart movie recommendations based on the selected movie using **cosine similarity** on movie metadata (title, overview, genres, keywords).

---

## 📦 Dataset

The dataset used for the recommender system was **manually created** by extracting movie details from the TMDB API using endpoints like:
- `/discover/movie`
- `/movie/{id}/keywords`
- `/movie/{id}/credits`

Key columns include:
- Title  
- Overview  
- Genres  
- Keywords  

These were combined into a single text feature for computing similarity.

---

## 🛠️ Technologies Used

- **Frontend**: React, CSS Modules, Material UI Icons  
- **Backend**: Flask (for ML recommender API)  
- **Machine Learning**: Scikit-learn, TfidfVectorizer, Cosine Similarity  
- **Data**: TMDB API + manually extracted metadata  

---

## 📸 Screenshots

### Home Page

![homepage](/screenshots/homePage.png)

### Details and Recommendations

![Details](/screenshots/detailsAndRecommendations.png)


---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/cinehub.git
cd cinehub
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Set Environment Variables

Create a .env file:
```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Start the React App
```bash
npm run dev
```

### 5. Run the Recommender Backend (Python)
```bash
cd backend
pip install -r requirements.txt
python app.py
```


