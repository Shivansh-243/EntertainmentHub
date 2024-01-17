const mongoose = require("mongoose");

const watchlistItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  movie: {
    type: Number,
    ref: "Movie", // Reference to the Movie model
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const WatchlistItem = mongoose.model("WatchlistItem", watchlistItemSchema);

module.exports = WatchlistItem;
