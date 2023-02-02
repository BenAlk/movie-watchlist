let darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled')) || false
const darkModeEl = document.getElementById("mode-button");
const searchInput = document.getElementById("search-input")
const activateSearch = document.getElementById("search-button")

function toggleDarkMode() {
        darkModeEnabled = !darkModeEnabled
        localStorage.setItem('darkModeEnabled', darkModeEnabled)
        darkMode(darkModeEnabled)        
}

function darkMode(mode) {
    let modifiers = document.getElementsByClassName("modifier")
    let modifierArray = Array.from(modifiers);
    if (mode) {
        document.body.classList.add("darkmode")
        darkModeEl.classList.add("darkmode")
        activateSearch.classList.add("darkmode")
        searchInput.classList.add("darkmode")
        document.getElementById("header").style.border = "1px solid lightgrey"
        modifierArray.forEach(modifier => {
            modifier.classList.add("darkmode-img")
            modifier.classList.remove("lightmode-img")

        })
        
    } else {
        document.body.classList.remove("darkmode")
        darkModeEl.classList.remove("darkmode")
        activateSearch.classList.remove("darkmode")
        searchInput.classList.remove("darkmode")
        document.getElementById("header").style.border = "none"
        modifierArray.forEach(modifier => {
            modifier.classList.remove("darkmode-img")
            modifier.classList.add("lightmode-img")
        })
    }
}

function setDarkModeVar() {
    localStorage.setItem('darkModeEnabled', darkModeEnabled)
}

function darkImg() {
    darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled'))
    return (darkModeEnabled ? 'modifier darkmode-img' : 'modifier lightmode-img')
}

function darkLoader() {
    darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled'))
    return (darkModeEnabled ? 'loading-dark' : 'loading')
}
export { setDarkModeVar, darkModeEnabled, toggleDarkMode, darkMode, darkImg, darkLoader, darkModeEl, searchInput, activateSearch }