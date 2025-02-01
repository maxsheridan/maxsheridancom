// Function to set the color mode (light or dark)
const setColorMode = (mode) => {
    document.documentElement.setAttribute('data-force-color-mode', mode);
    window.localStorage.setItem('color-mode', mode);
};

// Apply the saved mode or default to dark
const applySavedMode = () => {
    const savedMode = window.localStorage.getItem('color-mode');
    
    // If there's a saved mode, use it; otherwise, default to dark
    if (savedMode) {
        setColorMode(savedMode);
    } else {
        setColorMode('dark');
    }
};

// Immediately apply saved mode on page load
document.addEventListener('DOMContentLoaded', applySavedMode);
window.addEventListener('pageshow', () => {
    setTimeout(applySavedMode, 0); // Ensures it runs after browser reflow
});

// Theme toggle functionality (clicking on the button)
document.querySelector('#theme-o-matic').addEventListener('click', () => {
    const currentMode = document.documentElement.getAttribute('data-force-color-mode') || 'dark';
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setColorMode(newMode);
});