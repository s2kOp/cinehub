import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MovieMain from "../components/MovieMain.jsx";
import MovieDetails from "../components/MovieDetails.jsx";

export default function App(){
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    return(
      <Router>
        <Routes>
            <Route path="/" element={<MovieMain API_KEY = {API_KEY} />} />
            <Route path = "/movie-detail" element = {<MovieDetails API_KEY = {API_KEY} />} />
        </Routes>
      </Router>
    )
}