const setColorMode = (mode) => {
    // Mode was given
    if (mode) {
        // Update data-* attr on html
        document.documentElement.setAttribute('data-force-color-mode', mode);
        // Persist in local storage
        window.localStorage.setItem('color-mode', mode);
        // Make sure the checkbox is up-to-date
        document.querySelector('#theme-o-matic').checked = (mode === 'dark');
    } 
    // No mode given (e.g. reset)
    else {
        // Remove data-* attr from html
        document.documentElement.removeAttribute('data-force-color-mode');
        // Remove entry from local storage
        window.localStorage.removeItem('color-mode');
        // Make sure the checkbox is up-to-date, matching the system preferences
        document.querySelector('#theme-o-matic').checked = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
};

// 🔥 Apply stored preference OR default to dark mode
const savedMode = window.localStorage.getItem('color-mode');
setColorMode(savedMode !== null ? savedMode : 'dark');

document.querySelector('#theme-o-matic').addEventListener('click', (e) => {
    setColorMode(e.target.checked ? 'dark' : 'light');
});

document.querySelector('#reset-darkmode').addEventListener('click', (e) => {
    e.preventDefault();
    setColorMode(false);
});

// Keep an eye out for System Light/Dark Mode Changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addListener(() => {
    // Ignore change if there's an override set
    if (document.documentElement.getAttribute('data-force-color-mode')) {
        return;
    }
    // Make sure the checkbox is up-to-date
    document.querySelector('#theme-o-matic').checked = mediaQuery.matches;
});

window.addEventListener('pageshow', () => {
    // Force reapply the saved mode
    const savedMode = window.localStorage.getItem('color-mode') || 'dark';
    setColorMode(savedMode);

    // Force a small reflow for Firefox to refresh styles
    void document.documentElement.offsetHeight;
});

window.addEventListener('popstate', () => {
    // Ensure theme is reapplied when navigating with back/forward buttons
    const savedMode = window.localStorage.getItem('color-mode') || 'dark';
    setColorMode(savedMode);
});