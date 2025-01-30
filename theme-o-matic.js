document.addEventListener("DOMContentLoaded", () => {
    let currentThemeSetting = localStorage.getItem("theme") || "dark"; // Default to dark if no theme saved

    // Define the icons for the themes
    const darkModeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="none" stroke="#111" stroke-width="18" d="M128 40V16"/><circle cx="128" cy="128" r="56" fill="none" stroke="#111" stroke-width="18"/><path fill="none" stroke="#111" stroke-width="18" d="M64 64 48 48m16 144-16 16M192 64l16-16m-16 144 16 16M40 128H16m112 88v24m88-112h24"/></svg>`;
    const lightModeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11" fill="none" stroke="floralwhite" stroke-width="16"/></svg>`;

    // Apply the theme
    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme); // Add theme to root element

        // Update button icon and aria-label
        const button = document.querySelector("[data-theme-toggle]");
        if (button) {
            const icon = button.querySelector("svg");
            if (icon) {
                icon.innerHTML = theme === "dark" ? darkModeIcon : lightModeIcon;
            }
            button.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
        }
    }

    // Apply the current theme immediately after DOMContentLoaded
    applyTheme(currentThemeSetting);

    // Toggle button functionality
    const button = document.querySelector("[data-theme-toggle]");
    if (button) {
        button.addEventListener("click", () => {
            const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);  // Save theme to localStorage
            currentThemeSetting = newTheme;  // Update the current theme
            applyTheme(newTheme);  // Apply the new theme
        });
    }

    // Ensure theme is applied on page reload (when navigating via back/forward buttons or on page refresh)
    window.addEventListener("pageshow", () => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        applyTheme(savedTheme);
    });
});