import {renderWatchlist, removeFromWatchlist} from "./movies.js";
import { darkMode, darkModeEl, darkModeEnabled, toggleDarkMode } from "./darkmode.js";

/*------------Remove from watchlist------------*/


document.addEventListener('click', function(e){
    if(e.target.dataset.addWatchList){
        removeFromWatchlist(e.target.dataset.addWatchList) 
        e.target.parentNode.innerHTML = `<p class="watchlist">Removed from Watchlist</p>`
    }
})

/*------------Show full plot------------*/

document.addEventListener('click', function (e) {
    if (e.target.dataset.readMore) {
        e.preventDefault()
        let fullPlot = `id-full-plot-${e.target.dataset.readMore}`
        let previewPlot = `id-preview-plot-${e.target.dataset.readMore}`

        document.getElementById(fullPlot).classList.remove('hidden')
        
        document.getElementById(previewPlot).classList.add('hidden')

    }
})

/*------------Dark mode------------*/

darkModeEl.addEventListener('click', () => {
    toggleDarkMode()
})

renderWatchlist();
darkMode(darkModeEnabled)

