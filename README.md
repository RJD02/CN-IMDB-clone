# IMDB-clone application
A mini IMDB clone app in which we can search movies based on OMDB API, with search suggestions. Clicking on a particular movie card opens a new movie page for more info. On clicking on the favorite button, we can add a movie to the favorite list which uses local storage and has it's own page.

## Hosetd link: [IMDB-clone](https://rjd02.github.io/CN-IMDB-clone/)

## Tools used:
* HTML
* CSS
* TailwindCSS
* JavaScript and TypeScript(since we need to parse a API request)
* OMDB API

## Functionality
* Search movies with suggestions
* Click on movie card for more info
* Add a movie to the favorite list
* Delete movie from the favorites list

## Data
* favList - an array that contains a list of movie ids stored in local storage
* movieId - a string which contains the movie id of clicked movie

## Pages
1. Index Page - Home page, where we can search the movies. Every movie has the option to added to favorite by hovering and marking as favorite. And the local storage stores the imdbID of all the favorite movies(whose details can be recovered by calling the API). 
2. Favorite Page - A page which contains all your movies which are made favorite. These movie list are restored by querying the local storage, and getting details from API.
3. Movie Detail Page - A page where we can get more details about the movie clicked. We get the movie id from local storage, and then fetch the details.

## Folder structure
* All the pages are stored in the pages directory
* All the typescript source files are stored in src folder
* All the compiled js files are stored in js folder
