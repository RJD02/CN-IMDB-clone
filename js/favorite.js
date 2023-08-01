"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const gridDiv = document.querySelector(".grid");
var ELocalStorageKeys;
(function (ELocalStorageKeys) {
    ELocalStorageKeys["favList"] = "favList";
    ELocalStorageKeys["movieId"] = "movieId";
})(ELocalStorageKeys || (ELocalStorageKeys = {}));
let favMovieList = [];
const localStorageFavList = localStorage.getItem(ELocalStorageKeys.favList);
if (localStorageFavList != undefined && localStorageFavList != null)
    favMovieList = JSON.parse(localStorageFavList);
const getMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const omdbURL = "https://www.omdbapi.com/";
    const API_KEY = "9e0f94a9";
    const url = new URL(omdbURL);
    url.searchParams.set("i", movieId);
    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("plot", "full");
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        console.log(data);
        return data;
    }
    catch (e) {
        console.log(e);
    }
});
const addFavMovies = (movie) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieDetails = yield getMovie(movie);
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
              <h3 class="mb-1 cursor-pointer text-lg font-semibold text-center">${movieDetails.Title.length > 15
            ? movieDetails.Title.substring(0, 15) + "..."
            : movieDetails.Title}</h3>
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
        gridDiv === null || gridDiv === void 0 ? void 0 : gridDiv.append(colDiv);
        const movieTitle = document.querySelector(`#movie-${movieDetails.imdbID} h3`);
        const lightIconRegular = document.querySelector(`#movie-${movieDetails.imdbID} .fa-regular`);
        const lightIconSolid = document.querySelector(`#movie-${movieDetails.imdbID} .fa-solid`);
        lightIconRegular === null || lightIconRegular === void 0 ? void 0 : lightIconRegular.classList.add("hidden");
        lightIconSolid === null || lightIconSolid === void 0 ? void 0 : lightIconSolid.classList.remove("hidden");
        movieTitle === null || movieTitle === void 0 ? void 0 : movieTitle.addEventListener("click", () => {
            localStorage.setItem(ELocalStorageKeys.movieId, movieDetails.imdbID);
            window.location.assign("../pages/movie.html");
        });
        lightIconRegular === null || lightIconRegular === void 0 ? void 0 : lightIconRegular.addEventListener("click", () => {
            favMovieList.push(movieDetails.imdbID);
            lightIconRegular.classList.add("hidden");
            lightIconSolid === null || lightIconSolid === void 0 ? void 0 : lightIconSolid.classList.remove("hidden");
        });
        lightIconSolid === null || lightIconSolid === void 0 ? void 0 : lightIconSolid.addEventListener("click", () => {
            favMovieList = favMovieList.filter((m) => m != movieDetails.imdbID);
            lightIconRegular === null || lightIconRegular === void 0 ? void 0 : lightIconRegular.classList.remove("hidden");
            lightIconSolid.classList.add("hidden");
        });
    }
    catch (e) {
        console.log(e);
    }
});
window.addEventListener("beforeunload", () => {
    localStorage.setItem(ELocalStorageKeys.favList, JSON.stringify(favMovieList));
});
favMovieList.forEach((movie) => {
    addFavMovies(movie);
});
