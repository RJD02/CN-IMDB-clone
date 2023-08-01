const gridDiv = document.querySelector(".grid");
enum ELocalStorageKeys {
  favList = "favList",
  movieId = "movieId",
}
let favMovieList: string[] = [];
const localStorageFavList = localStorage.getItem(ELocalStorageKeys.favList);
if (localStorageFavList != undefined && localStorageFavList != null)
  favMovieList = JSON.parse(localStorageFavList);

const getMovie = async (movieId: string) => {
  const omdbURL = "https://www.omdbapi.com/";
  const API_KEY = "9e0f94a9";
  const url = new URL(omdbURL);
  url.searchParams.set("i", movieId);
  url.searchParams.set("apikey", API_KEY);
  url.searchParams.set("plot", "full");
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
interface OMDBRating {
  Source: string;
  Value: string;
}

interface OMDBSearchByIdResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OMDBRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

const addFavMovies = async (movie: string) => {
  try {
    const movieDetails: OMDBSearchByIdResponse = await getMovie(movie);
    console.log(movieDetails);
    const colDiv = document.createElement("div");
    colDiv.classList.add("movie");
    colDiv.classList.add("group");
    colDiv.classList.add("bg-zinc-700");
    colDiv.id = `movie-${movieDetails.imdbID}`;
    console.log(colDiv.id);
    colDiv.innerHTML = `
          
            <div class="max-h-full relative flex flex-1">
              <img
                src=${movieDetails.Poster}
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
                movieDetails.Title.length > 15
                  ? movieDetails.Title.substring(0, 15) + "..."
                  : movieDetails.Title
              }</h3>
              <div class="flex justify-evenly items-center">
                <span>${movieDetails.Type}</span>
                <span
                  class="dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5"
                ></span>
                <span>${movieDetails.Year.substring(0, 4)}</span>
                <span
                  class="dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5"
                ></span>
                <span>${movieDetails.Runtime}</span>
              </div>
            </div>
  `.trim();

    gridDiv?.append(colDiv);

    const movieTitle = document.querySelector(
      `#movie-${movieDetails.imdbID} h3`
    );
    const lightIconRegular = document.querySelector(
      `#movie-${movieDetails.imdbID} .fa-regular`
    );
    const lightIconSolid = document.querySelector(
      `#movie-${movieDetails.imdbID} .fa-solid`
    );

    lightIconRegular?.classList.add("hidden");
    lightIconSolid?.classList.remove("hidden");
    movieTitle?.addEventListener("click", () => {
      localStorage.setItem(ELocalStorageKeys.movieId, movieDetails.imdbID);
      window.location.assign("../pages/movie.html");
    });

    lightIconRegular?.addEventListener("click", () => {
      favMovieList.push(movieDetails.imdbID);
      lightIconRegular.classList.add("hidden");
      lightIconSolid?.classList.remove("hidden");
    });

    lightIconSolid?.addEventListener("click", () => {
      favMovieList = favMovieList.filter((m) => m != movieDetails.imdbID);
      lightIconRegular?.classList.remove("hidden");
      lightIconSolid.classList.add("hidden");
    });
  } catch (e) {
    console.log(e);
  }
};

window.addEventListener("beforeunload", () => {
  localStorage.setItem(ELocalStorageKeys.favList, JSON.stringify(favMovieList));
});

favMovieList.forEach((movie) => {
  addFavMovies(movie);
});
