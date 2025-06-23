import { useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=c71f08e0";
//here we are using an API so we have to load this api at the time where the page first loaded
// so we are going to use the useEffect hook for this
// so first step in building this api driven app is to use a useEffect hook
// we have to import useEffect hooke from react library
// now lets just understand what is  a useeffect hook is
// so basically it will have a call back function as well as an empty dependency array
//we have to define the function that calls the data from the api
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Batman");
  const inputRef = useRef(null)
  // search movies is the function which is used to fetch the movies
  const searchMovies = async (Title) => {
    const response = await fetch(`${API_URL}&s=${Title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  useLayoutEffect(() => {
    //over here we will be needing a function which gets data from the api
    searchMovies(searchTerm);
  }, [searchTerm]);
  return (
    <div className="app">
      <h1>MovieBox</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          // value={searchTerm}
          ref={inputRef}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            setSearchTerm(inputRef.current.value);
            searchMovies(searchTerm);
           
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies of that sort</h2>
        </div>
      )}
    </div>
  );
}

export default App;
