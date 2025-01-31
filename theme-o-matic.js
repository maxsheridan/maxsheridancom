// Cache the SVG icons for dark and light modes
const iconCache = {
    darkModeIcon: `
        <svg class="inline-graphic sun" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256">
            <path fill="none" d="M0 0h256v256H0z"/>
            <path fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M128 40V16"/>
            <circle cx="128" cy="128" r="56" fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/>
            <path fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M64 64 48 48m16 144-16 16M192 64l16-16m-16 144 16 16M40 128H16m112 88v24m88-112h24"/>
        </svg>
    `,
    lightModeIcon: `
        <svg class="inline-graphic moon" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256">
            <path fill="none" d="M0 0h256v256H0z"/>
            <path d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11" fill="none" stroke="floralwhite" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        </svg>
    `
};

// Function to set the color mode (light or dark)
const setColorMode = (mode) => {
    const label = document.querySelector('#theme-o-matic');

    // Inject the appropriate icon based on the mode
    if (mode === 'light') {
        label.innerHTML = iconCache.lightModeIcon; // Inject light mode icon (moon)
        label.classList.remove('dark-mode');
        label.classList.add('light-mode');
    } else {
        label.innerHTML = iconCache.darkModeIcon; // Inject dark mode icon (sun)
        label.classList.remove('light-mode');
        label.classList.add('dark-mode');
    }

    // Persist the mode (store in localStorage)
    document.documentElement.setAttribute('data-force-color-mode', mode);
    window.localStorage.setItem('color-mode', mode);

    // Apply the theme styles dynamically based on the mode
    const lightThemeStyles = `
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
    `;
    const darkThemeStyles = `
        :root {
            --primary-color: floralwhite;
            --accent-color: lightblue;
            --background-color: #111;
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
    `;

    // Inject the appropriate theme styles
    const existingStyle = document.querySelector('style[data-theme]');
    if (existingStyle) existingStyle.remove();

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = mode === 'light' ? lightThemeStyles : darkThemeStyles;
    styleSheet.setAttribute('data-theme', mode);
    document.head.appendChild(styleSheet);
};

// Apply saved mode or default to dark mode when the page loads
const applySavedMode = () => {
    const savedMode = window.localStorage.getItem('color-mode');
    setColorMode(savedMode !== null ? savedMode : 'dark');
};

// Immediately apply the saved mode when the page loads or is revisited
window.addEventListener('DOMContentLoaded', applySavedMode);
window.addEventListener('pageshow', applySavedMode); // Reapply on page show (after back/forward navigation)

// Theme toggle functionality (clicking on the label)
document.querySelector('#theme-o-matic').addEventListener('click', () => {
    const currentMode = document.documentElement.getAttribute('data-force-color-mode') || 'dark';
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setColorMode(newMode);
});

// Listen for system-level color scheme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addListener(() => {
    if (!document.documentElement.getAttribute('data-force-color-mode')) {
        document.querySelector('#theme-o-matic').classList.toggle('dark-mode', mediaQuery.matches);
        document.querySelector('#theme-o-matic').classList.toggle('light-mode', !mediaQuery.matches);
    }
});