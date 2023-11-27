const darkModeToggle = document.getElementById("darkmode-toggle");
const htmlElement = document.querySelector("html");
let mode = localStorage.getItem("darkMode") == "dark" ? "dark" : "light";

function updateDarkModeToggleText() {
    if (mode === "light") {
        darkModeToggle.textContent = "Toggle Dark Mode";
    } else {
        darkModeToggle.textContent = "Toggle Light Mode";
    }
}

function handleDarkModeToggle(event) {
    mode = (mode === "light") ? "dark" : "light";
    localStorage.setItem("darkMode", mode);
    htmlElement.setAttribute("data-mode", mode);
    updateDarkModeToggleText();
}

darkModeToggle.addEventListener("click", handleDarkModeToggle);
htmlElement.setAttribute("data-mode", mode);
updateDarkModeToggleText();