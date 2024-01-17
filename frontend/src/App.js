import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MoviePage from "./Pages/MoviePage";
import MovieDetailsPage from "./components/subComponents/movieDetails";
import SignUp from "./components/Signup";
import WatchList from "./components/subComponents/WatchList";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/movies" Component={MoviePage} />
        <Route path="/movies/:movieId" Component={MovieDetailsPage} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/watchlist" Component={WatchList} />
      </Routes>
    </div>
  );
};

export default App;
