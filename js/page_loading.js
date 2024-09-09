let activePage = null; // Track the currently active page

function fadeInImages(images) {
    images.forEach(img => {
        if (!img.closest('.graphic')) {
            img.classList.add('fade-in');
            img.onload = () => {
                img.classList.add('loaded');
                console.log(`Image loaded and added loaded class: ${img.src}`);
            };

            if (img.complete) {
                img.classList.add('loaded');
                console.log(`Image already loaded and added loaded class: ${img.src}`);
            }
        }
    });
}

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
                const images = Array.from(contentDiv.querySelectorAll('img:not(.graphic img)'));
                fadeInImages(images);

                // Initialize the audio player
                if (typeof Essential_Audio !== 'undefined') {
                    console.log('Essential_Audio is defined');
                    if (typeof Essential_Audio.init === 'function') {
                        console.log('Calling Essential_Audio.init()');
                        Essential_Audio.init();
                    } else {
                        console.error('Essential_Audio.init is not a function');
                    }
                } else {
                    console.error('Essential_Audio is not defined');
                }

                // Initialize the video player
                if (typeof VideoPlayer !== 'undefined') {
                    console.log('VideoPlayer is defined');
                    if (typeof VideoPlayer.init === 'function') {
                        console.log('Calling VideoPlayer.init()');
                        VideoPlayer.init();
                    } else {
                        console.error('VideoPlayer.init is not a function');
                    }
                } else {
                    console.error('VideoPlayer is not defined');
                }

                contentDiv.classList.remove('hidden'); // Show the content once it's fully loaded
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
        pageElement.classList.remove('hidden');
        pageElement.classList.add('active');
        activePage = pageElement; // Update the currently active page
        document.querySelector('.close-btn').style.display = 'flex';
        document.querySelector('.dark-mode-toggle').style.display = 'flex';
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
        if (!document.querySelector('.overlay.active') && !document.querySelector('.nested.active')) {
            document.querySelector('.close-btn').style.display = 'none';
            document.querySelector('.dark-mode-toggle').style.display = 'none';
        }
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

window.addEventListener('load', () => {
    const images = document.querySelectorAll('img:not(.graphic img)');
    fadeInImages(Array.from(images));

    // Set up MutationObserver to watch for new images
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeName === 'IMG' && !node.closest('.graphic')) {
                        fadeInImages([node]);
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        const images = node.querySelectorAll('img:not(.graphic img)');
                        fadeInImages(Array.from(images));
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});