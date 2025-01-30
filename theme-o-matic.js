if (!sessionStorage.getItem("visited")) {
    sessionStorage.setItem("visited", "true");
    localStorage.setItem("theme", "dark")
}
let currentThemeSetting = localStorage.getItem("theme") || "dark";
const lightThemeStyles = `:root{--primary-color:#111;--accent-color:mediumblue;--background-color:floralwhite;--form-field-background-color:white}body{color:var(--primary-color);background-color:var(--background-color)}svg{fill:var(--primary-color)}.play-pause .icon{fill:var(--background-color)}`;
const darkModeIcon = `<svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"> <path fill="none" d="M0 0h256v256H0z"/> <path fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M128 40V16"/> <circle cx="128" cy="128" r="56" fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/> <path fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M64 64 48 48m16 144-16 16M192 64l16-16m-16 144 16 16M40 128H16m112 88v24m88-112h24"/> </svg>`;
const lightModeIcon = ` <svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"> <path fill="none" d="M0 0h256v256H0z"/> <path d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11" fill="none" stroke="floralwhite" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/> </svg>`;

function applyTheme(theme) {
    const styleTag = document.getElementById("theme-style");
    if (theme === "light") {
        if (!styleTag) {
            const newStyleTag = document.createElement("style");
            newStyleTag.id = "theme-style";
            newStyleTag.textContent = lightThemeStyles;
            document.head.appendChild(newStyleTag)
        }
    } else if (theme === "dark") {
        if (styleTag) styleTag.remove();
    }
    document.documentElement.setAttribute("data-theme", theme);
    const button = document.querySelector("[data-theme-toggle]");
    if (button) {
        button.innerHTML = theme === "dark" ? darkModeIcon : lightModeIcon;
        button.setAttribute("aria-label", `Click for ${theme === "dark" ? "light" : "dark"} theme`)
    }
}
applyTheme(currentThemeSetting);
const button = document.querySelector("[data-theme-toggle]");
if (button) {
    button.addEventListener("click", () => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        currentThemeSetting = newTheme;
        applyTheme(newTheme)
    })
}
window.addEventListener("pageshow", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme)
})