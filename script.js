class Player {

    constructor(_element) {
        this.element = _element
        this.audioElement = this.element.querySelector('.js-audio')
        console.log(this.audioElement);


        this.setPlayPause()
        this.setSeekBar()
        this.setVolume()
        this.fifteenSeconds()
        this.displayPlaylist()
        this.playlistKeyCodes()
        this.replaySong()


    }





    /**
     * CONTAINER 1 --------------------------------
     */

    /**
     * Seek bar code
     */

    setSeekBar() {
        const seekBarElement = this.element.querySelector('.js-seek-bar')
        const fillElement = this.element.querySelector('.js-seek-bar-fill')

        this.audioElement.addEventListener('timeupdate', () => {
            const ratio = this.audioElement.currentTime / this.audioElement.duration
            fillElement.style.transform = `scaleX(${ratio})`
        })

        seekBarElement.addEventListener('click', (_event) => {
            const bounding = seekBarElement.getBoundingClientRect()
            const ratio = (_event.clientX - bounding.left) / bounding.width
            const time = ratio * this.audioElement.duration

            this.audioElement.currentTime = time


        })

    }





    /**
     *  Volume method
     */
    setVolume()
    {
        const volumeUpElement = this.element.querySelector('.js-volume-up')
        const volumeDownElement = this.element.querySelector('.js-volume-down')

        // Volume Up
        volumeUpElement.addEventListener('click', ()=>
        {
            this.audioElement.volume = Math.min(this.audioElement.volume + 0.2, 1)
        })

        // Volume Down
        volumeDownElement.addEventListener('click', ()=>
        {
            this.audioElement.volume = Math.max(this.audioElement.volume - 0.2, 0)
        })
    }


    /**
     * END --- CONTAINER 1 --------------------------------
     */
    /**
     * 
     */
    /**
     *  CONTAINER 2 ----------------------
     */




    /***
     * Play Pause
     */
    setPlayPause() {
        const playElement = this.element.querySelector('.js-play')
        const pauseElement = this.element.querySelector('.js-pause')

        playElement.addEventListener('click', () => {
            this.audioElement.play()
            playElement.classList.toggle('play')
            playElement.classList.toggle('hidden')
            pauseElement.classList.toggle('hidden')
        })



        pauseElement.addEventListener('click', () => {
            this.audioElement.pause()
            playElement.classList.toggle('play')
            pauseElement.classList.toggle('hidden')
            playElement.classList.toggle('hidden')

        })

    }



    /**
     *  15s button
     */
    fifteenSeconds() {
        const fifteenBefore = this.element.querySelector('.js-fifteen-before')
        fifteenBefore.addEventListener('click', () => {
            this.audioElement.currentTime -= 15
        })


        const fifteenAfter = this.element.querySelector('.js-fifteen-after')
        fifteenAfter.addEventListener('click', () => {
            this.audioElement.currentTime += 15
        })
    }




    /**
     *  Display Playlist
     */
    displayPlaylist() {
        const displayPlaylist = this.element.querySelector('.js-display-playlist')
        const container3 = this.element.querySelector('.container3')
        const volButtonUp = this.element.querySelector('.js-volume-up')
        const volButtonDown = this.element.querySelector('.js-volume-down')
        displayPlaylist.addEventListener('click', () => {
            if (container3.classList.contains('hidden')) {
                container3.classList.remove('hidden')
                volButtonUp.classList.add('hidden')
                volButtonDown.classList.add('hidden')

            } else {
                container3.classList.toggle('hidden')
                volButtonUp.classList.toggle('hidden')
                volButtonDown.classList.toggle('hidden')
            }

        })
    }




    /**
     *  Stop method
     */
    replaySong() {
        const replayButton = this.element.querySelector('.js-replay')
        replayButton.addEventListener('click', () => {
            this.audioElement.currentTime = 0.0

        })
    }






    /**
     * END --- CONTAINER 2 --------------------------------
     */
    /**
     * 
     */
    /**
     *  CONTAINER 3 --------------------------------
     */


    /**
     *  Playlist working with keycodes
     */

    playlistKeyCodes() {
        function removeTransition(e) {
            if (e.propertyName !== 'transform') return;
            e.target.classList.remove('playing');
        }

        function playSound(e) {
            const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
            const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
            if (!audio) return;

            key.classList.add('playing');
            audio.currentTime = 0;
            audio.play();
        }

        const keys = Array.from(document.querySelectorAll('.key'));
        keys.forEach(key => key.addEventListener('transitionend', removeTransition));
        window.addEventListener('keydown', playSound);
    }




    /**
     *  END - CONTAINER 3 ----------------------
     */


} //fin objet

/**
 * init
 */

const player = new Player(document.querySelector('.js-player'))


const overlay = document.querySelector('.js-overlay')

function fade() {
    setTimeout(function () {
        overlay.classList.add('hidden')
    }, 1109);
}

overlay.addEventListener('click', () => {
    overlay.classList.add('hidden-overlay')
    fade()
})