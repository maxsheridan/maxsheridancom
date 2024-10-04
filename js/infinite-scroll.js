// Total number of available JSON files to fetch
const totalJSONFiles = 5;

// Base URL pattern for JSON files
const baseUrl = '/news-data/article-set-';

// Index to track which JSON file to fetch next, starting from the last file
let currentFileIndex = totalJSONFiles - 1;

// Holds the current Unix timestamp for cache-busting
let unixTimestamp;

// Updates the unixTimestamp with the current time in seconds
const updateUnixTimestamp = () => {
    unixTimestamp = Math.floor(Date.now() / 1000);
};

// Updates the timestamp every 100 milliseconds to ensure fresh cache-busting
setInterval(updateUnixTimestamp, 100);

// Fetches JSON data for the given file index and appends articles to the DOM
const fetchJSONData = async (index) => {
    const url = `${baseUrl}${index}.json?cache=${unixTimestamp}`; // Construct URL with cache-busting query

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle HTTP errors
        }

        const data = await response.json();

        // Sort the articles in descending order by 'articleNumber'
        data.sort((a, b) => b.articleNumber - a.articleNumber);

        // Generate HTML content from each article's 'htmlContent' field
        let content = '';
        data.forEach(article => {
            content += article.htmlContent;
        });

        // Append the generated content to the article container in the DOM
        document.getElementById('article-container').insertAdjacentHTML('beforeend', content);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error); // Log errors
    }
};

// Handles scroll events to fetch and load more articles when reaching the bottom of the page
function onScroll() {
    const overlayPage = document.querySelector("#overlay-page");
    const scrollTop = overlayPage.scrollTop; // Current vertical scroll position
    const scrollHeight = overlayPage.scrollHeight; // Total height of scrollable content
    const clientHeight = overlayPage.clientHeight; // Height of the visible content area

    // If the user is near the bottom of the page, check for more articles to load
    if (isNewsOverlay && scrollTop + clientHeight >= scrollHeight - 5) {
        // Check if the 'end-of-articles' element already exists, indicating no more content to load
        if (document.getElementById('end-of-articles')) {
            console.log('end-of-articles element reached, stopping further fetches.');

            const articles = document.querySelectorAll("#article-container > article");
            const lastIndex = articles.length; // Determine the index of the last article

            // Create a new stylesheet if none exists, or use the first existing stylesheet
            let styleSheet = document.styleSheets.length === 0 ? document.head.appendChild(document.createElement("style")).sheet : document.styleSheets[0];

            // Dynamically add a CSS rule to hide the pseudo-element (::after) of the last article
            styleSheet.insertRule(`
                #article-container > article:nth-child(${lastIndex})::after {
                    display: none;
                }
            `, styleSheet.cssRules.length);

            return; // Exit the function to stop further fetching
        }

        // If there are more JSON files to fetch, load the next file
        if (currentFileIndex >= 1) {
            fetchJSONData(currentFileIndex); // Fetch the current file
            currentFileIndex--; // Decrement the file index for the next fetch
        } else {
            // If all files have been loaded, indicate the end of articles
            console.log('All JSON files have been loaded.');
            const theEndElement = '<div id="end-of-articles"><img class="graphic" src="/projects/maxsheridan.com/assets/graphics/coda_dark.svg" alt="coda" width="28" height="40"></div>';

            // Insert the "end of articles" indicator after the article container
            document.getElementById('article-container').insertAdjacentHTML('afterend', theEndElement);
        }
    }
}

// Add an event listener to detect scroll events on the overlay page
const overlayPage = document.querySelector("#overlay-page");
overlayPage.addEventListener('scroll', onScroll);
