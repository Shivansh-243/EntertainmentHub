const axios = require("axios");
const WatchlistItem = require("../model/movieModel");

// add movie to watchlist functionality
const addMovieToWatchlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id;

  try {
    const watchlistItem = new WatchlistItem({
      user: userId,
      movie: movieId,
    });
    await watchlistItem.save();
    res.status(201).json({ message: "Movie added to watchlist" });
  } catch (error) {
    console.error("Error in watchlistcontroller", error);
    res.status(400).json({ message: "Movie not added to watchlist" });
  }
};

// get movie functionality
const getWatchlistIds = async (userId) => {
  try {
    const watchlistMovies = await WatchlistItem.find({ user: userId });
    const movieIds = watchlistMovies.map((item) => item.movie);
    return movieIds;
  } catch (error) {
    console.error("Error in getWatchlistIds", error);
    return [];
  }
};

const fetchMovieDetails = async (movieId) => {
  const apikey = "a824777d3bce74fdc9ddb4bb0183b777";
  const MovieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`;

  try {
    const response = await axios.get(MovieDetailsUrl);
    const movieDetails = response.data;
    return movieDetails;
  } catch (error) {
    console.error("Error in fetchMovieDetails:", error);
    return null;
  }
};

const getWatchlist = async (req, res) => {
  const userId = req.user.id;
  const movieIds = await getWatchlistIds(userId);

  // Create an array of promises to fetch movie details
  const movieList = movieIds.map((movieId) => fetchMovieDetails(movieId));

  try {
    // Use Promise.all to fetch movie details concurrently
    const movieDetails = await Promise.all(movieList);
    console.log(movieDetails);
    res
      .status(200)
      .json({ message: "Movie details fetched", data: movieDetails });
  } catch (error) {
    console.error("Error in getWatchlist:", error);
    res.status(400).json({ message: "Error in fetchMovieDetails" });
  }
};

// delete movie from watchlist functionality
const deleteMovieFromWatchlist = async (req, res) => {
  const { movieId } = req.params; // Accessing movieId from route parameters
  const userId = req.user.id;

  try {
    await WatchlistItem.findOneAndDelete({ user: userId, movie: movieId });
    res.status(200).json({ message: "Movie deleted from watchlist" });
  } catch (error) {
    console.error("Error in deleteMovieFromWatchlist", error);
    res.status(400).json({ message: "Movie not deleted from watchlist" });
  }
};

module.exports = {
  addMovieToWatchlist,
  getWatchlist,
  deleteMovieFromWatchlist,
};
