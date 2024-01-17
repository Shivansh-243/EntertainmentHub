import React, { useState } from "react";
import NavigationBar from "../components/subComponents/navigationBar";
import Movies from "../components/subComponents/movies";

const MoviePage = () => {
  const [searchedData, setSearchedData] = useState([]);

  const updateSearchedData = (data) => {
    setSearchedData(data);
  };
  return (
    <>
      <div>
        <NavigationBar updateSearchedData={updateSearchedData}></NavigationBar>
      </div>
      <div>
        <Movies movies={searchedData}></Movies>
      </div>
    </>
  );
};

export default MoviePage;
