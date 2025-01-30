document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-o-matic");
    const lightThemeClass = "light";
    const storageKey = "themePreference";

    // Sun and moon SVGs
    const sunIcon = `<svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z"/><path fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M128 40V16"/><circle cx="128" cy="128" r="56" fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/><path fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M64 64 48 48M64 192l-16 16M192 64l16-16M192 192l16 16M40 128H16M128 216v24M216 128h24"/></svg>`;

    const moonIcon = `<svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z"/><path d="M108.1 28.1A96 96 0 0 0 228 148 96 96 0 1 1 108 28" fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/></svg>`;

    // Function to apply the theme
    function applyTheme(isLight) {
        if (isLight) {
            document.documentElement.classList.add(lightThemeClass);
            themeToggle.setAttribute("aria-label", "Click for dark theme");
            themeToggle.innerHTML = moonIcon;
        } else {
            document.documentElement.classList.remove(lightThemeClass);
            themeToggle.setAttribute("aria-label", "Click for light theme");
            themeToggle.innerHTML = sunIcon;
        }
    }

    // Function to get theme from localStorage
    function getSavedTheme() {
        return localStorage.getItem(storageKey) === "light";
    }

    // Apply theme immediately on page load
    applyTheme(getSavedTheme());

    // Toggle theme on button click
    themeToggle.addEventListener("click", function () {
        const isLight = !getSavedTheme();
        localStorage.setItem(storageKey, isLight ? "light" : "dark");
        applyTheme(isLight);
    });

    // Ensure the theme applies after any page reload, forward/back navigation
    window.addEventListener("load", function() {
        applyTheme(getSavedTheme());
    });
});