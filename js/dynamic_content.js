var isNewsOverlay = ''; // Detect overlay state

let activePage = null; // Track the currently active page

document.addEventListener('DOMContentLoaded', () => {
    let submitted = false;

    function attachFormSubmitListener() {
        const contactForm = document.getElementById("contactForm");
        if (contactForm) {
            contactForm.addEventListener("submit", function(e) {
                if (!submitted) {
                    e.preventDefault();
                    const formElements = contactForm.querySelectorAll("*");
                    formElements.forEach(element => element.style.display = "none");
                    
                    const thanksMessage = document.createElement("p");
                    thanksMessage.textContent = "Message received.";
                    contactForm.insertBefore(thanksMessage, contactForm.firstChild);
                    
                    submitted = true;
                    setTimeout(() => contactForm.submit(), 1000);
                }
            });

            document.getElementById("hidden_iframe").onload = function() {
                if (submitted) {
                    console.log('Form submitted and iframe loaded.');
                    submitted = false;
                } else {
                    console.error('Iframe loaded without form submission.');
                }
            };
        }
    }

    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function loadContent(pageId, url) {
        const contentDiv = document.getElementById(pageId);
        contentDiv.classList.add('hidden'); // Hide the content initially

        fetch(url)
            .then(response => response.text())
            .then(html => {
                contentDiv.innerHTML = html;
                initializePage();
                contentDiv.scrollTop = 0;
                attachFormSubmitListener();

                // Conditionally load scripts based on the content
                if (url.includes('news') || url.includes('post')) {
                    loadScript('/js/audioplayer.js', () => {
                        if (typeof Essential_Audio !== 'undefined' && typeof Essential_Audio.init === 'function') {
                            Essential_Audio.init();
                        }
                    });
                    loadScript('/js/videoplayer.js', () => {
                        if (typeof VideoPlayer !== 'undefined' && typeof VideoPlayer.init === 'function') {
                            VideoPlayer.init();
                        }
                    });
                }

                setTimeout(() => {
                    contentDiv.classList.remove('hidden'); // Show the content once it's fully loaded
                    contentDiv.classList.add('active');
                }, 50); // Small delay to ensure the previous page is fully hidden
            })
            .catch(error => {
                console.error('Error loading page content:', error);
            });
    }

    function showPage(pageElement) {
        if (activePage && activePage !== pageElement) {
            activePage.classList.remove('active');
            activePage.classList.add('hidden');
        }
        setTimeout(() => {
            pageElement.classList.remove('hidden');
            pageElement.classList.add('active');
            activePage = pageElement; // Update the currently active page
            document.querySelector('.close-btn').style.display = 'flex';
            document.querySelector('.dark-mode-toggle').style.display = 'flex';
        }, 300); // Match the duration of the CSS transition
    }

    function hidePage(pageElement) {
        const audioElements = pageElement.querySelectorAll('audio');
        const videoElements = pageElement.querySelectorAll('video');

        if (typeof Essential_Audio !== 'undefined' && Essential_Audio.active()) {
            Essential_Audio.Stop(Essential_Audio.active());
        }

        videoElements.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });

        pageElement.classList.remove('active');
        pageElement.classList.add('hidden');

        // Delay hiding the buttons until the transition is complete
        setTimeout(() => {
            if (!document.querySelector('.overlay.active') && !document.querySelector('.nested.active')) {
                document.querySelector('.close-btn').style.display = 'none';
                document.querySelector('.dark-mode-toggle').style.display = 'none';
            }
        }, 300); // Match the duration of the CSS transition
    }

    function setupNavigation() {
        const overlayPage = document.getElementById('overlay-page');
        const nestedPage = document.getElementById('nested-page');

        document.querySelectorAll('nav a[data-page]').forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const page = event.target.getAttribute('data-page');
                // Check if the page contains 'news'
                if (page.includes('news')) {
                    isNewsOverlay = true;
                    // Fetch the JSON data from the specified URL
                    fetch(`/news-data/article-set-${totalJSONFiles}.json?cache=` + unixTimestamp)
                        .then(response => {
                            if (!response.ok) { throw new Error('Network response was not ok'); }
                            return response.json(); // Parse the JSON data
                        })
                        // Assuming 'data' is the JSON array
                        .then(data => {
                            // Reverse the order of articles based on 'articleNumber'
                            data.sort((a, b) => b.articleNumber - a.articleNumber);

                            // Construct the HTML content dynamically
                            let content = `<div class="news page-content-inner">
                                           <div class="content">
                                           <h1>News</h1>
                                           <div id="article-container">
                                           <article>
                                           <div class="text">
                                           <h2>Announcing: The Purge test</h2>
                                           <p>Friends and freaks with terrifying keyword searches that ended up on my blog: it was time to say goodbye to content I’d been hauling around for years. That means posts from before 2015 are now in the big blog dumpster in the sky. Scroll down for my latest news. If you were looking for something else, something potentially revol&shy;ting for which this website was the only known source, I’m afraid you’re plumb out of luck.</p>
                                           </div>
                                           </article>`;

                            data.forEach(article => { content += article.htmlContent; });

                            content += '</div></div></div>';

                            // Insert the content into the element with ID 'dynamic-content1'
                            document.getElementById('dynamic-content1').innerHTML = content;
                        })
                        .catch(error => { console.error('There was a problem with the fetch operation:', error); });
                } else {
                    isNewsOverlay = false;
                    loadContent('dynamic-content1', `/${page}.html`);
                }

                showPage(overlayPage);
            });
        });

        overlayPage.addEventListener('click', event => {
            const insideLink = event.target.closest('.inside-link[data-inside-page]');
            if (insideLink) {
                event.preventDefault();
                const insidePage = insideLink.getAttribute('data-inside-page');
                loadContent('dynamic-content2', `/${insidePage}.html`);
                showPage(nestedPage);
                overlayPage.classList.add('active'); // Ensure overlay page remains active
            }
        });

        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (nestedPage.classList.contains('active')) {
                    hidePage(nestedPage);
                } else if (overlayPage.classList.contains('active')) {
                    currentFileIndex = totalJSONFiles - 1;
                    hidePage(overlayPage);
                }
            });
        });
    }

    function initializePage() {
        // Add any initialization logic here
        console.log('Page initialized');
    }

    setupNavigation();
    initializePage();
});
