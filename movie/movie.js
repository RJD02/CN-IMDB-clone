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
var getMovieById = function (movieId) { return __awaiter(_this, void 0, void 0, function () {
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
                return [2 /*return*/, data];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var showDetails = function () { return __awaiter(_this, void 0, void 0, function () {
    var movieId, movie, movieDetailDiv_1, containerDiv, loadingDiv, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movieId = localStorage.getItem("movieId");
                console.log(movieId);
                if (movieId == null || movieId == undefined)
                    return [2 /*return*/];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getMovieById(movieId)];
            case 2:
                movie = _a.sent();
                if (!movie)
                    return [2 /*return*/];
                movieDetailDiv_1 = document.createElement("div");
                movieDetailDiv_1.classList.add("movie-details");
                movieDetailDiv_1.classList.add("mt-4");
                movieDetailDiv_1.innerHTML = "\n          <div class=\"rounded-md border-solid\">\n            <div class=\"flex p-2 flex-col lg:flex-row justify-center\">\n              <div class=\"img-wrapper w-full lg:w-fit min-h-full\">\n                <img\n                  src=".concat(movie.Poster, " alt=\"Movie Image\"\n                  class=\"m-auto\"\n                />\n              </div>\n              <div class=\"details ml-10 flex flex-col lg:mt-0 mt-8\">\n                <h1 class=\"font-semibold text-5xl\">").concat(movie.Title, "(").concat(movie.Year.substring(0, 4), ")</h1>\n\n                <div class=\"flex justify-start items-center mt-8\">\n                  <span\n                    class=\"bg-green-200 font-mono text-black rounded-sm p-0.5 border-green-200 border-solid rated\"\n                    >").concat(movie.Rated, "</span\n                  >\n                  <span\n                    class=\"dot w-1 h-1 rounded bg-stone-400 inline-block mx-3 mt-0.5 language\"\n                  ></span>\n                  <span>").concat(movie.Language.split(",")[0], "</span>\n                  <span\n                    class=\"dot w-1 h-1 rounded bg-stone-400 inline-block mx-3 mt-0.5 type\"\n                  ></span>\n                  <span>").concat(movie.Type, "</span>\n                  <span\n                    class=\"dot w-1 h-1 rounded bg-stone-400 inline-block mx-3 mt-0.5\"\n                  ></span>\n                  <span>").concat(movie.Runtime, "</span>\n                </div>\n                <div class=\"cta-btn flex mt-8 items-center\">\n                  <button\n                    class=\"rounded-md bg-amber-500 px-2 py-1 mr-3 text-xl\"\n                  >\n                    Watch now\n                  </button>\n                  <button\n                    class=\"rounded-sm bg-white text-black px-2 py-1 text-xl\"\n                  >\n                    Add to List\n                  </button>\n                </div>\n                <div class=\"plot mt-8\">\n                  <p>\n                    ").concat(movie.Plot, "\n                  </p>\n                  <p class=\"mt-4\">\n                    This is the best site to watch ").concat(movie.Title, "(").concat(movie.Year, ") SUB online, or you\n                    can even watch ").concat(movie.Title, "(").concat(movie.Year, ") DUB in HD quality. You can also\n                    find movies on this website\n                  </p>\n                </div>\n                <div class=\"directors mt-8\">\n                  <p>\n                    Directors:\n                    <span class=\"text-blue-300 font-semibold\"\n                      >").concat(movie.Director, "</span\n                    >\n                  </p>\n                  <p class=\"mt-1\">\n                    Actors:\n                    <span class=\"text-lime-200 font-semibold\"\n                      >").concat(movie.Actors, "</span\n                    >\n                  </p>\n                  <p class=\"mt-1\">\n                    Writers:\n                    <span class=\"text-emerald-200 font-semibold\"\n                      >").concat(movie.Writer, "</span\n                    >\n                  </p>\n                  <p class=\"mt-1\">\n                    Released:\n                    <span class=\"text-cyan-300 font-semibold\"\n                      >").concat(movie.Released, "</span\n                    >\n                  </p>\n                  <p class=\"mt-1\">\n                    Languages:\n                    <span class=\"text-indigo-300 font-semibold\"\n                      >").concat(movie.Language, "</span\n                    >\n                  </p>\n                  <p class=\"mt-1\">\n                    Imdb Rating:\n                    <span class=\"text-purple-300 font-semibold\">").concat(movie.imdbRating, "</span>\n                  </p>\n                  <p class=\"mt-1\">Genre: <span class=\"text-neutral-200 font-semibold\">").concat(movie.Genre, "</span></p>\n                </div>\n              </div>\n            </div>\n          </div>\n        ").trim();
                containerDiv = document.querySelector(".container");
                loadingDiv = document.querySelector(".loading");
                containerDiv === null || containerDiv === void 0 ? void 0 : containerDiv.append(movieDetailDiv_1);
                loadingDiv === null || loadingDiv === void 0 ? void 0 : loadingDiv.classList.add("invisible");
                window.addEventListener("beforeunload", function () {
                    movieDetailDiv_1.remove();
                });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
showDetails();
