// Get the current theme preference from localStorage (default to "dark" if not found)
let currentThemeSetting = localStorage.getItem("theme") || "dark";

// SVG icons for light and dark mode
const darkModeIcon = `<svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <path fill="none" d="M0 0h256v256H0z"/>
    <path fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M128 40V16"/>
    <circle cx="128" cy="128" r="56" fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/>
    <path fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M64 64 48 48m16 144-16 16M192 64l16-16m-16 144 16 16M40 128H16m112 88v24m88-112h24"/>
</svg>`;

const lightModeIcon = `<svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <path fill="none" d="M0 0h256v256H0z"/>
    <path d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11" fill="none" stroke="floralwhite" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
</svg>`;

// Function to apply the theme based on the current setting
function applyTheme(theme) {
    const button = document.querySelector("#theme-o-matic");
    if (button) {
        button.innerHTML = theme === "dark" ? darkModeIcon : lightModeIcon;
        button.setAttribute("aria-label", `Click for ${theme === "dark" ? "light" : "dark"} theme`);
    }
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
}

// Apply the theme when the page loads
applyTheme(currentThemeSetting);

// Set up the button event listener to toggle the theme
const button = document.querySelector("#theme-o-matic");
if (button) {
    button.addEventListener("click", () => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);  // Save the theme to localStorage
        currentThemeSetting = newTheme;
        applyTheme(newTheme);  // Apply the new theme
    });
}

// Ensure the theme is applied correctly when navigating using the browser buttons (back/forward)
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);  // Apply the saved theme on page load
});