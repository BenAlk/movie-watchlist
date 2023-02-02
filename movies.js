const movieContainerEl = document.getElementById("movies-container")
const moviesWatchlistEl = document.getElementById("movies-list")
let localMovieArray = []
let addMovieArray = []
let removeMovieArray = []
import {darkImg, darkLoader, searchInput} from "./darkmode.js"

/*------------Check Local Storage-------------*/

function checkLocalStorage() {
let moviesFromLocalStorage =  JSON.parse(localStorage.getItem("movies"))
    if (moviesFromLocalStorage) {
        addMovieArray = moviesFromLocalStorage
        removeMovieArray = moviesFromLocalStorage
    }
}

function checkAlreadyAdded(id) {
    checkLocalStorage()
    let idExists = addMovieArray.find(movie => movie.id === id)
    if (idExists) {
        return true
    } else {
        return false
    }
}

/*------------Push/Pull from arrays-------------*/


function pushToWatchlist(id) {  
    checkLocalStorage();
    const addMovie = localMovieArray.filter(movie => {
        return movie.id === id
    })
    addMovieArray.push(addMovie[0])
    localStorage.setItem("movies", JSON.stringify(addMovieArray))
}

function removeFromWatchlist(id) {
    checkLocalStorage();
    if(removeMovieArray.length > 1){
        let removeMovie = removeMovieArray.findIndex(movie => movie.id === id)
        if (removeMovie > -1) {
            removeMovieArray.splice(removeMovie, 1)
        }
        localStorage.setItem("movies", JSON.stringify(removeMovieArray))
        renderWatchlist()
    } else {
        localStorage.clear()
        placeholder()            
    }
    renderWatchlist()
}  

/*-----------------Fetch API -----------------*/


async function movieSearch(movie) {
    
    if (!movie) {
        searchInput.placeholder = "You need to enter a movie to search!"
    } else {
            loading()
        try {
            const res = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=e318034b`)
            if (!res.ok) {
                throw new Error(`Request to the server failed, please try again.`)
            }
            const data = await res.json()
            if (!data.Search) {
                throw new Error(`No movies found with the search term "${movie}"`)
            }
            const movieIdArray = data.Search.map(movie => movie.imdbID)
            const displaySearchArray = await getMovieById(movieIdArray)
            render(displaySearchArray)
        } catch (error) {
            errorHandle(error)
        }
    }
}

async function getMovieById(movieArray) {
    const displaySearchArray = []
    for (const movie of movieArray) {
        try {
            const res = await fetch(`https://www.omdbapi.com/?i=${movie}&apikey=e318034b`)
            if (!res.ok) {
                throw new Error(`Request to the server failed, please try again.`)
            }
            const data = await res.json()
            displaySearchArray.push(data)
        } catch (error) {
            errorHandle(error)
        }
    }
    return displaySearchArray
}

/*-----------------API Error Handling------------------*/
function errorHandle(error) {
    movieContainerEl.innerHTML = `
    <div class="background-placeholder">
        <img src="images/film-icon.png" alt="movie area placeholder image">
        <p id="main-message">${error}</p>
    </div>`
    document.getElementById("main-message").style.color = "red"
}

/*----------------Render Movie Functions------------------*/

