(function() {
    if (window.self === window.top) { // Check if the page is opened independently (not inside the index page)
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'ABC Diatype';
                src: url('/assets/type/ABC_Diatype.woff2') format('woff2');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'ABC Diatype Medium';
                src: url('/assets/type/ABC_Diatype_Medium.woff2') format('woff2');
                font-weight: 500;
                font-style: normal;
                font-display: swap;
            }

            :root {
                --body-font: 'ABC Diatype', Helvetica, Arial, sans-serif;
                --body-font-size: clamp(1.1rem,3vw,1.125rem);
                --body-font-size-small: clamp(.85rem,3vw,.95rem);
                --heading-font: 'ABC Diatype Medium', Helvetica, Arial, sans-serif;
                --primary-color: #111;
                --overlay-accent: blue;
                --highlight-color: yellow;
                --background-color: whitesmoke;
            }

            /*Structure*/

            * {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
            }

            html {
                font-size: 16px;
                cursor: url('/assets/graphics/point.svg') 5 -5, auto;
            }    

            html a:hover, button:hover {
                cursor: url('/assets/graphics/hover.svg') 5 -5, auto;
            }

            body {
                min-height: 100vh;
                min-height: 100dvh;
                -ms-text-size-adjust: none;
                -moz-text-size-adjust: none;
                -webkit-text-size-adjust: none;
                text-size-adjust: none;
                background: var(--background-color);
            } 

            .content { 
                max-width: 38rem;
                margin: 0 auto;
                padding: 5.5rem 0;
                color: var(--primary-color);
            }
                
            section:not(:last-of-type) {
                padding-bottom: clamp(2rem,3vw,4rem);
            }

            .intro {
                margin: 2rem 0;
            }

            /*Type*/

            p, li {
                font-family: var(--body-font);
                font-size: var(--body-font-size);
                line-height: 1.5;
                margin: 0 0 1rem;
            }

            p.small {
                font-size: clamp(.8rem,3vw,.9rem);
            }

            a {
                display: inline; 
                position: relative;
                line-height: 1.5;
                text-decoration: none;
                color: var(--primary-color);
            }

            a:not(header a):not(footer a):not(li a), .link a, button[type="submit"] {
                background-image: linear-gradient(transparent 80%, var(--overlay-accent) 80%);
                background-size: 100% 10px;
                background-repeat: repeat-x;
                background-position: 0 100%;
                padding-bottom: .15rem;
            }

            a:hover {
                text-shadow: 0 0 10px var(--highlight-color), 0 0 15px var(--highlight-color), 0 0 20px var(--highlight-color);
            }

            li:not(.link) {
                list-style: none;
                pointer-events: none;
            }

            li.link {
                list-style: none;
            }

            li span {
                color: var(--overlay-accent);
            }

            h2 {
                font-family: var(--body-font);
                font-size: clamp(1.6rem,3vw,1.85rem);
                line-height: 1.2;
                margin: 0 0 1rem;
            }

            h1 {
                font-family: var(--heading-font);
                font-size: clamp(2rem,3vw,2.5rem);
                margin: 0 0 2rem;
            }

            blockquote {
                margin: 3rem auto;
                padding: 0 .5rem 0 .5rem;
            }

            hr {
                display: block;
                height: 5px;
                border: 0;
                background: var(--primary-color);
            }

            /* SVGs*/

            .graphic {
                height: clamp(2.5rem,3vw,3rem);
                width: auto;
            }

            .dark-mode .graphic {
                filter: brightness(0) saturate(100%) invert(100%) sepia(93%) saturate(344%) hue-rotate(263deg) brightness(116%) contrast(92%);
            }

            .finger {
                text-align: center;
                margin-top: clamp(3rem,3vw,45em);
                margin-bottom: clamp(3rem,3vw,5rem);
            }

            #coda {
                text-align: center;
                margin-top: 4rem;
            }
                
            /* All longform content, including TDC*/

            .intro {
                margin: 2rem 0;
            }

            .intro hr {
                margin: 0;
            }
                
            p.intro-text {
                font-size: clamp(1rem,3vw,1.05rem);
                line-height: 1.45;
                margin: 1rem 0;
}

            .longform blockquote {
                margin: 3rem auto;
                padding: 0 .5rem 0 .5rem;
            }

            /* TDC only */

            .heading {
                text-align: center;
                padding-top: 2rem;
            }

            .heading .graphic {
                margin-bottom: 1rem;
            }

            .heading h2 {
                margin-bottom: 1.5rem;
            }

            /* News classes and standalone posts */

            article:first-of-type p, p.date {
            margin-bottom: 0;
            }
            
            article:not(:last-of-type) {
                padding: 0 0 5rem;
            }

            article:not(:last-of-type)::after {
                display: block;
                height: 5rem;
                border-bottom: 2px solid var(--primary-color);
                content: "";
            }

            .visual img,
            .visual video:not(.player) {
                display: flex;
                justify-content: center;
                width: 100%;
                height: auto;
                border-radius: .5rem .5rem .5rem .5rem;
                margin: .5rem 0 2.5rem;
            }

            .news blockquote {
                margin: 2rem auto;
                padding: 0;
            }

            .news blockquote.audio {
                margin: 2rem auto 2.5rem;
            }

            .news blockquote h2 {
                padding-left: 1rem;
                border-left: 4px solid var(--overlay-accent);
                font-size: clamp(1.1rem,3vw,1.2rem); 
                line-height: 1.5;
                text-transform: uppercase;
                color: var(--primary-color);
            }

            .source {
                text-align: right;
            }

            .source:before {
                content:"—";
            }

            /********** Essential Audio Player 2.1 CSS **********/

            /****************************************/
            /*                                      */
            /*         Section 1: The Looks         */
            /*                                      */
            /****************************************/

            /* 1. The Main Container */
            div.essential_audio {
                position: relative;
                z-index: 10;
                width: 100%;
                margin: 2rem 0 2rem;
            }

            /* 2. The Player Button – General */
            div.essential_audio > div:nth-child(1) div {
                width: 24px;
                height: 24px;
                margin-top: -12px;
                border-radius: 50%;
                background-color: var(--overlay-accent);
            }

            div.essential_audio > div:nth-child(1) div:after {
                position: absolute;
                top: 15%;
                left: 15%;
                width: 70%;
                height: 70%;
            }

            /* Set here how much the button exceeds the horizontal track limits: */
            /* This must not be deleted! (but can be changed, of course) */
            :root {
                --button-protrusion: 2px;
            }

            /* 2.a) The Player Button – Off */
            div.essential_audio > div:nth-child(1) div.off:after {
                content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><polygon fill='%23FFF' points='10,6.9 10,23.1 24,15' /></svg>");
            }

            /* 2.b) The Player Button – Loading */
            div.essential_audio > div:nth-child(1) div.load:after {
                content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><circle opacity='0.64' fill='%23FFFFFF' cx='6.5' cy='18.5' r='2'/><circle opacity='0.76' fill='%23FFFFFF' cx='6.5' cy='11.5' r='2'/><circle opacity='0.88' fill='%23FFFFFF' cx='11.5' cy='6.5' r='2'/><circle fill='%23FFFFFF' cx='18.5' cy='6.5' r='2'/><circle opacity='0.16' fill='%23FFFFFF' cx='23.5' cy='11.5' r='2'/><circle opacity='0.28' fill='%23FFFFFF' cx='23.5' cy='18.5' r='2'/><circle opacity='0.4' fill='%23FFFFFF' cx='18.5' cy='23.4' r='2'/><circle opacity='0.52' fill='%23FFFFFF' cx='11.5' cy='23.4' r='2'/></svg>");
                animation: audio_load_rotate 1s infinite linear;
            }
            @keyframes audio_load_rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* 2.c) The Player Button – Playing */
            div.essential_audio > div:nth-child(1) div.play {
                background-color: var(--overlay-accent)!important;
            }
            div.essential_audio > div:nth-child(1) div.play:after {
                content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><rect fill='%23FFF' x='17' y='8' width='3' height='14' /><rect fill='%23FFF' x='10' y='8' width='3' height='14'/></svg>");
            }

            /* 2.d) The Player Button – Dragging */
            div.essential_audio > div:nth-child(1) div.drag {
                transition: left 0s!important;
                /*
                cursor: grab!important;
                */
            }

            /* 2.e) The Player Button – Error */
            div.essential_audio > div:nth-child(1) div.error {
                background-color: hsla(0, 0%, 0%, 0.35)!important;
            }
            div.essential_audio > div:nth-child(1) div.error:after {
                content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path fill='%23FFF' d='M13.9,18.6c0-0.3,0-0.5,0-0.9c0-1.6,0.6-2.9,2.1-3.9l1.1-0.8c0.9-0.6,1.3-1.5,1.3-2.4c0-1.5-1-2.8-3-2.8c-2.2,0-3.1,1.6-3.1,3.2c0,0.2,0,0.4,0,0.5L10,11.9c-0.1-0.3-0.1-0.8-0.1-1.2c0-2.3,1.7-5.1,5.5-5.1c3.5,0,5.5,2.5,5.5,5c0,2-1.1,3.4-2.5,4.3l-1.2,0.8c-0.8,0.5-1.1,1.4-1.1,2.4c0,0.1,0,0.2,0,0.5H13.9z'/><path fill='%23FFF' d='M15,20.8c1,0,1.8,0.8,1.8,1.8S16,24.4,15,24.4c-1,0-1.8-0.8-1.8-1.8S14,20.8,15,20.8z'/></svg>");
            }

            /* 3. The Track */
            div.essential_audio > div:nth-child(2) {
                height: 2px;
            }


            /* 4. The Loading Progress Bar */
            div.essential_audio > div:nth-child(2) div {
                background-color: gray;
            }

            div.essential_audio > div:nth-child(2):after {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10;
                width: 100%;
                height: 100%;
                background-color: gray;
                opacity: .25;
                content: "";
            }

            /* 5. The Click & Drag Sensor */
            div.essential_audio > div:nth-child(3) {
                height: 18px;
                margin-top: -8px;
            }

            /****************************************/
            /*                                      */
            /*        Section 2: Core Values        */
            /*                                      */
            /****************************************/

            /* 1. The Main Container + General Settings */
            div.essential_audio,
            div.essential_audio * {
                user-select: none;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                -webkit-overflow-scrolling: auto;
            }
            div.essential_audio *:focus {
                outline: none;
            }

            /* 2. The Player Button */
            div.essential_audio > div:nth-child(1) div {
                position: absolute;
                top: 0;
                left: 0;
                cursor: pointer;
            }

            /* 2.a) Container for Player Button */
            div.essential_audio > div:nth-child(1) {
                position: absolute;
                z-index: 13;
                top: 0;
                left: calc(var(--button-protrusion) * -1);
                width: calc(100% + (2 * var(--button-protrusion)));
                height: 0;
            }

            /* 3. The Track */
            div.essential_audio > div:nth-child(2) {
                position: relative;
                width: 100%;
                overflow: hidden;
                border-radius: .25rem .25rem .25rem .25rem;
            }

            /* 4. The Loading Progress Bar */
            div.essential_audio > div:nth-child(2) div {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 11;
                width: 0%;
                height: 100%;
                transition: width 0.5s;
            }

            /* 5. The Click & Drag Sensor */
            div.essential_audio > div:nth-child(3) {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 12;
                width: 100%;
            }

            /********** Essential Video Player 1.0 CSS **********/

            .video-player {
                max-width: 100%;
                margin: 0 0 2.5rem;
                padding: .75rem;
                border: 1px solid #ccc;
                border-radius: .25rem;
                box-shadow: 0 0 .25rem hsla(0, 0%, 0%, 0.1);
                background-color: transparent;
            }

            video {
                display: block;
                object-fit: cover;
                width: 100%;
            }

            .controls {
                display: flex;
                align-items: center;
                margin-top: .5rem;
            }

            .play-pause {
                width: 24px;
                height: 24px;
                margin-right: .5rem;
                border: none;
                border-radius: 50%;
                background-color: var(--overlay-accent);
                background-image: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><polygon fill='%23FFF' points='10,6.9 10,23.1 24,15'/></svg>");
                background-repeat: no-repeat;
                background-position: center;
                background-size: 65%;
                cursor: pointer;
            }

            .play-pause.pause {
                background-image: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><rect fill='%23FFF' x='17' y='8' width='3' height='14' /><rect fill='%23FFF' x='10' y='8' width='3' height='14'/></svg>");
            }

            .progress {
                position: relative;
                width: 100%;
                height: 2px;
                border-radius: .25rem;
                background-color: hsla(0, 0%, 0%, 0.15);
                cursor: pointer;
            }

            .progress-filled {
                width: 0;
                height: 100%;
                border-radius: .25rem;
                background-color: var(--background-color);
            }

            .progress {
                position: relative;
            }

            .progress input {
                position: absolute;
                top: -11px;
                width: 100%;
                height: 24px;
                background: transparent;
                appearance: none;
                box-sizing: border-box;
                padding: 0;
                margin: 0;
            }

            .progress input::-webkit-slider-thumb {
                width: 12px;
                height: 12px;
                border: none;
                background-color: var(--overlay-accent);
                border-radius: 50%;
                appearance: none;
                cursor: pointer;
            }

            .progress input::-moz-range-thumb {
                width: 12px;
                height: 12px;
                border: none;
                background-color: var(--overlay-accent);
                border-radius: 50%;
                appearance: none;
                cursor: pointer;
            }

            .dropcap {
                float: left;
                padding: .75rem .5rem .75rem 0rem;
                font-size: 7rem;
                font-weight: 800;
                line-height: 4.5rem;
            }

            .blink {
                -webkit-animation-name: blink;
                -webkit-animation-duration: 1s;
                -webkit-animation-iteration-count: infinite;
                animation-name: blink;
                animation-duration: 1s;
                animation-iteration-count: infinite;
            }

            @keyframes blink {
                0%, 15% {
                    opacity: 0;
                }
                16%, 100% {
                    opacity: 1;
                }
            }

            @-webkit-keyframes blink {
                0%, 15% {
                    opacity: 0;
                }
                16%, 100% {
                    opacity: 1;
                }
            }

            .hover-title {
                display: inline;
                pointer-events: auto;
                cursor: unset;
            }

            .hover-image {
                display: none;
            }

            /* Info and contact form */

            #info p {
                margin: 0;
            }

            form {
                width: 100%;
                max-width: 32rem;
                padding: 2rem 0;
            }

            label {
                font-family: var(--body-font);
                color: var(--primary-color);
            }

            input {
                width: 100%;
                margin: .5rem 0 2rem;
                padding: 1rem .5rem 1rem .5rem;
                border: none;
                border-radius: .15rem .15rem .15rem .15rem;
                font-family: var(--body-font);
                font-size: .95rem;
            }

            textarea {
                min-width: 100%;
                max-width: 100%;
                min-height: 100px;
                max-height: 600px;
                margin: .5rem 0 1rem;   
                padding: 1rem .5rem 1rem .5rem;
                border: none;
                border-radius: .15rem .15rem .15rem .15rem;
                font-family: var(--body-font);
                font-size: .95rem;
                background-color: white;
            }

            button {
                border: none;
                background: none;
                font-family: var(--body-font);
                font-size: var(--body-font-size);
                color: var(--primary-color);
            }

            button:hover {
                text-shadow: 0 0 10px var(--highlight-color), 0 0 15px var(--highlight-color), 0 0 20px var(--highlight-color);
            }

            ::placeholder {
                color: #808080;
                text-decoration: line-through;
                opacity: .4;
            }

            /*Thanks message*/

            form p {
                font-family: var(--body-font);
                font-size: clamp(1.063rem,3vw,1.125rem);
                text-align: center;
                color: var(--primary-color);
            }

            @media (max-width: 768px) {
                .content {
                    padding: 2rem 1rem;
                }
            }
        `;
        document.head.appendChild(style); // Injects the CSS into the document head
    }
})();