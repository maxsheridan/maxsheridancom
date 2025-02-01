// Function to set the color mode (light or dark)
const setColorMode = (mode) => {
    document.documentElement.setAttribute('data-force-color-mode', mode);
    window.localStorage.setItem('color-mode', mode);
};

// Apply saved mode, or default to dark if none exists
const applySavedMode = () => {
    const savedMode = window.localStorage.getItem('color-mode') || 'dark';
    setColorMode(savedMode);
};

// Immediately apply saved mode (default to dark if not set)
window.addEventListener('DOMContentLoaded', applySavedMode);
window.addEventListener('pageshow', () => {
    setTimeout(applySavedMode, 0); // Apply with 0ms delay to allow reflow
});

// Theme toggle functionality (clicking on the label)
document.querySelector('#theme-o-matic').addEventListener('click', () => {
    const currentMode = document.documentElement.getAttribute('data-force-color-mode') || 'dark';
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setColorMode(newMode);
});