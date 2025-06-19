import { useLocation, useNavigate} from "react-router-dom";
import styles from "../stylesheets/MovieDetails.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";


export default function MovieDetails({API_KEY}){
    const [cast,setCast] = useState([]);
    const [recommended,setRecommended] = useState([]);
    const navigate = useNavigate()
    const location = useLocation();
    const movie = location.state?.movie;
    const query = location.state?.query;

    const movie_lang = movie.original_language;

    const languageCodes = {
     af: "Afrikaans",
     am: "Amharic",
     ar: "Arabic",
     az: "Azerbaijani",
     be: "Belarusian",
     bg: "Bulgarian",
     bn: "Bengali",
     bs: "Bosnian",
     ca: "Catalan",
     cs: "Czech",
     cy: "Welsh",
     da: "Danish",
     de: "German",
     el: "Greek",
     en: "English",
     eo: "Esperanto",
     es: "Spanish",
     et: "Estonian",
     eu: "Basque",
     fa: "Persian",
     fi: "Finnish",
     fil: "Filipino",
     fj: "Fijian",
     fr: "French",
     fy: "Frisian",
     ga: "Irish",
     gd: "Scottish Gaelic",
     gl: "Galician",
     gu: "Gujarati",
     ha: "Hausa",
     haw: "Hawaiian",
     he: "Hebrew",
     hi: "Hindi",
     hmn: "Hmong",
     hr: "Croatian",
     ht: "Haitian Creole",
     hu: "Hungarian",
     hy: "Armenian",
     id: "Indonesian",
     ig: "Igbo",
     is: "Icelandic",
     it: "Italian",
     iw: "Hebrew (old code)",
     ja: "Japanese",
     jw: "Javanese",
     ka: "Georgian",
     kk: "Kazakh",
     km: "Khmer",
     kn: "Kannada",
     ko: "Korean",
     ku: "Kurdish",
     ky: "Kyrgyz",
     la: "Latin",
     lb: "Luxembourgish",
     lo: "Lao",
     lt: "Lithuanian",
     lv: "Latvian",
     mg: "Malagasy",
     mi: "Maori",
     mk: "Macedonian",
     ml: "Malayalam",
     mn: "Mongolian",
     mr: "Marathi",
     ms: "Malay",
     mt: "Maltese",
     my: "Burmese",
     ne: "Nepali",
     nl: "Dutch",
     no: "Norwegian",
     ny: "Chichewa",
     pa: "Punjabi",
     pl: "Polish",
     ps: "Pashto",
     pt: "Portuguese",
     ro: "Romanian",
     ru: "Russian",
     rw: "Kinyarwanda",
     sd: "Sindhi",
     si: "Sinhala",
     sk: "Slovak",
     sl: "Slovenian",
     sm: "Samoan",
     sn: "Shona",
     so: "Somali",
     sq: "Albanian",
     sr: "Serbian",
     st: "Sesotho",
     su: "Sundanese",
     sv: "Swedish",
     sw: "Swahili",
     ta: "Tamil",
     te: "Telugu",
     tg: "Tajik",
     th: "Thai",
     tk: "Turkmen",
     tl: "Tagalog",
     tr: "Turkish",
     tt: "Tatar",
     ug: "Uyghur",
     uk: "Ukrainian",
     ur: "Urdu",
     uz: "Uzbek",
     vi: "Vietnamese",
     xh: "Xhosa",
     yi: "Yiddish",
     yo: "Yoruba",
     zh: "Chinese",
     zu: "Zulu"
    };

    if (!movie) return <p>No details found..</p>

    const handleGoBack = () => {
   
        navigate("/",{ state: {query} });  
    }

    useEffect(() => {
        const fetchCast = async () => {
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`)
                const res = await response.json();
                if(res){
                    setCast(res.cast.slice(0,30));
                }
            }catch(err){
                console.error(err);               
            }
        }
        fetchCast();
    },[movie.id]);

    useEffect(() => {
        const fetchRecommended = async () => {
            try{
                const result = await fetch(`http://localhost:5000/recommend?title=${movie.title}`);
                const data = await result.json();
                let recommendations = data.recommendations;
                
                const allResults = await Promise.all(
                    recommendations.map(async (movie) => {
                        const rec = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}`) 
                        const recJSON = await rec.json(); 
                        return recJSON.results[0];  
                    })
                );
                const validResults = allResults.filter(Boolean);
                setRecommended(validResults);
            }
            catch(err){
                console.error(err);
            }   
        }
        fetchRecommended();
    },[movie.id]);

    return(
        <div className={styles.container}>
            <div onClick={() => {handleGoBack()}}>
                <ArrowBackIcon className={styles.arrowBack}/>
            </div>
            <div className={styles.detailsWrapper}>
                <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt = {movie.title} />
                <div className={styles.document}>
                    <h1>Movie : {movie.title}</h1>
                    <p>Release Date : {movie.release_date}</p>
                    <p>Original Language : {languageCodes[movie_lang]}</p>
                    <p>Rating : {movie.vote_count>10 ? `${movie.vote_average.toFixed(2)}/10` : "No Rating"}</p>
                    <p>Description : {movie.overview} </p>
                    <div className={styles.castArea}>
                        {cast.map((actor)=>(
                            <div className={styles.castCard} key={actor.id}>
                                <img  src = {`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt = {actor.name} />
                                <h3>{actor.name}</h3>
                                <p>{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div> 
            </div>
            <div className={styles.recContainer}>
                <h4>{recommended.length == 0 ? "" : "You may also like"}</h4>
                <div className={styles.recArea}>
                        {recommended.map((movie)=>(
                            <div className={styles.recCard} key={movie.id}>
                                <img  src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt = {movie.title} onClick={() => {
                                            navigate("/movie-detail", {state: {movie , query: movie.title || "Avengers"}});
                                }}/>
                                <h3>{movie.title}</h3>
                            </div>
                        ))}                
                </div>
            </div>
        </div>
    )
}