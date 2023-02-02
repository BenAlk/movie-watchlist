import { pushToWatchlist, movieSearch} from "./movies.js"
import {toggleDarkMode, darkMode, darkModeEl, searchInput, activateSearch, darkModeEnabled} from "./darkMode.js"

/*------------Enter to Submit------------*/

if (searchInput)
{
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
          activateSearch.click()
        }
    })
  }

/*------------Add to Watchlist------------*/


document.addEventListener('click', function(e){
    if(e.target.dataset.addWatchList){
        pushToWatchlist(e.target.dataset.addWatchList) 
        e.target.parentNode.innerHTML = `<p class="watchlist">Added to Watchlist</p>`
    }
})

/*------------Submit Search------------*/

activateSearch.addEventListener('click', () => {
    movieSearch(searchInput.value)
})


document.addEventListener('click', function (e) {
    if (e.target.dataset.readMore) {
        e.preventDefault()
        let fullPlot = `id-full-plot-${e.target.dataset.readMore}`
        let previewPlot = `id-preview-plot-${e.target.dataset.readMore}`

        document.getElementById(fullPlot).classList.remove('hidden')
        
        document.getElementById(previewPlot).classList.add('hidden')


    }
})

/*------------Dark Mode------------*/


darkModeEl.addEventListener('click', () => {
    toggleDarkMode()
})

darkMode(darkModeEnabled)