let theme_toggler = document.querySelector('#theme-o-matic');

// Define the sun (light mode) and moon (dark mode) SVGs
const sunSVG = `<svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z"/><path fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M128 40V16"/><circle cx="128" cy="128" r="56" fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/><path fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" d="M64 64 48 48M64 192l-16 16M192 64l16-16M192 192l16 16M40 128H16M128 216v24M216 128h24"/></svg>`;

const moonSVG = `<svg class="inline-graphic toggle-thingy" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z"/><path d="M108.1 28.1A96 96 0 0 0 228 148 96 96 0 1 1 108 28" fill="none" stroke="var(--background-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"/></svg>`;

// Function to update UI (theme class, SVG, and aria-label)
function updateThemeUI(theme) {
    document.body.classList.toggle('light', theme === 'light');
    theme_toggler.innerHTML = theme === 'light' ? moonSVG : sunSVG;
    theme_toggler.setAttribute('aria-label', `Click for ${theme === 'light' ? 'dark' : 'light'} theme`);
}

// Toggle theme when button is clicked
theme_toggler.addEventListener('click', function(){ 
    let newTheme = document.body.classList.contains('light') ? 'default' : 'light';
    localStorage.setItem('website_theme', newTheme);
    updateThemeUI(newTheme);
});

// Retrieve and apply theme on page load
function retrieve_theme(){
    let savedTheme = localStorage.getItem('website_theme') || 'default'; // Default to dark mode
    updateThemeUI(savedTheme);
}

retrieve_theme();

// Listen for changes across tabs/windows
window.addEventListener("storage", function(){
    retrieve_theme();
}, false);
