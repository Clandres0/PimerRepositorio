document.addEventListener("DOMContentLoaded", () => {

    /*REPRODUCTOR DE MÚSICA*/

    const audio = document.getElementById("audioPlayer");
    if (audio) {
        const playPauseBtn = document.getElementById("playPause");
        const nextBtn = document.getElementById("skipForward");
        const prevBtn = document.getElementById("skipBackward");
        const volumeSlider = document.getElementById("volumeControl");
        const progressBar = document.getElementById("progressBar");
        const title = document.getElementById("currentSongTitle");

        const tracks = [
            "De La Cabeza.mp3",
            "Danza De Los Muertos Pobres.mp3",
            "El Viejo De Arriba.mp3",
            "Hociquito De Ratón.mp3",
            "La Bolsa.mp3",
            "Murguita Del Sur.mp3",
            "Perro Amor Explota.mp3",
            "Yo Tomo.mp3"
        ];

        let index = 0;

        function loadTrack() {
            audio.src = `musica/${tracks[index]}`;
            title.textContent = tracks[index].replace(".mp3", "");
            audio.load();
        }

        function play() {
            audio.play().catch(() => {});
            playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        }

        function pause() {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        }

        loadTrack();
        audio.volume = volumeSlider.value;

        playPauseBtn.addEventListener("click", () => {
            audio.paused ? play() : pause();
        });

        nextBtn.addEventListener("click", () => {
            index = (index + 1) % tracks.length;
            loadTrack();
            play();
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + tracks.length) % tracks.length;
            loadTrack();
            play();
        });

        volumeSlider.addEventListener("input", () => {
            audio.volume = volumeSlider.value;
        });

        audio.addEventListener("timeupdate", () => {
            if (!isNaN(audio.duration)) {
                progressBar.value = (audio.currentTime / audio.duration) * 100;
            }
        });

        progressBar.addEventListener("input", () => {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        });

        audio.addEventListener("ended", () => {
            index = (index + 1) % tracks.length;
            loadTrack();
            play();
        });
    }

    /*SWIPER DE PRODUCTOS*/

    document.querySelectorAll(".swiper").forEach(swiperEl => {

        if (!swiperEl.classList.contains("mySwiperProductos") &&
            !swiperEl.classList.contains("mySwiperNuevos")) return;

        new Swiper(swiperEl, {
            loop: false,
            spaceBetween: 24,
            grabCursor: true,
            navigation: {
                nextEl: swiperEl.querySelector(".swiper-button-next"),
                prevEl: swiperEl.querySelector(".swiper-button-prev"),
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                600: {
                    slidesPerView: 2
                },
                900: {
                    slidesPerView: 3
                },
                1200: {
                    slidesPerView: 4
                }
            }
        });
    });

});
