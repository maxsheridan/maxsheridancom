if (!sessionStorage.getItem("visited")) {
    sessionStorage.setItem("visited", "true");
    localStorage.setItem("theme", "dark");
}
let currentThemeSetting = localStorage.getItem("theme") || "dark";

const themes = {
    dark: `
        :root {
            --primary-color: floralwhite;
            --accent-color: lightblue;
            --background-color: #111;
            --form-field-color: #111;
            --form-field-background-color: floralwhite;
        }
        body {
            color: var(--primary-color);
            background-color: var(--background-color);
        }
        svg {
            fill: var(--primary-color);
        }
        .play-pause .icon {
            fill: var(--background-color);
        }
    `,
    light: `
        :root {
            --primary-color: #111;
            --accent-color: mediumblue;
            --background-color: floralwhite;
            --form-field-background-color: white;
        }
        body {
            color: var(--primary-color);
            background-color: var(--background-color);
        }
        svg {
            fill: var(--primary-color);
        }
        .play-pause .icon {
            fill: var(--background-color);
        }
    `
};

function applyTheme(theme) {
    // Inject or update the theme styles
    let styleTag = document.getElementById("theme-style");
    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "theme-style";
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = themes[theme];

    // Update the data-theme attribute
    document.documentElement.setAttribute("data-theme", theme);

    // Update icons if present
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

    // Update the aria-label for the toggle button
    const button = document.querySelector("[data-theme-toggle]");
    if (button) {
        button.setAttribute("aria-label", `Click for ${theme === "dark" ? "light" : "dark"} theme`);
    }
}

// Apply the initial theme
applyTheme(currentThemeSetting);

// Add event listener for the toggle button
const button = document.querySelector("[data-theme-toggle]");
if (button) {
    button.addEventListener("click", () => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        currentThemeSetting = newTheme;
        applyTheme(newTheme);
    });
}

// Reapply the saved theme on pageshow (handles back/forward navigation)
window.addEventListener("pageshow", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);
});