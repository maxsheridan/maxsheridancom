if (!sessionStorage.getItem("visited")) {
    sessionStorage.setItem("visited", "true");
    localStorage.setItem("theme", "dark");
}

let currentThemeSetting = localStorage.getItem("theme") || "dark";

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    
    const darkThemeIcon = document.querySelector("[data-theme-dark-toggle]");
    const lightThemeIcon = document.querySelector("[data-theme-light-toggle]");
    
    if (darkThemeIcon && lightThemeIcon) {
        if (theme === "dark") {
            darkThemeIcon.classList.remove("hidden");
            lightThemeIcon.classList.add("hidden");
        } else {
            lightThemeIcon.classList.remove("hidden");
            darkThemeIcon.classList.add("hidden");
        }
    }
    
    const button = document.querySelector("[data-theme-toggle]");
    if (button) {
        button.setAttribute("aria-label", `Click for ${theme === "dark" ? "light" : "dark"} theme`);
    }
}

applyTheme(currentThemeSetting);

const button = document.querySelector("[data-theme-toggle]");
if (button) {
    button.addEventListener("click", () => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        currentThemeSetting = newTheme;
        applyTheme(newTheme);
    });
}

window.addEventListener("pageshow", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);
});