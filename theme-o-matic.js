// Function to set the color mode based on saved preference
const setColorMode = (mode) => {
    if (mode) {
        // Apply the mode (light or dark) by updating the data-* attribute on HTML
        document.documentElement.setAttribute('data-force-color-mode', mode);
        // Persist the mode in localStorage
        window.localStorage.setItem('color-mode', mode);
        
        // 🔥 Swap icons based on mode
        document.querySelector('.moon-icon').style.display = (mode === 'light') ? 'block' : 'none';
        document.querySelector('.sun-icon').style.display = (mode === 'dark') ? 'block' : 'none';
    } else {
        // Remove the color mode override (reset to system preference)
        document.documentElement.removeAttribute('data-force-color-mode');
        window.localStorage.removeItem('color-mode');
        
        // 🔥 Reset icon display based on the system preferences
        const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.querySelector('.moon-icon').style.display = (systemMode === 'light') ? 'block' : 'none';
        document.querySelector('.sun-icon').style.display = (systemMode === 'dark') ? 'block' : 'none';
    }
};

// Apply saved mode or default to dark mode when the page loads
const applySavedMode = () => {
    const savedMode = window.localStorage.getItem('color-mode');
    setColorMode(savedMode !== null ? savedMode : 'dark');
};

// Immediately apply the saved mode when the page loads or is re-visited
window.addEventListener('DOMContentLoaded', applySavedMode);

document.querySelector('#theme-o-matic').addEventListener('click', (e) => {
    const newMode = e.target.checked ? 'dark' : 'light';
    setColorMode(newMode);
});

// Listen for system-level color scheme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addListener(() => {
    if (!document.documentElement.getAttribute('data-force-color-mode')) {
        document.querySelector('#theme-o-matic').checked = mediaQuery.matches;
        
        // 🔥 Sync the icon state with system preferences
        const systemMode = mediaQuery.matches ? 'dark' : 'light';
        document.querySelector('.moon-icon').style.display = (systemMode === 'light') ? 'block' : 'none';
        document.querySelector('.sun-icon').style.display = (systemMode === 'dark') ? 'block' : 'none';
    }
});