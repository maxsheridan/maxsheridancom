"use strict";

var VideoPlayer = (() => {
    function init() {
        const video = document.getElementById('video');
        const playPauseButton = document.getElementById('play-pause');
        const progressBar = document.getElementById('progress');
        const progressFilled = document.getElementById('progress-filled');

        function togglePlayPause() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            updatePlayPauseAriaLabel();
        }

        function updatePlayPauseButton() {
            if (video.paused) {
                playPauseButton.classList.remove('pause');
                playPauseButton.classList.add('play');
            } else {
                playPauseButton.classList.remove('play');
                playPauseButton.classList.add('pause');
            }
        }

        function updatePlayPauseAriaLabel() {
            if (video.paused) {
                playPauseButton.setAttribute('aria-label', 'Play video');
            } else {
                playPauseButton.setAttribute('aria-label', 'Pause video');
            }
        }

        function updateProgress() {
            const progress = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = `${progress}%`;
            progressBar.value = progress;
        }

        function seekVideo() {
            const seekTime = (progressBar.value / 100) * video.duration;
            video.currentTime = seekTime;
            updateProgress();
        }

        function handleTouchEvent(e) {
            const touch = e.touches[0];
            const seekTime = ((touch.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth) * video.duration;
            seekVideo(seekTime);
        }

        playPauseButton.addEventListener('click', togglePlayPause);
        video.addEventListener('play', updatePlayPauseButton);
        video.addEventListener('pause', updatePlayPauseButton);
        video.addEventListener('play', updatePlayPauseAriaLabel);
        video.addEventListener('pause', updatePlayPauseAriaLabel);
        video.addEventListener('timeupdate', updateProgress);
        progressBar.addEventListener('input', seekVideo);
        progressBar.addEventListener('change', updateProgress);
        progressBar.addEventListener('touchstart', handleTouchEvent);
        progressBar.addEventListener('touchmove', handleTouchEvent);
    }

    // Expose the init function to the global scope
    window.VideoPlayer = { init };

    return { init };
})();