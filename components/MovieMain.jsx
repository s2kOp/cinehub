import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../stylesheets/MovieMain.module.css"

export default function MovieMain({API_KEY}){
    const [movieName,setMovieName] = useState("");
    const [activeQuery, setActiveQuery] = useState("");
    const [result,setResult] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = location.state?.query || "";
    const fetchCards = async (query) => {
        try{    
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
            const res = await response.json();
            if(res){
                const sorted_movies = res.results.sort((a,b) => (
                b.popularity - a.popularity
            ))  
            setResult(sorted_movies);
            setActiveQuery(query); 
        }
        }catch(err){
            console.error(err);
        }
    }
    const handleSearch = async () => {
        if(movieName == ""){
            return;
        } 
        localStorage.setItem("lastQuery", movieName);
        fetchCards(movieName);
    }
    const handleCardClick = (movie) => {
        navigate("/movie-detail", {state: {movie , query: activeQuery || "Avengers"}});
    }
useEffect(() => {
  if (searchQuery) {
    fetchCards(searchQuery);
  } else {
    fetchCards("Avengers");
  }
}, []);

    return(
        <div className={styles.container}>
            <header className={styles.head}>
                <h1 onClick={()=>{fetchCards("Avengers");
                                   setMovieName(""); 
                                }}>Cinehub</h1>
                <div>
                    <input type = "text" placeholder="Enter movie name.." 
                           value={movieName} onChange={(e) => setMovieName(e.target.value)}></input>
                    <button onClick={handleSearch}>Search</button>
                </div>
            </header>
            <div className={styles.moviesArea}>
                {result.map((movie)=>(
                    <div className={styles.movieCard} key={movie.id} onClick={() => {handleCardClick(movie)}}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt = {movie.title}></img>
                       <div> 
                        <h2>{movie.title}</h2>
                       </div> 
                    </div>
                ))}
            </div>
        </div>
    )
}