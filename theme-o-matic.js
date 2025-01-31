// Function to set the color mode based on saved preference
const setColorMode = (mode) => {
    if (mode) {
        // Apply the mode (light or dark) by updating the data-* attribute on HTML
        document.documentElement.setAttribute('data-force-color-mode', mode);
        // Persist the mode in localStorage
        window.localStorage.setItem('color-mode', mode);

        if (mode === 'light') {
            // Apply the light theme styles dynamically
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
            // Inject the styles into the document
            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = lightThemeStyles;
            document.head.appendChild(styleSheet);
        } else {
            // Remove existing light/dark theme styles when switching modes
            const existingStyle = document.querySelector('style[data-theme="light"]');
            if (existingStyle) existingStyle.remove();

            // Apply the dark theme styles dynamically
            const darkThemeStyles = `
                :root {
                    --primary-color: #f0f0f0;
                    --accent-color: #ff6347;
                    --background-color: #333;
                    --form-field-background-color: #555;
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
            // Inject the dark theme styles into the document
            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = darkThemeStyles;
            styleSheet.setAttribute('data-theme', 'dark');
            document.head.appendChild(styleSheet);
        }
    } else {
        // Remove the color mode override (reset to system preference)
        document.documentElement.removeAttribute('data-force-color-mode');
        window.localStorage.removeItem('color-mode');
        // Remove custom styles when resetting
        const customStyle = document.querySelector('style[data-theme="light"]') || document.querySelector('style[data-theme="dark"]');
        if (customStyle) customStyle.remove();
    }
};

// Apply saved mode or default to dark mode when the page loads
const applySavedMode = () => {
    const savedMode = window.localStorage.getItem('color-mode');
    setColorMode(savedMode !== null ? savedMode : 'dark');
};

// Immediately apply the saved mode when the page loads or is re-visited
window.addEventListener('DOMContentLoaded', applySavedMode);
window.addEventListener('pageshow', applySavedMode); // Reapply on page show (after back/forward navigation)

document.querySelector('#theme-o-matic').addEventListener('click', (e) => {
    const newMode = e.target.checked ? 'dark' : 'light';
    setColorMode(newMode);
});

// Listen for system-level color scheme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addListener(() => {
    if (!document.documentElement.getAttribute('data-force-color-mode')) {
        document.querySelector('#theme-o-matic').checked = mediaQuery.matches;
    }
});
