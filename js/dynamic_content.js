let activePage = null; // Track the currently active page

document.addEventListener('DOMContentLoaded', () => {
    let submitted = false;

    // Function to preload multiple images
    function preloadImages(imageArray) {
        imageArray.forEach(src => {
            const img = new Image();
            img.src = src; // Set the source to preload the image
        });
    }

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
                }
            };
        }
    }
    
    // Updated loadScript function with duplication check
    function loadScript(url, callback) {
        // Check if the script is already in the document
        if (!document.querySelector(`script[src="${url}"]`)) {
            const script = document.createElement('script');
            script.src = url;
            script.defer = true;
            script.onload = callback;
            document.head.appendChild(script);
        } else {
            // If the script is already loaded, execute the callback immediately
            if (callback) callback();
        }
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
                    // Load the audio player for both 'news' and 'post'
                    loadScript('/js/audioplayer.js', () => {
                        if (typeof Essential_Audio !== 'undefined' && typeof Essential_Audio.init === 'function') {
                            Essential_Audio.init();
                        }
                    });
    
                    // Load the video player only for 'news'
                    if (url.includes('news')) {
                        loadScript('/js/videoplayer.js', () => {
                            if (typeof VideoPlayer !== 'undefined' && typeof VideoPlayer.init === 'function') {
                                VideoPlayer.init();
                            }
                        });
                    }
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
                loadContent('dynamic-content1', `/${page}.html`);
                showPage(overlayPage);
            });
        });

        overlayPage.addEventListener('click', event => {
            const insideLink = event.target.closest('.inside-link[data-inside-page]');
            if (insideLink) {
                event.preventDefault();
                const insidePage = insideLink.getAttribute('data-inside-page');
        
                // Preload specific images based on the inside page
                if (insidePage === 'posts/ptbk') {
                    preloadImages(['https://maxsheridan.com/assets/images/press_the_button_kim.webp']);
                } else if (insidePage === 'posts/why') {
                    preloadImages(['https://maxsheridan.com/assets/images/why.webp']);
                } else if (insidePage === 'posts/iknew') {
                    preloadImages(['https://maxsheridan.com/assets/images/i_knew.webp']);
                }
        
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