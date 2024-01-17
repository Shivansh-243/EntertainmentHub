import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  console.log(movieId);
  const apikey = "a824777d3bce74fdc9ddb4bb0183b777";
  const movieEndpoint = `https://api.themoviedb.org/3/movie/${movieId}`;

  const url = `${movieEndpoint}?api_key=${apikey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [movieId]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <>
      <div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div
          class="relative overflow-hidden bg-cover bg-no-repeat"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <img
            class="rounded-t-lg"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: "60%",
              height: "600px",
            }}
          />
        </div>
        <div class="p-6">
          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {movie.title}
          </h5>
          <p class="text-base text-neutral-600 dark:text-neutral-200">
            <small class="text-neutral-500 dark:text-neutral-400">
              Release Date: {movie.release_date}
            </small>
          </p>
          <br />
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {movie.overview}
          </p>
        </div>
      </div>
    </>
  );
}

export default MovieDetailsPage;
