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
var currMovies = [];
searchTerm.addEventListener("keyup", function () { return __awaiter(_this, void 0, void 0, function () {
    var searchText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchText = searchTerm.value;
                if (searchText === "" || !searchText) {
                    currMovies = [];
                    console.log("Empty");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fetchMovies(searchText)];
            case 1:
                currMovies = (_a.sent()) || [];
                currMovies.forEach(function (e) { return addMovies(e); });
                console.log("Current movies", currMovies);
                return [2 /*return*/];
        }
    });
}); });
var addMovies = function (movie) {
    var gridDiv = document.querySelector(".grid");
    var colDiv = document.createElement("div");
    colDiv.classList.add("movie");
    colDiv.innerHTML = "\n          <div class=\"group border-zinc-700 border-solid border rounded-md\">\n          <div class=\"card rounded\">\n            <div class=\"flex text-slate-300 flex-col\">\n              <div class=\"img-wrap relative\">\n                <img\n                  src=\"".concat(movie.Poster, "\"\n                  alt=\"\"\n                  class=\"hover:blur-sm peer-hover:blur-sm\"\n                />\n                <a class=\"\" href=\"\">\n                  <i\n                    class=\"fa-2xl fa-solid fa-info text-white absolute left-1/2 top-1/2 invisible group-hover:visible\"\n                  ></i>\n                </a>\n                <p\n                  class=\"rated px-1 absolute bottom-2 left-2 bg-green-200 text-black rounded-md text-sm font-mono\"\n                >\n                  ").concat(movie.Year, "\n                </p>\n              </div>\n            </div>\n          </div>\n          <div\n            class=\"card-content px-1.5 bg-zinc-700 text-slate-200 group-hover:text-white\"\n          >\n            <h4 class=\"text-lg font-semibold\">").concat(movie.Title, "</h4>\n            <div class=\"details flex justify-between items-center\">\n              <span>").concat(movie.Type, "</span>\n              <span\n                class=\"dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5\"\n              ></span>\n              <span>").concat(movie.imdbID, "</span>\n              <span\n                class=\"dot w-1 h-1 rounded bg-stone-400 inline-block mx-1.5 mt-0.5\"\n              ></span>\n              <span>115m</span>\n            </div>\n          </div>\n        </div>\n  ");
    gridDiv === null || gridDiv === void 0 ? void 0 : gridDiv.append(colDiv);
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
