const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

connectDB();
const app = express();

app.use(express.json());
app.use("", userRoutes);
app.use("/watchlist", watchlistRoutes);

app.get("/", (req, res) => {
  console.log("server running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
