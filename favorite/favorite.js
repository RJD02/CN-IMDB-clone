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
var gridDiv = document.querySelector(".grid");
var ELocalStorageKeys;
(function (ELocalStorageKeys) {
    ELocalStorageKeys["favList"] = "favList";
    ELocalStorageKeys["movieId"] = "movieId";
})(ELocalStorageKeys || (ELocalStorageKeys = {}));
var favMovieList = [];
var localStorageFavList = localStorage.getItem(ELocalStorageKeys.favList);
if (localStorageFavList != undefined && localStorageFavList != null)
    favMovieList = JSON.parse(localStorageFavList);
var getMovie = function (movieId) { return __awaiter(_this, void 0, void 0, function () {
    var omdbURL, API_KEY, url, response, data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                omdbURL = "https://www.omdbapi.com/";
                API_KEY = "9e0f94a9";
                url = new URL(omdbURL);
                url.searchParams.set("i", movieId);
                url.searchParams.set("apikey", API_KEY);
                url.searchParams.set("plot", "full");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(url)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/, data];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var addFavMovies = function (movie) { return __awaiter(_this, void 0, void 0, function () {
    var movieDetails_1, colDiv, movieTitle, lightIconRegular_1, lightIconSolid_1, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getMovie(movie)];
            case 1:
                movieDetails_1 = _a.sent();
                console.log(movieDetails_1);
                colDiv = document.createElement("div");
                colDiv.classList.add("movie");
                colDiv.classList.add("group");
                colDiv.classList.add("bg-zinc-700");
                colDiv.id = "movie-".concat(movieDetails_1.imdbID);
                console.log(colDiv.id);
                colDiv.innerHTML = "\n          \n            <div class=\"max-h-full relative flex flex-1\">\n              <img\n                src=".concat(movieDetails_1.Poster, "\n                alt=\"\"\n                class=\"group-hover:blur-md mix-blend-normal group-hover:mix-blend-luminosity\"\n              />\n              \n                <i\n                  class=\"cursor-pointer fa-2xl fa-regular fa-heart text-white absolute left-[40%] top-1/2 invisible group-hover:visible\"\n                ></i>\n              \n                <i\n                  class=\"cursor-pointer fa-2xl fa-solid fa-heart text-red-500 absolute left-[40%] top-1/2 hidden invisible group-hover:visible\"\n                ></i>\n              <p\n                class=\"rated px-1 absolute bottom-2 left-2 bg-green-200 text-black rounded-md text-sm font-mono group-hover:blur-sm\"\n              >\n                PG-13\n              </p>\n            </div>\n            <div\n              class=\"flex flex-col text-slate-200 group-hover:text-white px-1\"\n            >\n              <h3 class=\"mb-1 cursor-pointer text-lg font-semibold text-center\">").concat(movieDetails_1.Title.length > 15
                    ? movieDetails_1.Title.substring(0, 15) + "..."
                    : movieDetails_1.Title, "</h3>\n              <div class=\"flex justify-evenly items-center\">\n                <span>").concat(movieDetails_1.Type, "</span>\n                <span\n                  class=\"dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5\"\n                ></span>\n                <span>").concat(movieDetails_1.Year.substring(0, 4), "</span>\n                <span\n                  class=\"dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5\"\n                ></span>\n                <span>").concat(movieDetails_1.Runtime, "</span>\n              </div>\n            </div>\n  ").trim();
                gridDiv === null || gridDiv === void 0 ? void 0 : gridDiv.append(colDiv);
                movieTitle = document.querySelector("#movie-".concat(movieDetails_1.imdbID, " h3"));
                lightIconRegular_1 = document.querySelector("#movie-".concat(movieDetails_1.imdbID, " .fa-regular"));
                lightIconSolid_1 = document.querySelector("#movie-".concat(movieDetails_1.imdbID, " .fa-solid"));
                lightIconRegular_1 === null || lightIconRegular_1 === void 0 ? void 0 : lightIconRegular_1.classList.add("hidden");
                lightIconSolid_1 === null || lightIconSolid_1 === void 0 ? void 0 : lightIconSolid_1.classList.remove("hidden");
                movieTitle === null || movieTitle === void 0 ? void 0 : movieTitle.addEventListener("click", function () {
                    localStorage.setItem(ELocalStorageKeys.movieId, movieDetails_1.imdbID);
                    window.location.assign("../movie/movie.html");
                });
                lightIconRegular_1 === null || lightIconRegular_1 === void 0 ? void 0 : lightIconRegular_1.addEventListener("click", function () {
                    favMovieList.push(movieDetails_1.imdbID);
                    lightIconRegular_1.classList.add("hidden");
                    lightIconSolid_1 === null || lightIconSolid_1 === void 0 ? void 0 : lightIconSolid_1.classList.remove("hidden");
                });
                lightIconSolid_1 === null || lightIconSolid_1 === void 0 ? void 0 : lightIconSolid_1.addEventListener("click", function () {
                    favMovieList = favMovieList.filter(function (m) { return m != movieDetails_1.imdbID; });
                    lightIconRegular_1 === null || lightIconRegular_1 === void 0 ? void 0 : lightIconRegular_1.classList.remove("hidden");
                    lightIconSolid_1.classList.add("hidden");
                });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
window.addEventListener("beforeunload", function () {
    localStorage.setItem(ELocalStorageKeys.favList, JSON.stringify(favMovieList));
});
favMovieList.forEach(function (movie) {
    addFavMovies(movie);
});
