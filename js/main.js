document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeLocalStorageKey = 'preferredTheme';

    // SVG icons for light and dark mode
    const darkModeSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z"/></svg>`;

    const lightModeSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg>`;

    // Function to toggle dark mode
    function toggleDarkMode() {
        const currentTheme = root.classList.toggle('dark-mode') ? 'dark' : 'light';
        setTheme(currentTheme);
        localStorage.setItem(themeLocalStorageKey, currentTheme);
    }

    // Apply dark theme
    function setDarkTheme() {
        root.style.setProperty('--primary-color', 'whitesmoke');
        root.style.setProperty('--overlay-accent', 'magenta');
        root.style.setProperty('--nested-accent', 'yellow');
        root.style.setProperty('--highlight-color', 'magenta');
        root.style.setProperty('--background-color', '#121212');
        document.querySelector('.dark-mode-toggle').innerHTML = lightModeSVG; // Set light mode SVG in dark mode
    }

    // Apply light theme
    function setLightTheme() {
        root.style.setProperty('--primary-color', '#111');
        root.style.setProperty('--overlay-accent', 'blue');
        root.style.setProperty('--nested-accent', 'darkmagenta');
        root.style.setProperty('--highlight-color', 'yellow');
        root.style.setProperty('--background-color', 'whitesmoke');
        document.querySelector('.dark-mode-toggle').innerHTML = darkModeSVG; // Set dark mode SVG in light mode
    }

    // Apply the correct theme based on the value
    function setTheme(theme) {
        if (theme === 'dark') {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }

    // Apply the saved theme on page load
    function applySavedTheme() {
        const savedTheme = localStorage.getItem(themeLocalStorageKey) || 'light'; // Default to light mode
        root.classList.toggle('dark-mode', savedTheme === 'dark');
        setTheme(savedTheme);
    }

    // Initialize dark mode toggle on page load
    function initializeDarkModeToggle() {
        document.querySelectorAll('.dark-mode-toggle').forEach((toggle) => {
            toggle.addEventListener('click', toggleDarkMode);
        });
    }

    // Initialize dark mode
    function initializeDarkMode() {
        applySavedTheme(); // Apply the saved theme (light or dark)
        initializeDarkModeToggle(); // Attach event listeners to the toggles
    }

    // Initialize dark mode on page load
    initializeDarkMode();

   // Function to show the overlay or nested page and the close button
function showPage(pageElement) {
    // Make the new page visible and start the sliding transition
    pageElement.style.visibility = 'visible'; // Ensure the new page is visible
    pageElement.classList.add('active'); // Start the slide-in transition
}

    // Function to hide the overlay or nested page and hide the close button after the transition
    function hidePage(pageElement) {
        // Start hiding the page by removing the active class (triggers slide-out)
        pageElement.classList.remove('active');

        // After the sliding transition ends, hide the page from view
        setTimeout(() => {
            pageElement.style.visibility = 'hidden'; // Hide the page after it's fully slid out
        }, 300); // Match the transition duration

        // Hide the close button if no pages are active
        setTimeout(() => {
            if (!document.querySelector('.overlay.active') && !document.querySelector('.nested.active')) {
                document.querySelector('.close-btn').style.display = 'none'; // Hide the close button
            }
        }, 300); // Also match the transition duration
    }

    // Function to dynamically load content into pages and show the close button
    function loadContent(pageId, url) {
        const contentDiv = document.getElementById(pageId);
        const previousPage = document.querySelector('.overlay.active, .nested.active'); // Get the currently active page

        fetch(url)
            .then(response => response.text())
            .then(html => {
                contentDiv.innerHTML = html;
                initializePage(); // Reinitialize content after loading
                showPage(document.getElementById('overlay-page'), previousPage); // Show the new page over the previous one
            });
    }

    // Event listener for the close button click
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const overlay = document.getElementById('overlay-page');
        const nested = document.getElementById('nested-page');

        // Close the nested page first (if active)
        if (nested.classList.contains('active')) {
            hidePage(nested);
        } 
        // Only close the overlay page if no nested page is active
        else if (overlay.classList.contains('active')) {
            hidePage(overlay);
        }
    });
});

    // Handle overlay and nested page interactions
    function setupNavigation() {
        const overlayPage = document.getElementById('overlay-page');
        const nestedPage = document.getElementById('nested-page');

        document.querySelectorAll('nav a[data-page]').forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const page = event.target.getAttribute('data-page');
                loadContent('dynamic-content1', `/${page}.html`);
                showPage(overlayPage, document.querySelector('.active')); // Pass in the currently active page
            });
        });

        overlayPage.addEventListener('click', event => {
            const insideLink = event.target.closest('.inside-link[data-inside-page]');
            if (insideLink) {
                event.preventDefault();
                const insidePage = insideLink.getAttribute('data-inside-page');
                loadContent('dynamic-content2', `/${insidePage}.html`);
                showPage(nestedPage, overlayPage); // Pass in the current overlay page
            }
        });
    }

    setupNavigation();

    // Reinitialize the page content after dynamic loading
    function initializePage() {
        initializeAudioPlayers(); // Initialize audio players
        initializeVideoPlayers(); // Initialize video players
    }

    // Function to initialize audio players if needed
    function initializeAudioPlayers() {
        const audioPlayers = document.querySelectorAll('audio');
        if (audioPlayers.length) {
            audioPlayers.forEach(audioPlayer => {
                const playButton = audioPlayer.closest('.controls').querySelector('.play-pause');
                playButton.addEventListener('click', () => togglePlayPause(audioPlayer, playButton));
            });
        }
    }

    // Function to initialize video players
    function initializeVideoPlayers() {
        const videos = document.querySelectorAll('video');
        if (videos.length) {
            videos.forEach(video => {
                const controls = video.nextElementSibling;
                const playPauseButton = controls.querySelector('.play-pause');
                const progressBar = controls.querySelector('.progress input');
                const progressFilled = controls.querySelector('.progress-filled');

                playPauseButton.addEventListener('click', () => togglePlayPause(video, playPauseButton));
                video.addEventListener('play', () => updatePlayPauseButton(video, playPauseButton));
                video.addEventListener('pause', () => updatePlayPauseButton(video, playPauseButton));
                video.addEventListener('timeupdate', () => updateProgress(video, progressBar, progressFilled));

                if (progressBar) {
                    progressBar.addEventListener('input', () => seekVideo(video, progressBar));
                }
            });
        }
    }

    // Toggle play and pause functionality for media players
    function togglePlayPause(media, button) {
        if (media.paused) {
            media.play();
        } else {
            media.pause();
        }
        updatePlayPauseButton(media, button);
    }

    // Update the play/pause button based on media state
    function updatePlayPauseButton(media, button) {
        if (media.paused) {
            button.classList.remove('pause');
            button.classList.add('play');
            button.setAttribute('aria-label', 'Play');
        } else {
            button.classList.add('pause');
            button.classList.remove('play');
            button.setAttribute('aria-label', 'Pause');
        }
    }

    // Update progress bar based on media time
    function updateProgress(media, progressBar, progressFilled) {
        const percent = (media.currentTime / media.duration) * 100;
        progressFilled.style.width = `${percent}%`;
        progressBar.value = percent;
    }

    // Seek to a specific time in the media
    function seekVideo(media, progressBar) {
        const seekTime = (progressBar.value / 100) * media.duration;
        media.currentTime = seekTime;
        const progressFilled = progressBar.closest('.progress').querySelector('.progress-filled');
        updateProgress(media, progressBar, progressFilled);
    }

    // Initialize content for the current page
    setupNavigation();
    initializePage();
});