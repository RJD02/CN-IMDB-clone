const searchTerm = <HTMLInputElement>document.querySelector("#search");

const omdbURL = "https://www.omdbapi.com/";
const API_KEY = "9e0f94a9";

enum LocalStorageKeys {
  favList = "favList",
  movieId = "movieId",
}

let favMovies: string[] = [];
const favListFromLocalStorage = localStorage.getItem(LocalStorageKeys.favList);
if (favListFromLocalStorage != null && favListFromLocalStorage != undefined)
  favMovies = JSON.parse(favListFromLocalStorage);
let currMovies: OMDBResponseSearchObject[] = [];
let id = 1;

interface OMDBResponseSearchObject {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
}

interface OMDBResponse {
  Response: ["True", "False"];
  Search: [OMDBResponseSearchObject] | null;
  totalResults: string | null;
}
window.addEventListener("beforeunload", () => {
  searchTerm.value = "";
  localStorage.setItem(LocalStorageKeys.favList, JSON.stringify(favMovies));
});

searchTerm.addEventListener("input", async () => {
  let searchText = searchTerm.value;
  if (!searchText) {
    console.log("Empty");
    return;
  }

  if (searchText[searchText.length - 1] != " ") deleteAllMovies();
  currMovies = (await fetchMovies(searchText)) || [];
  currMovies = currMovies.filter((m) => m.Poster != "N/A");
  currMovies.forEach((e) => addMovies(e));
  console.log("Current movies", currMovies);
});

const deleteAllMovies = async () => {
  console.log("Deleting all movies");
  const movieDivs = document.querySelectorAll(".movie");
  if (movieDivs) {
    movieDivs.forEach((e) => e.remove());
  }
};

const addMovies = (movie: OMDBResponseSearchObject) => {
  // check if this movie of this id already exists
  const doesMovieDivExists = document.querySelector(`#movie-${movie.imdbID}`);
  if (doesMovieDivExists) return;
  // const url = new URL(omdbURL)
  // url.searchParams.set('i', movie.imdbID)
  // url.searchParams.set('apikey', API_KEY)
  // try {
  // const response = await fetch(url);
  // const data = await response.json();
  // } catch(e) {
  //   console.log(e);
  //   return;
  // }
  const gridDiv = document.querySelector(".grid");
  const colDiv = document.createElement("div");
  colDiv.classList.add("movie");
  colDiv.id = `movie-${movie.imdbID}`;
  colDiv.classList.add("bg-zinc-700");
  colDiv.classList.add("group");

  colDiv.innerHTML = `
          
            <div class="max-h-full relative flex flex-1">
              <img
                src=${movie.Poster}
                alt=""
                class="group-hover:blur-md mix-blend-normal group-hover:mix-blend-luminosity"
              />
              
                <i
                  class="cursor-pointer fa-2xl fa-regular fa-heart text-white absolute left-[40%] top-1/2 invisible group-hover:visible"
                ></i>
              
                <i
                  class="cursor-pointer fa-2xl fa-solid fa-heart text-red-500 absolute left-[40%] top-1/2 hidden invisible group-hover:visible"
                ></i>
              <p
                class="rated px-1 absolute bottom-2 left-2 bg-green-200 text-black rounded-md text-sm font-mono group-hover:blur-sm"
              >
                PG-13
              </p>
            </div>
            <div
              class="flex flex-col text-slate-200 group-hover:text-white px-1"
            >
              <h3 class="mb-1 cursor-pointer text-lg font-semibold text-center">${
                movie.Title.length > 15
                  ? movie.Title.substring(0, 15) + "..."
                  : movie.Title
              }</h3>
              <div class="flex justify-evenly items-center">
                <span>${movie.Type}</span>
                <span
                  class="dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5"
                ></span>
                <span>${movie.Year.substring(0, 4)}</span>
                
              </div>
            </div>
          
  `.trim();
  gridDiv?.append(colDiv);

  const movieTitle = document.querySelector(`#movie-${movie.imdbID} h3`);
  const lightIconRegular = document.querySelector(
    `#movie-${movie.imdbID} .fa-regular`
  );
  const lightIconSolid = document.querySelector(
    `#movie-${movie.imdbID} .fa-solid`
  );
  // show liked icon if movie is in favMovies list
  if (favMovies.includes(movie.imdbID)) {
    lightIconRegular?.classList.add("hidden");
    lightIconSolid?.classList.remove("hidden");
  }
  movieTitle?.addEventListener("click", () => {
    localStorage.setItem(LocalStorageKeys.movieId, movie.imdbID);
    localStorage.setItem(LocalStorageKeys.favList, JSON.stringify(favMovies));
    window.location.assign("./movie/movie.html");
  });

  lightIconRegular?.addEventListener("click", () => {
    // put to fav list
    favMovies.push(movie.imdbID);
    lightIconRegular.classList.add("hidden");
    lightIconSolid?.classList.remove("hidden");
  });

  lightIconSolid?.addEventListener("click", () => {
    // remove from fav list
    favMovies = favMovies.filter((m) => m != movie.imdbID);
    lightIconRegular?.classList.remove("hidden");
    lightIconSolid.classList.add("hidden");
  });
};

const fetchMovies = async (searchText: string) => {
  const url = new URL(omdbURL);
  url.searchParams.set("apikey", API_KEY);
  url.searchParams.set("s", searchText);
  console.log(url);
  try {
    const response = await fetch(url);
    const data: OMDBResponse = await response.json();
    // console.log(data);
    return data.Search;
  } catch (e) {
    console.log(e);
  }
};

// const fetchData = async () => {
//   const response = await fetch("apikey=s=hello&type=movie&page=3");
//   const data = await response.json();

//   console.log(data);
// };

// fetchData();
