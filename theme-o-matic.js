    let currentThemeSetting = localStorage.getItem("theme") || "dark";
    document.querySelector("html").setAttribute("data-theme", currentThemeSetting);

    const button = document.querySelector("[data-theme-o-matic]");
    const svgElement = button.querySelector("svg");

    const sunSVG = `<svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z"/><path fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M128 40V16"/><circle cx="128" cy="128" r="56" fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/><path fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M64 64 48 48M64 192l-16 16M192 64l16-16M192 192l16 16M40 128H16M128 216v24M216 128h24"/></svg>`;

    const moonSVG = `<svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z"/><path d="M108.1 28.1A96 96 0 0 0 228 148 96 96 0 1 1 108 28" fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/></svg>`;

    function updateThemeUI(theme) {
        document.querySelector("html").setAttribute("data-theme", theme);
        button.querySelector("svg").outerHTML = theme === "dark" ? sunSVG : moonSVG;
        button.setAttribute("aria-label", `Change to ${theme === "dark" ? "light" : "dark"} theme`);
    }

    updateThemeUI(currentThemeSetting);

    button.addEventListener("click", () => {
        currentThemeSetting = currentThemeSetting === "dark" ? "light" : "dark";
        localStorage.setItem("theme", currentThemeSetting);
        updateThemeUI(currentThemeSetting);
    });
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            let storedTheme = localStorage.getItem("theme") || "dark";
            document.querySelector("html").setAttribute("data-theme", storedTheme);
        }
    });