// Function to set the color mode based on saved preference
const setColorMode = (mode) => {
    if (mode) {
        // Apply the mode (light or dark) by updating the data-* attribute on HTML
        document.documentElement.setAttribute('data-force-color-mode', mode);
        // Persist the mode in localStorage
        window.localStorage.setItem('color-mode', mode);

        // Select the theme icon element
        const toggleThingy = document.querySelector('.toggle-thingy');

        // Swap the icon based on the mode
        if (mode === 'light') {
            toggleThingy.innerHTML = `
                <path fill="none" d="M0 0h256v256H0z"/>
                <path d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11" fill="none" stroke="floralwhite" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            `;
        } else {
            toggleThingy.innerHTML = `
                <path fill="none" d="M0 0h256v256H0z"/>
                <path fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M128 40V16"/>
                <circle cx="128" cy="128" r="56" fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/>
                <path fill="none" stroke="#111" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M64 64 48 48M64 192l-16 16M192 64l16-16M192 192l16 16M40 128H16M128 216v24M216 128h24"/>
            `;
        }

        // Apply the theme styles dynamically
        const themeStyles = mode === 'light' ? `
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
        ` : `
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

        // Inject the styles into the document
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = themeStyles;
        styleSheet.setAttribute('data-theme', mode);
        document.head.appendChild(styleSheet);
    } else {
        // Reset to system preference
        document.documentElement.removeAttribute('data-force-color-mode');
        window.localStorage.removeItem('color-mode');

        // Reset the icon to moon (dark mode)
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.innerHTML = `
            <path fill="none" d="M0 0h256v256H0z"/>
            <path d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11" fill="none" stroke="floralwhite" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        `;

        // Reset styles
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

document.querySelector('#theme-o-matic').addEventListener('change', () => {
    const newMode = document.querySelector('#theme-o-matic').checked ? 'dark' : 'light';
    setColorMode(newMode);
});

// Listen for system-level color scheme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addListener(() => {
    if (!document.documentElement.getAttribute('data-force-color-mode')) {
        document.querySelector('#theme-o-matic').checked = mediaQuery.matches;
    }
});
