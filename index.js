const searchTerm = document.querySelector("#search");

const omdbURL = "http://www.omdbapi.com/";
const API_KEY = "9e0f94a9";

const favMovies = [];
searchTerm.addEventListener("keyup", () => {
  let searchText = searchTerm.value;
  if (searchText === "") return;
  const movies = fetchMovies(searchText);
  // showMovies(movies);
});

const fetchMovies = async (searchText) => {
  const url = new URL(omdbURL);
  url.searchParams.set("apikey", API_KEY);
  url.searchParams.set("t", searchText);
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const fetchData = async () => {
  const response = await fetch("apikey=s=hello&type=movie&page=3");
  const data = await response.json();

  console.log(data);
};

fetchData();
