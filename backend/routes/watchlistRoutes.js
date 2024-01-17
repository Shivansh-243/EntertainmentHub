const express = require("express");
const router = express.Router();
const protect = require("../middleware/authentication");
const {
  addMovieToWatchlist,
  getWatchlist,
  deleteMovieFromWatchlist,
} = require("../controller/watchlistController");

router.post("/add", protect, addMovieToWatchlist);
router.get("/", protect, getWatchlist);
router.delete("/delete/:movieId", protect, deleteMovieFromWatchlist);

module.exports = router;
