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
// getMovieById returns a OMDBSearchByIdResponse type of object
const getMovieById = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const omdbURL = "https://www.omdbapi.com/";
    const API_KEY = "9e0f94a9";
    const url = new URL(omdbURL);
    url.searchParams.set("i", movieId);
    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("plot", "full");
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        return data;
    }
    catch (e) {
        console.log(e);
    }
});
// showDetails updates the UI and removes the added UI once user leaves the page
const showDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = localStorage.getItem("movieId");
    console.log(movieId);
    if (movieId == null || movieId == undefined) {
        console.log("No movieId found from local storage");
        const warningText = document.querySelector(".warning");
        if (!warningText)
            return;
        warningText.classList.remove("invisible");
        warningText.textContent =
            "Hey, seems like you cleared local storage. We can't have 2 developers here, aight?";
        return;
    }
    try {
        const movie = yield getMovieById(movieId);
        if (!movie)
            return;
        const movieDetailDiv = document.createElement("div");
        movieDetailDiv.classList.add("movie-details");
        movieDetailDiv.classList.add("mt-4");
        movieDetailDiv.innerHTML = `
          <div class="rounded-md border-solid">
            <div class="flex p-2 flex-col lg:flex-row justify-center">
              <div class="img-wrapper w-full lg:w-fit min-h-full">
                <img
                  src=${movie.Poster} alt="Movie Image"
                  class="m-auto"
                />
              </div>
              <div class="details ml-10 flex flex-col lg:mt-0 mt-8">
                <h1 class="font-semibold text-5xl">${movie.Title}(${movie.Year.substring(0, 4)})</h1>

                <div class="flex justify-start items-center mt-8">
                  <span
                    class="bg-green-200 font-mono text-black rounded-sm p-0.5 border-green-200 border-solid rated"
                    >${movie.Rated}</span
                  >
                  <span
                    class="dot w-1 h-1 rounded bg-stone-400 inline-block mx-3 mt-0.5 language"
                  ></span>
                  <span>${movie.Language.split(",")[0]}</span>
                  <span
                    class="dot w-1 h-1 rounded bg-stone-400 inline-block mx-3 mt-0.5 type"
                  ></span>
                  <span>${movie.Type}</span>
                  <span
                    class="dot w-1 h-1 rounded bg-stone-400 inline-block mx-3 mt-0.5"
                  ></span>
                  <span>${movie.Runtime}</span>
                </div>
                <div class="cta-btn flex mt-8 items-center">
                  <button
                    class="flex items-center rounded-full hover:bg-amber-600 bg-amber-500 px-5 py-3 mr-3 text-base text-gray-100"
                  >
                  <i class="fa-solid fa-play fa-lg mr-1"></i>
                    <span>Watch now</span>
                  </button>
                  <button
                    class="flex fav-btn items-center rounded-full hover:bg-slate-200 bg-white text-black px-2 py-3 text-base"
                  >
                  <span><i class="fa-solid fa-plus fa-lg mr-1"></i></span>
                   <span>Add to Favorites</span> 
                  </button>
                </div>
                <div class="plot mt-8">
                  <p>
                    ${movie.Plot}
                  </p>
                  <p class="mt-4">
                    This is the best site to watch ${movie.Title}(${movie.Year}) SUB online, or you
                    can even watch ${movie.Title}(${movie.Year}) DUB in HD quality. You can also
                    find movies on this website
                  </p>
                </div>
                <div class="directors mt-8">
                  <p>
                    Directors:
                    <span class="text-blue-300 font-semibold"
                      >${movie.Director}</span
                    >
                  </p>
                  <p class="mt-1">
                    Actors:
                    <span class="text-lime-200 font-semibold"
                      >${movie.Actors}</span
                    >
                  </p>
                  <p class="mt-1">
                    Writers:
                    <span class="text-emerald-200 font-semibold"
                      >${movie.Writer}</span
                    >
                  </p>
                  <p class="mt-1">
                    Released:
                    <span class="text-cyan-300 font-semibold"
                      >${movie.Released}</span
                    >
                  </p>
                  <p class="mt-1">
                    Languages:
                    <span class="text-indigo-300 font-semibold"
                      >${movie.Language}</span
                    >
                  </p>
                  <p class="mt-1">
                    Imdb Rating:
                    <span class="text-purple-300 font-semibold">${movie.imdbRating}</span>
                  </p>
                  <p class="mt-1">Genre: <span class="text-neutral-200 font-semibold">${movie.Genre}</span></p>
                </div>
              </div>
            </div>
          </div>
        `.trim();
        const containerDiv = document.querySelector(".container");
        // add to the UI
        containerDiv === null || containerDiv === void 0 ? void 0 : containerDiv.append(movieDetailDiv);
        const loadingDiv = document.querySelector(".loading");
        const addToFavBtn = document.querySelector(".fav-btn");
        console.log(addToFavBtn);
        addToFavBtn === null || addToFavBtn === void 0 ? void 0 : addToFavBtn.addEventListener("click", () => {
            // get favList from local storage
            const jsonFavlist = localStorage.getItem("favList");
            if (jsonFavlist == null || jsonFavlist == undefined)
                return;
            let favMovieList = JSON.parse(jsonFavlist);
            console.log(favMovieList);
            favMovieList.push(movie.imdbID);
            // remove duplicates when putting into local storage
            favMovieList = favMovieList.filter((it, id) => favMovieList.indexOf(it) === id);
            localStorage.setItem("favList", JSON.stringify(favMovieList));
        });
        // stop showing loading state as data is fetched
        loadingDiv === null || loadingDiv === void 0 ? void 0 : loadingDiv.classList.add("invisible");
        // make sure the element gets cleared before leaving
        window.addEventListener("beforeunload", () => {
            movieDetailDiv.remove();
        });
    }
    catch (e) {
        console.log(e);
    }
});
showDetails();
