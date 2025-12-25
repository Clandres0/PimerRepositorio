document.addEventListener("DOMContentLoaded", () => {

    /*REPRODUCTOR DE MÚSICA */
    const audio = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPause");
    const skipForwardBtn = document.getElementById("skipForward");
    const skipBackwardBtn = document.getElementById("skipBackward");
    const volumeSlider = document.getElementById("volumeControl");
    const progressBar = document.getElementById("progressBar");
    const songTitleElement = document.getElementById("currentSongTitle");

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

    let currentTrackIndex = 0;
    audio.volume = volumeSlider.value;

    function cargarCancion() {
        audio.src = "musica/" + tracks[currentTrackIndex];
        songTitleElement.textContent = tracks[currentTrackIndex].replace(".mp3", "");
        audio.load();
    }

    function reproducirCancion() {
        audio.play().catch(() => {});
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }

    function pausarCancion() {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }

    cargarCancion();

    playPauseBtn.addEventListener("click", () => {
        audio.paused ? reproducirCancion() : pausarCancion();
    });

    skipForwardBtn.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        cargarCancion();
        reproducirCancion();
    });

    skipBackwardBtn.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        cargarCancion();
        reproducirCancion();
    });

    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value;
    });

    audio.addEventListener("timeupdate", () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = isNaN(progress) ? 0 : progress;
    });

    progressBar.addEventListener("click", e => {
        const rect = progressBar.getBoundingClientRect();
        audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    });

    audio.addEventListener("ended", () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        cargarCancion();
        reproducirCancion();
    });

document.querySelectorAll(".mySwiperProductos").forEach(swiperEl => {
    new Swiper(swiperEl, {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        speed: 800,
        navigation: {
            nextEl: swiperEl.querySelector(".swiper-button-next"),
            prevEl: swiperEl.querySelector(".swiper-button-prev")
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
});

});
function changeSlide(dot, index) {
    const card = dot.closest(".product-card");
    if (!card) return;

    const slides = card.querySelectorAll(".slide");
    const dots = card.querySelectorAll(".dot");

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dot.classList.add("active");
}
