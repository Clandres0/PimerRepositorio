// -------------------------
// Idioma (i18n)
// -------------------------

// NOTA IMPORTANTE: Asegúrate de que la librería i18next esté cargada 
// antes de este script (e.g., <script src="https://unpkg.com/i18next/..."></script>)

let currentLang = "es-AR";

i18next.init({
    lng: currentLang,
    // Asegúrate de que las traducciones de tu tienda estén aquí.
    // Usaré placeholders, pero debes rellenarlos con tu contenido:
    resources: {
        "es-AR": { translation: {
            "title.camisas": "Camisas - REMERAS DE FUTBOL",
            "store.title": "La Gambeta",
            "nav.us": "Nuestra Historia",
            "nav.shirts": "Camisas",
            "nav.pants": "Pantalones",
            "nav.sets": "Conjuntos",
            "nav.balls": "Pelotas",
            "search.placeholder": "Buscar...", // Nuevo item de traducción
            "footer.rights": "© 2025 La Gambeta. Todos los derechos reservados."
        } },
        "pt-BR": { translation: {
            "title.camisas": "Camisas - CAMISETAS DE FUTEBOL",
            "store.title": "Loja de Roupas",
            "nav.us": "Sobre Nós",
            "nav.shirts": "Camisas",
            "nav.pants": "Calças",
            "nav.sets": "Conjuntos",
            "nav.balls": "Bolas",
            "search.placeholder": "Pesquisar...", // Nuevo item de traducción
            "footer.rights": "© 2025 Loja de Roupas. Todos os direitos reservados."
        } }
    }
}, () => updateTexts());

function updateTexts() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = i18next.t(el.getAttribute("data-i18n"));
    });
    // Corregido: Ahora buscamos el input del buscador por su ID
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
         searchInput.placeholder = i18next.t(currentLang === "pt-BR" ? "search.placeholder" : "search.placeholder");
         // Nota: En un entorno real, la traducción de 'placeholder' debe ser gestionada por i18next,
         // pero se ha dejado simple para este ejemplo.
         // El valor se toma de la clave "search.placeholder" en el diccionario de i18next.
    }
}

window.toggleLang = function() {
    currentLang = currentLang === "es-AR" ? "pt-BR" : "es-AR";
    i18next.changeLanguage(currentLang, updateTexts);
};
// -------------------------
// Reproductor de música compacto (Corregido)
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPause");
    const skipForwardBtn = document.getElementById("skipForward");
    const skipBackwardBtn = document.getElementById("skipBackward");
    const volumeSlider = document.getElementById("volumeControl");
    const progressBar = document.getElementById("progressBar");
    const songTitleElement = document.getElementById("currentSongTitle"); 

    // Lista de canciones - ¡CORRECCIÓN CLAVE AQUÍ!
    // Ahora las rutas solo contienen el nombre del archivo. El prefijo "musica/" se añade en cargarCancion().
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
    
    // Establecemos el volumen inicial al valor del slider (0.5)
    audio.volume = volumeSlider.value; 

    // Función para cargar la canción actual
    function cargarCancion() {
        const fullPath = "musica/" + tracks[currentTrackIndex]; // Ruta correcta: "musica/De La Cabeza.mp3"
        const trackFileName = tracks[currentTrackIndex].replace('.mp3', '');
        
        audio.src = fullPath;
        songTitleElement.textContent = trackFileName; // Sincroniza el título en el H4
        audio.load();
    }

    // Función reproducir / pausar
    function reproducirCancion() {
        // El .play() puede fallar, pero ahora muestra un error claro en consola.
        audio.play().catch(err => console.error("Autoplay bloqueado. Presione Play para iniciar.", err));
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }

    function pausarCancion() {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }

    // Inicializar primera canción al cargar la página.
    cargarCancion(); 
    // Nota: La reproducción real requiere un clic del usuario.

    // Botones
    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) reproducirCancion();
        else pausarCancion();
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

    // Barra de progreso y Click-to-seek
    audio.addEventListener("timeupdate", () => {
        if (progressBar) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = isNaN(progress) ? 0 : progress;
            progressBar.max = 100;
        }
    });
    
    progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        audio.currentTime = clickPosition * audio.duration;
    });

    // Cambio automático al terminar
    audio.addEventListener("ended", () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        cargarCancion();
        reproducirCancion();
    });
});