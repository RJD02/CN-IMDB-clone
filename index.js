var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var searchTerm = document.querySelector("#search");
var omdbURL = "https://www.omdbapi.com/";
var API_KEY = "9e0f94a9";
var favMovies = [];
var favListFromLocalStorage = localStorage.getItem("favList");
if (favListFromLocalStorage != null && favListFromLocalStorage != undefined)
    favMovies = JSON.parse(favListFromLocalStorage);
var currMovies = [];
var id = 1;
window.addEventListener("beforeunload", function () {
    localStorage.setItem("favList", JSON.stringify(favMovies));
});
searchTerm.addEventListener("input", function () { return __awaiter(_this, void 0, void 0, function () {
    var searchText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchText = searchTerm.value;
                if (!searchText) {
                    console.log("Empty");
                    return [2 /*return*/];
                }
                if (searchText[searchText.length - 1] != " ")
                    deleteAllMovies();
                return [4 /*yield*/, fetchMovies(searchText)];
            case 1:
                currMovies = (_a.sent()) || [];
                currMovies = currMovies.filter(function (m) { return m.Poster != "N/A"; });
                currMovies.forEach(function (e) { return addMovies(e); });
                console.log("Current movies", currMovies);
                return [2 /*return*/];
        }
    });
}); });
var deleteAllMovies = function () { return __awaiter(_this, void 0, void 0, function () {
    var movieDivs;
    return __generator(this, function (_a) {
        console.log("Deleting all movies");
        movieDivs = document.querySelectorAll(".movie");
        if (movieDivs) {
            movieDivs.forEach(function (e) { return e.remove(); });
        }
        return [2 /*return*/];
    });
}); };
var addMovies = function (movie) {
    // check if this movie of this id already exists
    var doesMovieDivExists = document.querySelector("#movie-".concat(movie.imdbID));
    if (doesMovieDivExists)
        return;
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
    var gridDiv = document.querySelector(".grid");
    var colDiv = document.createElement("div");
    colDiv.classList.add("movie");
    colDiv.id = "movie-".concat(movie.imdbID);
    colDiv.classList.add("bg-zinc-700");
    colDiv.classList.add("group");
    colDiv.innerHTML = "\n          \n            <div class=\"max-h-full relative flex flex-1\">\n              <img\n                src=".concat(movie.Poster, "\n                alt=\"\"\n                class=\"group-hover:blur-md\"\n              />\n              \n                <i\n                  class=\"cursor-pointer fa-2xl fa-regular fa-heart text-white absolute left-1/2 top-1/2 invisible group-hover:visible\"\n                ></i>\n              \n                <i\n                  class=\"cursor-pointer fa-2xl fa-solid fa-heart text-white absolute left-1/2 top-1/2 hidden invisible group-hover:visible\"\n                ></i>\n              <p\n                class=\"rated px-1 absolute bottom-2 left-2 bg-green-200 text-black rounded-md text-sm font-mono group-hover:blur-sm\"\n              >\n                PG-13\n              </p>\n            </div>\n            <div\n              class=\"flex flex-col text-slate-200 group-hover:text-white px-1\"\n            >\n              <h3 class=\"mb-1 cursor-pointer text-lg font-semibold text-center\">").concat(movie.Title.length > 15
        ? movie.Title.substring(0, 15) + "..."
        : movie.Title, "</h3>\n              <div class=\"flex justify-evenly items-center\">\n                <span>").concat(movie.Type, "</span>\n                <span\n                  class=\"dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5\"\n                ></span>\n                <span>").concat(movie.Year.substring(0, 4), "</span>\n                \n              </div>\n            </div>\n          \n  ").trim();
    gridDiv === null || gridDiv === void 0 ? void 0 : gridDiv.append(colDiv);
    var movieTitle = document.querySelector("#movie-".concat(movie.imdbID, " h3"));
    var lightIconRegular = document.querySelector("#movie-".concat(movie.imdbID, " .fa-regular"));
    var lightIconSolid = document.querySelector("#movie-".concat(movie.imdbID, " .fa-solid"));
    // show liked icon if movie is in favMovies list
    if (favMovies.includes(movie.imdbID)) {
        lightIconRegular === null || lightIconRegular === void 0 ? void 0 : lightIconRegular.classList.add("hidden");
        lightIconSolid === null || lightIconSolid === void 0 ? void 0 : lightIconSolid.classList.remove("hidden");
    }
    movieTitle === null || movieTitle === void 0 ? void 0 : movieTitle.addEventListener("click", function () {
        localStorage.setItem("movieId", movie.imdbID);
        localStorage.setItem("favList", JSON.stringify(favMovies));
        window.location.assign("/moviePage/movie.html");
    });
    lightIconRegular === null || lightIconRegular === void 0 ? void 0 : lightIconRegular.addEventListener("click", function () {
        // put to fav list
        favMovies.push(movie.imdbID);
        lightIconRegular.classList.add("hidden");
        lightIconSolid === null || lightIconSolid === void 0 ? void 0 : lightIconSolid.classList.remove("hidden");
    });
    lightIconSolid === null || lightIconSolid === void 0 ? void 0 : lightIconSolid.addEventListener("click", function () {
        // remove from fav list
        favMovies = favMovies.filter(function (m) { return m != movie.imdbID; });
        lightIconRegular === null || lightIconRegular === void 0 ? void 0 : lightIconRegular.classList.remove("hidden");
        lightIconSolid.classList.add("hidden");
    });
};
var fetchMovies = function (searchText) { return __awaiter(_this, void 0, void 0, function () {
    var url, response, data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL(omdbURL);
                url.searchParams.set("apikey", API_KEY);
                url.searchParams.set("s", searchText);
                console.log(url);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(url)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                // console.log(data);
                return [2 /*return*/, data.Search];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// const fetchData = async () => {
//   const response = await fetch("apikey=s=hello&type=movie&page=3");
//   const data = await response.json();
//   console.log(data);
// };
// fetchData();
