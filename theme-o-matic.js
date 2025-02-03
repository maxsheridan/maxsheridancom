// Function to set the color mode (light or dark)
const setColorMode = (mode) => {
    const label = document.querySelector('#theme-o-matic');

    // Persist the mode (store in localStorage)
    document.documentElement.setAttribute('data-force-color-mode', mode);
    window.localStorage.setItem('color-mode', mode);
};

// Apply saved mode or default to dark mode when the page loads
const applySavedMode = () => {
    const savedMode = window.localStorage.getItem('color-mode');
    setColorMode(savedMode !== null ? savedMode : 'dark');
};

// Immediately apply the saved mode when the page loads or is revisited
window.addEventListener('DOMContentLoaded', applySavedMode);
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.documentElement.removeAttribute('data-force-color-mode');

        // Force a reflow before applying the saved mode
        void document.documentElement.offsetWidth;
    }
    setTimeout(() => {
        applySavedMode();
    }, 0); // Apply with 0ms delay to allow the browser to reflow
});

// Theme toggle functionality (clicking on the label)
document.querySelector('#theme-o-matic').addEventListener('click', () => {
    const currentMode = document.documentElement.getAttribute('data-force-color-mode') || 'dark';
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setColorMode(newMode);
});

window.addEventListener('unload', () => {
    document.documentElement.removeAttribute('data-force-color-mode');
});