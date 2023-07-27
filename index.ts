const searchTerm = <HTMLInputElement>document.querySelector("#search");

const omdbURL = "https://www.omdbapi.com/";
const API_KEY = "9e0f94a9";

let favMovies = [];
let currMovies = [];

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

searchTerm.addEventListener("keyup", async () => {
  let searchText = searchTerm.value;
  if (searchText === "" || !searchText) {
    currMovies = [];
    console.log("Empty");
    return;
  }
  currMovies = (await fetchMovies(searchText)) || [];
  currMovies.forEach((e) => addMovies(e));
  console.log("Current movies", currMovies);
});

const addMovies = (movie: OMDBResponseSearchObject) => {
  const gridDiv = document.querySelector(".grid");
  const colDiv = document.createElement("div");
  colDiv.classList.add("movie");
  colDiv.innerHTML = `
          <div class="group border-zinc-700 border-solid border rounded-md">
          <div class="card rounded">
            <div class="flex text-slate-300 flex-col">
              <div class="img-wrap relative">
                <img
                  src="${movie.Poster}"
                  alt=""
                  class="hover:blur-sm peer-hover:blur-sm"
                />
                <a class="" href="">
                  <i
                    class="fa-2xl fa-solid fa-info text-white absolute left-1/2 top-1/2 invisible group-hover:visible"
                  ></i>
                </a>
                <p
                  class="rated px-1 absolute bottom-2 left-2 bg-green-200 text-black rounded-md text-sm font-mono"
                >
                  ${movie.Year}
                </p>
              </div>
            </div>
          </div>
          <div
            class="card-content px-1.5 bg-zinc-700 text-slate-200 group-hover:text-white"
          >
            <h4 class="text-lg font-semibold">${movie.Title}</h4>
            <div class="details flex justify-between items-center">
              <span>${movie.Type}</span>
              <span
                class="dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5"
              ></span>
              <span>${movie.imdbID}</span>
              <span
                class="dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5"
              ></span>
              <span>115m</span>
            </div>
          </div>
        </div>
  `;
  gridDiv?.append(colDiv);
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
