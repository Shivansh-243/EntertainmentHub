import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ updateSearchedData }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const apikey = "a824777d3bce74fdc9ddb4bb0183b777";
  const baseurl = "https://api.themoviedb.org/3";
  const [show, setShow] = useState(true);
  const trendingMovies = "https://api.themoviedb.org/3/trending/movie/week";
  const [trending, setTrending] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
    fetch(`${trendingMovies}?api_key=${apikey}`)
      .then((response) => response.json())
      .then((data) => {
        setTrending(data.results);
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (query) => {
    if (query === "") {
      setShow(true);
      setMovies(trending);
      return;
    }
    fetch(`${baseurl}/search/movie?api_key=${apikey}&query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
    setShow(false);
  };

  updateSearchedData(movies);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };
  return (
    <>
      <nav style={{ backgroundColor: " grey" }}>
        <div>
          <div style={{ marginLeft: "60%" }}>
            <div>
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon3"
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: "50%" }}
              />

              {/* <!--Search button--> */}
              <button
                type="button"
                onClick={() => {
                  handleSearch(query);
                }}
                style={{ width: "30%", border: "1px solid red" }}
              >
                Search
              </button>
              {isLoggedIn ? (
                <button
                  type="button"
                  className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  style={{ backgroundColor: "blue", marginLeft: "6px" }}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  style={{ backgroundColor: "blue", marginLeft: "6px" }}
                  onClick={handleLogin}
                >
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* ----------- end of navBar---------- */}

      {/* <!------ Hero section -------> */}

      {show && (
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          style={{
            backgroundposition: "50%",
            backgroundImage:
              "url('https://tecdn.b-cdn.net/img/new/slides/146.webp')",
            height: " 350px",
            marginBottom: "2%",
          }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
            style={{ backgroundcolor: "rgba(0, 0, 0, 0.75)" }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="px-6 text-center text-white md:px-12">
                <h1 className="mb-6 text-5xl font-bold">Heading</h1>
                <h3 className="mb-8 text-3xl font-bold">Subeading</h3>
                <button
                  type="button"
                  className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* hero section ends here */}
    </>
  );
};

export default NavigationBar;