function render(array){
    movieContainerEl.innerHTML = ""
    array.forEach(movie => {
        const movieObj = {
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster,
            rating: movie.imdbRating,
            runtime: movie.Runtime,
            genre: movie.Genre,
            plot: movie.Plot,
        }
        localMovieArray.push(movieObj)
        if (!checkAlreadyAdded(movie.imdbID)) {
            movieContainerEl.innerHTML += `
            <div class="movie-wrapper" id="movie-wrapper-${movie.imdbID}"> 
                <div class="img-wrapper">
                    <a href="https://www.imdb.com/title/${movie.imdbID}"><img id="movie-poster" src="${movie.Poster}" alt=""/></a>
                </div>
                <div class="movie-details">
                    <div class="title-wrapper">
                        <h3 class="title">${movie.Title}</h3>
                        <div class="rating-wrapper">
                            <img class="rating-img" src="/images/rating.png" alt=""><p></p>
                            <p class="rating">${movie.imdbRating}</p>
                        </div>
                    </div>
                    <div class="movie-info">
                    <div class="movie-info-extended">
                        <p class="runtime">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                    </div>
                        <div class="add-watchlist" id="add-watch-container-${movie.imdbID}">
                            <img class="${darkImg()}" src="/images/add.png" data-add-watch-list="${movie.imdbID}" alt="">
                            <p class="watchlist">Watchlist</p>
                        </div>
                        </div>` + readMore(movie.Plot, movie.imdbID)
        } else {
            movieContainerEl.innerHTML += `
            <div class="movie-wrapper" id="movie-wrapper-${movie.imdbID}"> 
                <div class="img-wrapper">
                    <a href="https://www.imdb.com/title/${movie.imdbID}"><img id="movie-poster" src="${movie.Poster}" alt=""/></a>
                </div>
                <div class="movie-details">
                    <div class="title-wrapper">
                        <h3 class="title">${movie.Title}</h3>
                        <div class="rating-wrapper">
                            <img class="rating-img" src="/images/rating.png" alt=""><p></p>
                            <p class="rating">${movie.imdbRating}</p>
                        </div>
                    </div>
                    <div class="movie-info">
                        <div class="movie-info-extended">
                            <p class="runtime">${movie.Runtime}</p>
                            <p class="genre">${movie.Genre}</p>
                        </div>
                        <div class="add-watchlist" id="add-watch-container-${movie.imdbID}">
                            <p class="watchlist">On Watchlist</p>
                        </div>
                    </div>` + readMore(movie.Plot, movie.imdbID)
        }
            
    });
}

function renderWatchlist() {
    let savedMovieList = JSON.parse(localStorage.getItem("movies"))
    if (savedMovieList) {
        moviesWatchlistEl.innerHTML = ""
        savedMovieList.forEach(movie => {
            moviesWatchlistEl.innerHTML += `
    <div class="movie-wrapper" id="movie-wrapper-${movie.id}"> 
        <div class="img-wrapper">
            <a href="https://www.imdb.com/title/${movie.id}"><img id="movie-poster" src="${movie.poster}" alt=""/></a>
        </div>
        <div class="movie-details">
            <div class="title-wrapper">
                <h3 class="title">${movie.title}</h3>
                <div class="rating-wrapper">
                    <img class="rating-img" src="/images/rating.png" alt=""><p></p>
                    <p class="rating">${movie.rating}</p>
                </div>
            </div>
            <div class="movie-info">
                <div class="movie-info-extended">
                    <p class="runtime">${movie.runtime}</p>
                    <p class="genre">${movie.genre}</p>
                </div>
                <div class="remove-watchlist" id="add-watch-container-${movie.id}">
                    <img class="modifier" src="/images/minus.png" data-add-watch-list="${movie.id}" alt="">
                    <p class="watchlist">Remove</p>
                </div>
                    </div>` + readMore(movie.plot, movie.id)
    
            }
        )
        } else {
            placeholder()
        }
    }

function readMore(plot, id) {
    if (plot.split(' ').length > 28) {
        let plotPreview = plot.substring(0, 100) + "...";
        return `<div id="plot-container-${id}">
                        <p id="id-full-plot-${id}" class="plot hidden">${plot}</p>
                        <p id="id-preview-plot-${id}" class="plot-preview">${plotPreview}<span class="read-more" data-read-more="${id}">Read More</span></p>
                        
                    </div>
                </div>
            </div>`
    }
    else {
        return `
        <div>
            <p class="plot">${plot}</p>
        </div>
    </div>
</div>`
    }

}

function placeholder() {
    moviesWatchlistEl.innerHTML =""
    moviesWatchlistEl.innerHTML = `
    <div class="background-placeholder">
        <img src="images/film-icon.png" alt="movie area placeholder image">
        <p>Watchlist Empty</p>
    </div>`
}

function loading() {
    movieContainerEl.innerHTML = ""
    movieContainerEl.innerHTML = `
    <div class="background-placeholder">
        <img class="${darkLoader()}" src="images/loading.gif" alt="movie area placeholder image">
    </div>`
}

export {pushToWatchlist, movieSearch, renderWatchlist, removeFromWatchlist}