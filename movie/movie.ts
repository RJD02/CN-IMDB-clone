const getMovieById = async (movieId: string) => {
  const omdbURL = "https://www.omdbapi.com/";
  const API_KEY = "9e0f94a9";
  const url = new URL(omdbURL);
  url.searchParams.set("i", movieId);
  url.searchParams.set("apikey", API_KEY);
  url.searchParams.set("plot", "full");
  try {
    const response = await fetch(url);
    const data = await response.json();
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

const showDetails = async () => {
  const movieId = localStorage.getItem("movieId");
  console.log(movieId);
  if (movieId == null || movieId == undefined) {
    console.log("No movieId found from local storage");
    const warningText = document.querySelector(".warning");
    if (!warningText) return;
    warningText.classList.remove("invisible");
    warningText.textContent =
      "Hey, seems like you cleared local storage. We can't have 2 developers here, aight?";
    return;
  }
  try {
    const movie: OMDBSearchByIdResponse = await getMovieById(movieId);
    if (!movie) return;
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
                <h1 class="font-semibold text-5xl">${
                  movie.Title
                }(${movie.Year.substring(0, 4)})</h1>

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
                    This is the best site to watch ${movie.Title}(${
      movie.Year
    }) SUB online, or you
                    can even watch ${movie.Title}(${
      movie.Year
    }) DUB in HD quality. You can also
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
                    <span class="text-purple-300 font-semibold">${
                      movie.imdbRating
                    }</span>
                  </p>
                  <p class="mt-1">Genre: <span class="text-neutral-200 font-semibold">${
                    movie.Genre
                  }</span></p>
                </div>
              </div>
            </div>
          </div>
        `.trim();
    const containerDiv = document.querySelector(".container");
    containerDiv?.append(movieDetailDiv);
    const loadingDiv = document.querySelector(".loading");
    const addToFavBtn = document.querySelector(".fav-btn");
    console.log(addToFavBtn);
    addToFavBtn?.addEventListener("click", () => {
      const jsonFavlist = localStorage.getItem("favList");
      if (jsonFavlist == null || jsonFavlist == undefined) return;
      const favMovieList: string[] = JSON.parse(jsonFavlist);
      console.log(favMovieList);
      favMovieList.push(movie.imdbID);

      localStorage.setItem("favList", JSON.stringify(favMovieList));
    });
    loadingDiv?.classList.add("invisible");

    window.addEventListener("beforeunload", () => {
      movieDetailDiv.remove();
    });
  } catch (e) {
    console.log(e);
  }
};

showDetails();
