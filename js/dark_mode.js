document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeLocalStorageKey = 'preferredTheme';
    const darkModeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z"/></svg>`;
    const lightModeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg>`;

    function toggleDarkMode() {
        const currentTheme = root.classList.toggle('dark-mode') ? 'dark' : 'light';
        setTheme(currentTheme);
        localStorage.setItem(themeLocalStorageKey, currentTheme);
    }

    function setDarkTheme() {
        root.style.setProperty('--primary-color', 'whitesmoke');
        root.style.setProperty('--overlay-accent', 'deepskyblue');
        root.style.setProperty('--nested-accent', 'magenta');
        root.style.setProperty('--highlight-color', 'yellow');
        root.style.setProperty('--background-color', '#111');
        updateDarkModeToggleIcons(lightModeSVG);
    }

    function setLightTheme() {
        root.style.setProperty('--primary-color', '#111');
        root.style.setProperty('--overlay-accent', 'blue');
        root.style.setProperty('--nested-accent', 'darkmagenta');
        root.style.setProperty('--highlight-color', 'yellow');
        root.style.setProperty('--background-color', 'whitesmoke');
        updateDarkModeToggleIcons(darkModeSVG);
    }

    // Function to update the icons for all .dark-mode-toggle elements
    function updateDarkModeToggleIcons(svgIcon) {
        document.querySelectorAll('.dark-mode-toggle').forEach((toggle) => {
            toggle.innerHTML = svgIcon;
        });
    }

    function setTheme(theme) {
        if (theme === 'dark') {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem(themeLocalStorageKey) || 'light';
        root.classList.toggle('dark-mode', savedTheme === 'dark');
        setTheme(savedTheme);
    }

    function initializeDarkModeToggle() {
        document.querySelectorAll('.dark-mode-toggle').forEach((toggle) => {
            toggle.addEventListener('click', toggleDarkMode);
        });
    }

    function initializeDarkMode() {
        applySavedTheme();
        initializeDarkModeToggle();
    }

    initializeDarkMode();
});