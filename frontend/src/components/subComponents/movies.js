import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Movies = ({ movies }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleWatchlist = async (movieId) => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post("/watchlist/add", { movieId }, config);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {movies.map((movie) => (
          <div
            className="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
            style={{ marginBottom: "2%", marginRight: "3px" }}
          >
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <img
                  className="rounded-t-lg"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  style={{ cursor: "pointer" }}
                />
              </Link>
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {movie.title}
              </h5>
              <p className="text-base text-neutral-600 dark:text-neutral-200 max-h-[4.5em] overflow-hidden text-ellipsis">
                {movie.overview}
              </p>
            </div>
            <button
              type="button"
              className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              style={{ backgroundColor: "blue", marginLeft: "6px" }}
              onClick={() => handleWatchlist(movie.id)}
            >
              Add To Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
