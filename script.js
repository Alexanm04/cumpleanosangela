// 🎥 Configuración de videos con información completa
const videos = [
  { 
    src: "video11.mp4", 
    title: "Mensaje de Ana 💕", 
    thumbnail: "jul725.png",
    person: "Ana"
  },
  { 
    src: "video12.mp4", 
    title: "Sorpresa de Laura 🎉", 
    thumbnail: "jul125.jpg",
    person: "Laura"
  },
  { 
    src: "video9.mp4", 
    title: "Recuerdo de Petra 🌸", 
    thumbnail: "aug225.jpg",
    person: "Marta"
  }
];

// 📸 CONFIGURACIÓN DE GALERÍAS PERSONALES
const personalGalleries = {
  ana: {
    name: "Ana 💕",
    photos: [
      { src: "ana/foto1.jpg", caption: "Nuestra primera aventura juntas ✨" },
      { src: "ana/foto2.jpg", caption: "Ese día que no paramos de reír 😂" },
      { src: "ana/foto3.jpg", caption: "Siempre serás mi persona favorita 💖" },
      { src: "ana/foto4.jpg", caption: "Recuerdos que atesoro para siempre 🌟" },
      { src: "ana/foto5.jpg", caption: "¡Feliz cumpleaños, bestie! 🎂" }
    ],
    videos: [
      { src: "ana/video1.mp4", caption: "Mensaje especial de cumpleaños 💕", thumbnail: "ana/video1_thumb.jpg" },
      { src: "ana/video2.mp4", caption: "Recordando momentos divertidos 🎉", thumbnail: "ana/video2_thumb.jpg" }
    ]
  },
  laura: {
    name: "Laura 🌸",
    photos: [
      { src: "laura/foto1.jpg", caption: "Nuestros días de aventura 🌈" },
      { src: "laura/foto2.jpg", caption: "Siempre juntas en las buenas y malas 💪" },
      { src: "laura/foto3.jpg", caption: "Momentos que no tienen precio 💎" },
      { src: "laura/foto4.jpg", caption: "Mi compañera de vida 👭" },
      { src: "laura/foto5.jpg", caption: "Eres increíble, nunca cambies ✨" },
      { src: "laura/foto6.jpg", caption: "Gracias por tantos momentos 🙏" },
      { src: "laura/foto7.jpg", caption: "¡Que cumplas muchos más! 🎊" },
      { src: "laura/foto8.jpg", caption: "Con amor, tu amiga Laura 💕" }
    ],
    videos: [
      { src: "laura/video1.mp4", caption: "Felicitación especial 🎂", thumbnail: "laura/video1_thumb.jpg" },
      { src: "laura/video2.mp4", caption: "Recuerdos de nuestros viajes 🚗", thumbnail: "laura/video2_thumb.jpg" },
      { src: "laura/video3.mp4", caption: "Mensaje del corazón ❤️", thumbnail: "laura/video3_thumb.jpg" }
    ]
  },
  marta: {
    name: "Marta ✨",
    photos: [
      { src: "marta/foto1.jpg", caption: "Las risas nunca faltan contigo 😄" },
      { src: "marta/foto2.jpg", caption: "Eres luz en los días grises ☀️" },
      { src: "marta/foto3.jpg", caption: "Momentos únicos e irrepetibles 🌺" },
      { src: "marta/foto4.jpg", caption: "Mi alma gemela de aventuras 🦋" },
      { src: "marta/foto5.jpg", caption: "Gracias por ser tan especial 💫" },
      { src: "marta/foto6.jpg", caption: "¡Feliz cumpleaños, preciosa! 🎁" }
    ],
    videos: [
      { src: "marta/video1.mp4", caption: "Dedicatoria especial 🌟", thumbnail: "marta/video1_thumb.jpg" },
      { src: "marta/video2.mp4", caption: "Nuestros momentos más divertidos 🎭", thumbnail: "marta/video2_thumb.jpg" }
    ]
  },
  otros: {
    name: "Más Amigos 👥",
    photos: [
      { src: "grupo/foto1.jpg", caption: "El grupo completo 👫👫" },
      { src: "grupo/foto2.jpg", caption: "Celebraciones inolvidables 🎉" },
      { src: "grupo/foto3.jpg", caption: "Siempre unidos 🤝" },
      { src: "grupo/foto4.jpg", caption: "Momentos de pura felicidad 😊" },
      { src: "grupo/foto5.jpg", caption: "Aventuras grupales 🌟" },
      { src: "grupo/foto6.jpg", caption: "Recuerdos para toda la vida 📸" },
      { src: "grupo/foto7.jpg", caption: "La mejor compañía 💕" },
      { src: "grupo/foto8.jpg", caption: "Unidos por la amistad 🌈" },
      { src: "grupo/foto9.jpg", caption: "Momentos mágicos juntos ✨" },
      { src: "grupo/foto10.jpg", caption: "¡Feliz cumpleaños de todo el grupo! 🎂" }
    ],
    videos: [
      { src: "grupo/video1.mp4", caption: "Mensaje grupal de felicitación 🎊", thumbnail: "grupo/video1_thumb.jpg" },
      { src: "grupo/video2.mp4", caption: "Recuerdos de fiestas pasadas 🕺💃", thumbnail: "grupo/video2_thumb.jpg" },
      { src: "grupo/video3.mp4", caption: "Momentos divertidos del grupo 😂", thumbnail: "grupo/video3_thumb.jpg" }
    ]
  }
};

// Variables globales
let isSpinning = false;
let isSpotifyMinimized = false;
let currentRotation = 0;
let currentGalleryPerson = '';

// 🎰 FUNCIONES DE LA RULETA (mantienen la funcionalidad anterior)
function createRoulettePhotos() {
  const container = document.getElementById("roulettePhotos");
  
  container.innerHTML = '';
  
  videos.forEach((video, index) => {
    const item = document.createElement('div');
    item.className = 'roulette-item';
    item.dataset.index = index;
    
    item.innerHTML = `
      <div class="video-preview">
        <div class="play-icon">▶️</div>
        <img src="${video.thumbnail}" 
             alt="${video.title}" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div class="placeholder-title" style="display:none; font-size:14px; color:#666; padding:20px;">${video.person}</div>
      </div>
      <h4>${video.title}</h4>
    `;
    
    container.appendChild(item);
  });
}

function startVideoRoulette() {
  if (isSpinning) return;
  
  console.log('🎰 Iniciando carrusel...');
  isSpinning = true;
  
  const currentVideo = document.getElementById("randomVideo");
  if (currentVideo && !currentVideo.paused) {
    currentVideo.pause();
    console.log('🔹 Video pausado al iniciar ruleta');
  }
  
  const startBtn = document.getElementById("startRouletteBtn");
  const container = document.getElementById("rouletteContainer");
  
  startBtn.style.display = "none";
  container.style.display = "block";
  
  createRoulettePhotos();
  
  setTimeout(() => {
    startCarouselAnimation();
  }, 500);
}

function startCarouselAnimation() {
  let currentIndex = 0;
  let speed = 80;
  const maxSpeed = 1000;
  const acceleration = 1.12;
  let totalSpins = 0;
  const maxTotalSpins = Math.floor(Math.random() * 25) + 35;
  
  function animateStep() {
    const items = document.querySelectorAll('.roulette-item');
    items.forEach((item, index) => {
      item.classList.remove('active');
      if (index === currentIndex) {
        item.classList.add('active');
      }
    });
    
    currentIndex = (currentIndex + 1) % videos.length;
    totalSpins++;
    
    console.log(`🎲 Foto ${totalSpins}/${maxTotalSpins}, velocidad: ${speed}ms, mostrando: ${videos[currentIndex === 0 ? videos.length - 1 : currentIndex - 1].person}`);
    
    if (totalSpins < maxTotalSpins) {
      if (totalSpins > maxTotalSpins * 0.6) {
        speed *= acceleration;
      }
      setTimeout(animateStep, speed);
    } else {
      const finalIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
      setTimeout(() => {
        finishCarousel(finalIndex);
      }, 800);
    }
  }
  
  const items = document.querySelectorAll('.roulette-item');
  if (items[0]) {
    items[0].classList.add('active');
  }
  
  setTimeout(animateStep, speed);
}

 document.querySelectorAll('.hidden-author').forEach(el => {
  el.addEventListener('click', () => {
    el.textContent = "— " + el.dataset.author;
    el.classList.remove('hidden-author');
    el.classList.add('revealed');
  });
});
function finishCarousel(finalIndex) {
  const selectedVideo = videos[finalIndex];
  
  console.log('🎯 Video seleccionado:', selectedVideo.title);
  
  const items = document.querySelectorAll('.roulette-item');
  items.forEach((item, index) => {
    item.classList.remove('active');
    if (index === finalIndex) {
      item.classList.add('winner');
      
      if (!item.querySelector('.winner-glow')) {
        const glow = document.createElement('div');
        glow.className = 'winner-glow';
        item.appendChild(glow);
      }
      if (!item.querySelector('.winner-text')) {
        const text = document.createElement('div');
        text.className = 'winner-text';
        text.innerHTML = '🎉 ¡SELECCIONADO! 🎉';
        item.appendChild(text);
      }
    }
  });
  
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  setTimeout(() => {
    const video = document.getElementById("randomVideo");
    const source = video.querySelector('source');
    
    source.src = selectedVideo.src;
    video.load();
    
    document.getElementById("videoRoulette").style.display = "none";
    document.getElementById("videoContainer").style.display = "block";
    
    window.scrollTo(0, currentScrollPosition);
    
    let scrollCheckInterval = setInterval(() => {
      if (window.pageYOffset !== currentScrollPosition) {
        window.scrollTo(0, currentScrollPosition);
      }
    }, 10);
    
    setTimeout(() => {
      clearInterval(scrollCheckInterval);
    }, 1000);
    
    video.play().catch(e => {
      console.log('ℹ️ Video cargado, usuario debe hacer clic para reproducir');
    });
    
    isSpinning = false;
    launchConfetti();
    
  }, 3000);
}

function showRoulette() {
  console.log('🎲 Iniciando nueva ruleta directamente');
  
  const currentVideo = document.getElementById("randomVideo");
  if (currentVideo && !currentVideo.paused) {
    currentVideo.pause();
    console.log('🔹 Video pausado antes de nueva ruleta');
  }
  
  isSpinning = false;
  
  const photosContainer = document.getElementById("roulettePhotos");
  photosContainer.innerHTML = '';
  
  document.getElementById("videoRoulette").style.display = "block";
  document.getElementById("videoContainer").style.display = "none";
  document.getElementById("startRouletteBtn").style.display = "none";
  document.getElementById("rouletteContainer").style.display = "block";
  
  setTimeout(() => {
    startVideoRoulette();
  }, 100);
}

function loadRandomVideo() {
  if (isSpinning) return;
  
  const randomIndex = Math.floor(Math.random() * videos.length);
  const video = document.getElementById("randomVideo");
  const source = video.querySelector('source');
  
  source.src = videos[randomIndex].src;
  video.load();
  video.play().catch(e => console.log('Video cargado'));
  
  document.getElementById("videoRoulette").style.display = "none";
  document.getElementById("videoContainer").style.display = "block";
}

// 📸 FUNCIONES DE GALERÍAS PERSONALES
function openPersonGallery(person) {
  if (!personalGalleries[person]) {
    console.error('Persona no encontrada:', person);
    return;
  }
  
  currentGalleryPerson = person;
  const gallery = personalGalleries[person];
  
  // Actualizar título del modal
  document.getElementById('galleryTitle').textContent = `Recuerdos de ${gallery.name}`;
  
  // Cargar fotos
  loadPersonalPhotos(person);
  
  // Cargar videos  
  loadPersonalVideos(person);
  
  // Mostrar modal
  document.getElementById('personalGalleryModal').style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevenir scroll del fondo
  
  // Asegurar que la pestaña de fotos esté activa
  switchTab('photos');
  
  console.log(`📸 Abriendo galería de ${gallery.name}`);
}

function closePersonGallery() {
  document.getElementById('personalGalleryModal').style.display = 'none';
  document.body.style.overflow = 'auto'; // Restaurar scroll
  currentGalleryPerson = '';
  console.log('❌ Cerrando galería personal');
}

function loadPersonalPhotos(person) {
  const gallery = personalGalleries[person];
  const container = document.getElementById('personalPhotos');
  
  container.innerHTML = '';
  
  if (!gallery.photos || gallery.photos.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No hay fotos disponibles todavía 📷</p>';
    return;
  }
  
  gallery.photos.forEach((photo, index) => {
    const item = document.createElement('div');
    item.className = 'media-item';
    item.onclick = () => openLightbox('photo', photo.src, photo.caption);
    
    item.innerHTML = `
      <img src="${photo.src}" 
           alt="${photo.caption}" 
           onerror="this.parentElement.innerHTML='<div style=\\"display:flex;align-items:center;justify-content:center;height:100%;background:#f0f0f0;color:#666;font-size:12px;text-align:center;\\">📷<br>Foto no disponible</div>';">
      <div class="media-overlay">
        <div>${photo.caption}</div>
      </div>
    `;
    
    container.appendChild(item);
  });
}

function loadPersonalVideos(person) {
  const gallery = personalGalleries[person];
  const container = document.getElementById('personalVideos');
  
  container.innerHTML = '';
  
  if (!gallery.videos || gallery.videos.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No hay videos disponibles todavía 🎥</p>';
    return;
  }
  
  gallery.videos.forEach((video, index) => {
    const item = document.createElement('div');
    item.className = 'media-item video-item';
    item.onclick = () => openLightbox('video', video.src, video.caption);
    
    // Crear elemento de video temporal para generar thumbnail
    const videoElement = document.createElement('video');
    videoElement.src = video.src;
    videoElement.muted = true;
    videoElement.preload = 'metadata';
    
    // Crear contenedor con placeholder inicial
    const thumbnailSrc = video.thumbnail || createVideoThumbnail(video.src);
    
    item.innerHTML = `
      <div class="video-preview-container">
        <img class="video-thumbnail" 
             src="${thumbnailSrc}" 
             alt="${video.caption}"
             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9ImxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZjY2OTkgMCUsICM2NmNjZmYgMTAwJSkiLz48Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSIyNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIi8+PHBhdGggZD0iTTY4IDYwTDkwIDc1TDY4IDkwVjYwWiIgZmlsbD0iI2ZmMzM2NiIvPjx0ZXh0IHg9Ijc1IiB5PSIxMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmMzM2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlZJREVPPC90ZXh0Pjwvc3ZnPg==';"
        <div class="video-indicator">🎥</div>
        <div class="video-play-overlay">
          <div class="play-button">▶</div>
        </div>
      </div>
      <div class="media-overlay">
        <div>${video.caption}</div>
      </div>
    `;
    
    container.appendChild(item);
  });
}

function createVideoThumbnail(videoSrc) {
  // Generar un thumbnail placeholder mejorado basado en el nombre del video
  const videoName = videoSrc.split('/').pop().split('.')[0];
  const colors = ['ff6699', '66ccff', 'ffcc66', '99ff66', 'ff9966'];
  const color = colors[videoName.length % colors.length];
  
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="150" height="150" fill="linear-gradient(135deg, #${color} 0%, #${color}88 100%)"/>
      <circle cx="75" cy="75" r="25" fill="rgba(255,255,255,0.9)"/>
      <path d="M68 60L90 75L68 90V60Z" fill="#ff3366"/>
       <text x="75" y="120" font-family="Arial" font-size="12" fill="#ff3366" text-anchor="middle" font-weight="bold">VIDEO</text>
    </svg>
  `)}`
}
function switchTab(tabName) {
  // Remover clase active de todos los tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Activar el tab seleccionado
  document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
  document.getElementById(`${tabName}Tab`).classList.add('active');
  
  console.log(`📑 Cambiando a pestaña: ${tabName}`);
}

function openLightbox(type, src, caption) {
  const lightbox = document.getElementById('lightbox');
  const mediaContainer = document.getElementById('lightboxMedia');
  const captionElement = document.getElementById('lightboxCaption');
  
  // Limpiar contenido anterior
  mediaContainer.innerHTML = '';
  
  if (type === 'photo') {
    const img = document.createElement('img');
    img.src = src;
    img.alt = caption;
    img.onerror = function() {
      this.parentElement.innerHTML = '<div style="color: white; text-align: center; padding: 40px;">📷 Imagen no disponible</div>';
    };
    mediaContainer.appendChild(img);
  } else if (type === 'video') {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.autoplay = false;
    video.onerror = function() {
      this.parentElement.innerHTML = '<div style="color: white; text-align: center; padding: 40px;">🎥 Video no disponible</div>';
    };
    mediaContainer.appendChild(video);
  }
  
  captionElement.textContent = caption;
  lightbox.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  console.log(`🔍 Abriendo lightbox: ${type} - ${caption}`);
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const mediaContainer = document.getElementById('lightboxMedia');
  
  // Pausar videos si los hay
  const video = mediaContainer.querySelector('video');
  if (video && !video.paused) {
    video.pause();
  }
  
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  console.log('❌ Cerrando lightbox');
}

// 🎵 FUNCIONES DE SPOTIFY (mantienen funcionalidad anterior)
function toggleSpotifySize() {
  const spotifySection = document.getElementById('spotifySection');
  const iframe = document.getElementById('spotify-player');
  
  
    spotifySection.style.position = 'relative';
    spotifySection.style.bottom = 'auto';
    spotifySection.style.right = 'auto';
    spotifySection.style.maxWidth = '400px';
    spotifySection.style.zIndex = '10';
    spotifySection.style.transform = 'scale(1)';
    spotifySection.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    iframe.style.height = '152px';
    isSpotifyMinimized = false;
    console.log('Spotify maximizado');
  
}

function scrollToSpotify() {
  const spotifySection = document.getElementById('spotifySection');
    spotifySection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  
}


function hideSpotifyMessage() {
  const message = document.getElementById('spotify-message');
  if (message) {
    message.style.opacity = '0';
    setTimeout(() => {
      message.style.display = 'none';
    }, 300);
  }
}

function setupVideoControls() {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    video.addEventListener('play', () => {
      if (!isSpotifyMinimized) {
        toggleSpotifySize();
        console.log('Video iniciado - Spotify auto-minimizado');
      }
    });

    video.addEventListener('pause', () => {
      hideSpotifyMessage();
    });
  });
}

// 💬 CARRUSEL DE MENSAJES
const messagesContainer = document.querySelector('.messages-container');
const messageCards = document.querySelectorAll('.message-card');
const carouselIndicators = document.querySelectorAll('.carousel-indicators .indicator');
let currentMessageIndex = 0; // Inicializamos en 0

function updateCarouselIndicators() {
    carouselIndicators.forEach((indicator, index) => {
        if (index === currentMessageIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function scrollToMessage(index) {
    if (messagesContainer && messageCards[index]) {
        messagesContainer.scrollLeft = messageCards[index].offsetLeft;
        currentMessageIndex = index;
        updateCarouselIndicators();
        console.log(`➡️ Desplazado al mensaje. Índice: ${currentMessageIndex}`);
    }
}

// Event Listener para detectar el desplazamiento manual del usuario
messagesContainer.addEventListener('scroll', () => {
    // Calculamos qué tarjeta está más cerca del centro o inicio
    const scrollLeft = messagesContainer.scrollLeft;
    const containerWidth = messagesContainer.clientWidth;

    // Encontramos la tarjeta más visible
    let closestIndex = 0;
    let minDistance = Infinity;

    messageCards.forEach((card, index) => {
        const cardLeft = card.offsetLeft;
        const distance = Math.abs(scrollLeft - cardLeft); // Distancia al inicio de la tarjeta
        // Opcional: distancia al centro de la tarjeta si queremos un snap más "centrado"
        // const distance = Math.abs(scrollLeft + containerWidth / 2 - (cardLeft + card.clientWidth / 2));

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    if (closestIndex !== currentMessageIndex) {
        currentMessageIndex = closestIndex;
        updateCarouselIndicators();
        console.log(`↔️ Scroll detectado, mensaje actual: ${currentMessageIndex}`);
    }
});

// Event Listeners para los indicadores
carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        scrollToMessage(index);
        // Opcional: Pausar auto-scroll si lo implementas
    });
});

function setupSpotifyDetection() {
  const spotifyIframe = document.getElementById("spotify-player");
  const backgroundMusic = document.getElementById("background-music");

  if (!spotifyIframe || !backgroundMusic) {
    console.warn("⚠️ Spotify o música de fondo no encontrados");
    return;
  }

  // Cuando el usuario hace clic dentro del iframe (inicia canción en Spotify)
  spotifyIframe.addEventListener("mouseenter", () => {
    if (!backgroundMusic.paused) {
      backgroundMusic.pause();
      console.log("⏸️ Fondo pausado por Spotify");
    }
  });

  // Cuando el usuario mueve el ratón fuera del iframe (posible pausa en Spotify)
  spotifyIframe.addEventListener("mouseleave", () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play().catch(err => {
        console.log("⚠️ No se pudo reanudar música:", err.message);
      });
      console.log("▶️ Fondo reanudado al salir de Spotify");
    }
  });
}
// 🌟 EFECTOS DECORATIVOS ADICIONALES PARA LA PÁGINA

// ✨ Crear estrellas brillantes
function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  document.body.appendChild(starsContainer);

  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 2 + 2) + 's';
    starsContainer.appendChild(star);
  }
}

// 🌸 Crear partículas flotantes
function createFloatingParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'floating-particles';
  document.body.appendChild(particlesContainer);

  setInterval(() => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    particlesContainer.appendChild(particle);

    // Remover partícula después de la animación
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 10000);
  }, 300);
}

// 🎭 Efectos de hover mejorados para tarjetas
function enhanceCardEffects() {
  const cards = document.querySelectorAll('.person-card, .message-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
    });
  });
}

// 🌈 Cambiar colores del gradiente dinámicamente
function dynamicColorShift() {
  const colors = [
    ['#ff6b9d', '#c44569', '#f8b500', '#40e0d0'],
    ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140', '#a8edea', '#fed6e3']
  ];
  
  let currentColorSet = 0;
  
  setInterval(() => {
    currentColorSet = (currentColorSet + 1) % colors.length;
    const colorSet = colors[currentColorSet];
    
    document.body.style.background = 
      `linear-gradient(-45deg, ${colorSet[0]}, ${colorSet[1]}, ${colorSet[2]}, ${colorSet[3]})`;
    document.body.style.backgroundSize = '400% 400%';
  }, 60000); // Cambiar cada 20 segundos
}

// 💫 Efecto de respiración para elementos importantes
function addBreathingEffect() {
  const importantElements = document.querySelectorAll('h1, h2, .banner-text');
  
  importantElements.forEach(element => {
    element.classList.add('breathing');
  });
}



// 🎵 Visualizador de audio simple (simulado)
function createAudioVisualizer() {
  const visualizer = document.createElement('div');
  visualizer.style.position = 'fixed';
  visualizer.style.bottom = '20px';
  visualizer.style.right = '20px';
  visualizer.style.display = 'flex';
  visualizer.style.alignItems = 'end';
  visualizer.style.height = '50px';
  visualizer.style.gap = '2px';
  visualizer.style.zIndex = '1000';
  visualizer.style.opacity = '0.7';
  
  for (let i = 0; i < 12; i++) {
    const bar = document.createElement('div');
    bar.style.width = '3px';
    bar.style.height = '10px';
    bar.style.background = 'linear-gradient(to top, #ff6b9d, #40e0d0)';
    bar.style.borderRadius = '2px';
    bar.style.transition = 'height 0.1s ease';
    visualizer.appendChild(bar);
  }
  
  document.body.appendChild(visualizer);
  
  // Simular movimiento de barras
  setInterval(() => {
    const bars = visualizer.children;
    for (let i = 0; i < bars.length; i++) {
      const height = Math.random() * 40 + 10;
      bars[i].style.height = height + 'px';
    }
  }, 200);
}

// 🎊 Lluvia de emoji aleatorios
function createEmojiRain() {
  const emojis = ['🎉', '🎂', '🎈', '🎁', '💕', '✨', '🌟', '🎊', '💖', '🎀'];
  
  setInterval(() => {
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.top = '-50px';
    emoji.style.left = Math.random() * window.innerWidth + 'px';
    emoji.style.fontSize = (Math.random() * 20 + 15) + 'px';
    emoji.style.zIndex = '1';
    emoji.style.pointerEvents = 'none';
    emoji.style.animation = 'fall 4s linear forwards';
    
    document.body.appendChild(emoji);
    
    setTimeout(() => {
      if (emoji.parentNode) {
        emoji.parentNode.removeChild(emoji);
      }
    }, 4000);
  }, 2000);
}

// 🎨 Efecto de ondas en clics
function createClickRipples() {
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(255,107,157,0.4) 0%, transparent 70%)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  });
}

// 📱 Detección de dispositivo para efectos optimizados
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 🚀 Inicializar todos los efectos decorativos
function initializeDecorativeEffects() {
  console.log('🎨 Inicializando efectos decorativos...');
  
  // Efectos básicos para todos los dispositivos
  createStars();
  enhanceCardEffects();
  addBreathingEffect();
  createClickRipples();
  dynamicColorShift();
  
  // Efectos adicionales solo para dispositivos con buena performance
  if (!isMobile()) {
    createFloatingParticles();
    createCursorTrail();
    createAudioVisualizer();
  }
  
  // Efecto de lluvia de emojis para ocasiones especiales
  createEmojiRain();
  
  console.log('✨ Efectos decorativos cargados exitosamente');
}

// CSS adicional para las animaciones
const additionalCSS = `
  @keyframes rippleEffect {
    from {
      width: 0;
      height: 0;
      opacity: 0.8;
    }
    to {
      width: 100px;
      height: 100px;
      opacity: 0;
    }
  }
  
  @keyframes fall {
    from {
      transform: translateY(-50px) rotate(0deg);
      opacity: 1;
    }
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;

// Inyectar CSS adicional
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDecorativeEffects);
} else {
  initializeDecorativeEffects();
}
// ***** IMPORTANTE: Elimina por completo las funciones de auto-avance (autoplay) si ya no las quieres
// Si decides mantener el auto-avance, el `startMessageAutoplay`
// y `stopMessageAutoplay` tendrían que ser reescritos para llamar a `scrollToMessage(currentMessageIndex + 1)`.
// Por ahora, asumo que quieres solo desplazamiento manual.

// 🚀 Inicialización
window.onload = function() {
  console.log('Página cargada - Inicializando...');
  // Configurar la referencia a la música de fondo
  backgroundMusic = document.getElementById("background-music");
  
  // Verificar elementos de la ruleta
  const roulette = document.getElementById("videoRoulette");
  const startBtn = document.getElementById("startRouletteBtn");
  const wheel = document.getElementById("rouletteWheel");
  if (!roulette || !startBtn || !wheel) {
    console.error('Elementos de la ruleta no encontrados');
    return;
  }
  
  // Inicializar controles y efectos
  setupVideoControls();
  setupSpotifyDetection(); // Nueva función para detectar Spotify
  startCountdown();
  launchHearts();
  // Efectos especiales
  setTimeout(launchConfetti, 2000);
  setTimeout(launchBalloons, 4000);
  
  // Event listeners para cerrar modals al hacer clic fuera
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('personalGalleryModal');
    const lightbox = document.getElementById('lightbox');
    
    if (event.target === modal) {
      closePersonGallery();
    }
    
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Prevenir que el clic en el contenido del modal lo cierre
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }
  
  // Event listener para la tecla ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      if (document.getElementById('lightbox').style.display === 'block') {
        closeLightbox();
      } else if (document.getElementById('personalGalleryModal').style.display === 'block') {
        closePersonGallery();
      }
    }
  })
  // ... (tu código de inicialización existente para ruleta, spotify, countdown, surprise, efectos visuales)

  // Inicializar el carrusel de mensajes
  if (messageCards.length > 0) {
      scrollToMessage(0); // Asegura que la primera tarjeta esté visible y el indicador activo al cargar
      console.log('✅ Carrusel de mensajes inicializado para desplazamiento lateral.');
  } else {
      console.warn('No se encontraron tarjetas de mensaje para el carrusel de amigas.');
  }

  // Event listeners para cerrar modals al hacer clic fuera
  // ... (tu código existente)

  // Prevenir que el clic en el contenido del modal lo cierre
  // ... (tu código existente)

  // Event listener para la tecla ESC
  // ... (tu código existente)
};

document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("background-music");
  if (!bg) return;

  bg.volume = 0.3;
  let audioActivated = false;
  let hasPlayed = false;

  // Precarga silenciosa
  bg.play().catch(() => { /* está bien, solo precargando */ });

  const activate = () => {
    if (audioActivated || hasPlayed) return;
    bg.muted = false;
    bg.removeAttribute("muted");

    bg.play().then(() => {
      console.log("🎵 Música activada exitosamente");
      audioActivated = true;
      hasPlayed = true;
      cleanup();
    }).catch(err => {
      console.log("⚠️ No se pudo iniciar audio:", err.message);
    });
  };

  // Escuchamos cualquier interacción
  const events = ["mousedown", "touchstart", "click", "keydown", "scroll", "wheel", "mousemove"];
  const options = { once: true, passive: true, capture: true };

  function cleanup() {
    events.forEach(ev => {
      window.removeEventListener(ev, activate, true);
      document.removeEventListener(ev, activate, true);
    });
  }

  events.forEach(ev => {
    window.addEventListener(ev, activate, options);
    document.addEventListener(ev, activate, options);
  });
});
// 🎂 Cuenta atrás
function startCountdown() {
  const countdown = document.getElementById("countdown");
  const birthday = new Date("Oct 2, 2025 00:00:00").getTime();
  
  setInterval(() => {
    const now = new Date().getTime();
    const distance = birthday - now;
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const m = Math.floor((distance % (1000*60*60)) / (1000*60));
    const s = Math.floor((distance % (1000*60)) / 1000);
    countdown.innerHTML = `🎂 Faltan ${d}d ${h}h ${m}m ${s}s 🎂`;
  }, 1000);
}

// ✨ Sorpresa final
// Variables del carrusel de pistas (simplificado)
let currentHintIndex = 0;
let hintCards = [];

// Función para inicializar el carrusel de pistas
function initializeGiftHintCarousel() {
  hintCards = document.querySelectorAll('#giftHintsCarousel .hint-card');
  
  if (hintCards.length === 0) {
    console.warn('No se encontraron tarjetas de pistas');
    return;
  }
  
  currentHintIndex = 0;
  showCurrentHint();
  console.log('Carrusel de pistas inicializado con', hintCards.length, 'pistas');
}

// Función para mostrar la pista actual
function showCurrentHint() {
  // Ocultar todas las pistas
  hintCards.forEach((card, index) => {
    if (index === currentHintIndex) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  console.log('Mostrando pista', currentHintIndex + 1, 'de', hintCards.length);
}

// Función para navegar entre pistas
function navigateHints(direction) {
  if (hintCards.length === 0) return;
  
  if (direction === 1) { // Siguiente
    currentHintIndex = (currentHintIndex + 1) % hintCards.length;
  } else if (direction === -1) { // Anterior
    currentHintIndex = (currentHintIndex - 1 + hintCards.length) % hintCards.length;
  }
  
  showCurrentHint();
}

// Función para revelar sorpresa (actualizada)
function revealSurprise() {
  document.getElementById("surprise").classList.remove("hidden");

  const giftHintsCarousel = document.getElementById("giftHintsCarousel");
  if (giftHintsCarousel) {
    giftHintsCarousel.classList.remove("hidden");
    
    // Inicializar el carrusel después de que sea visible
    setTimeout(() => {
      initializeGiftHintCarousel();
    }, 100);
  }
}

// 🎊 Efectos visuales
function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = ["#ff0","#f0f","#0ff","#ff3366","#66ff33"][Math.floor(Math.random()*5)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
    document.body.appendChild(confetti);
  }
}

function launchBalloons() {
  for (let i = 0; i < 8; i++) {
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.background = ["red","blue","green","pink","purple","orange"][Math.floor(Math.random()*6)];
    balloon.style.animationDuration = (Math.random()*5 + 5) + "s";
    document.body.appendChild(balloon);
  }
}

function launchHearts() {
  setInterval(() => {
    let heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random()*3 + 3) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 900);
}

// 🚀 Inicialización
window.onload = function() {
  console.log('Página cargada - Inicializando...');
  
  // Verificar elementos de la ruleta
  const roulette = document.getElementById("videoRoulette");
  const startBtn = document.getElementById("startRouletteBtn");
  const wheel = document.getElementById("rouletteWheel");
  if (!roulette || !startBtn || !wheel) {
    console.error('Elementos de la ruleta no encontrados');
    return;
  }
  
  // Inicializar controles y efectos
  setupVideoControls();
  startCountdown();
  launchHearts();
  // Efectos especiales
  setTimeout(launchConfetti, 2000);
  setTimeout(launchBalloons, 4000);
  
  // Event listeners para cerrar modals al hacer clic fuera
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('personalGalleryModal');
    const lightbox = document.getElementById('lightbox');
    
    if (event.target === modal) {
      closePersonGallery();
    }
    
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Prevenir que el clic en el contenido del modal lo cierre
  document.querySelector('.modal-content').addEventListener('click', function(event) {
    event.stopPropagation();
  });
  
  // Event listener para la tecla ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      if (document.getElementById('lightbox').style.display === 'block') {
        closeLightbox();
      } else if (document.getElementById('personalGalleryModal').style.display === 'block') {
        closePersonGallery();
      }
    }
  });
  
  console.log('✅ Inicialización completa - Galerías personales listas');
};

document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("background-music");
  if (!bg) return;

  bg.volume = 0.3;
  let audioActivated = false;
  let hasPlayed = false; // Nueva variable para controlar que solo se reproduzca una vez

  // Intenta precargar en silencio
  bg.play().catch(() => { /* está bien, solo precargando */ });

  const activate = () => {
    if (audioActivated || hasPlayed) return;
    
    bg.muted = false;
    bg.removeAttribute("muted");
    
    if (cards.length > 0) {
    updateCarousel(current); // Muestra la primera tarjeta y activa el primer indicador
    startMessageAutoplay(); // Inicia el auto-avance
  } else {
    console.warn('No se encontraron tarjetas de mensaje para el carrusel.');
  }
    const playPromise = bg.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("🎵 Música activada exitosamente");
          audioActivated = true;
          hasPlayed = true;
          cleanup();
        })
        .catch(err => {
          console.log("⚠️ No se pudo iniciar audio:", err.message);
          // Reintenta después de un breve delay
          setTimeout(() => {
            if (!hasPlayed) {
              bg.play().then(() => {
                console.log("🎵 Música activada en segundo intento");
                audioActivated = true;
                hasPlayed = true;
                cleanup();
              }).catch(() => {});
            }
          }, 100);
        });
    }
  };

  // Eventos más agresivos para capturar la primera interacción
  const events = ["mousedown", "touchstart", "click", "keydown", "scroll", "wheel", "mousemove"];
  const options = { once: true, passive: true, capture: true };

  function cleanup(){
    events.forEach(ev => {
      window.removeEventListener(ev, activate, true);
      document.removeEventListener(ev, activate, true);
    });
  }

  // Agregar listeners con diferentes estrategias
  events.forEach(ev => {
    window.addEventListener(ev, activate, options);
    document.addEventListener(ev, activate, options);
  });

  // Listener especial para scroll que no sea "once"
  let scrollAttempts = 0;
  const scrollHandler = () => {
    if (!audioActivated && !hasPlayed && scrollAttempts < 3) {
      scrollAttempts++;
      activate();
    }
  };
  
  window.addEventListener('scroll', scrollHandler, { passive: true });
  document.addEventListener('scroll', scrollHandler, { passive: true });

  // Intento adicional cuando la página está completamente cargada
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!audioActivated && !hasPlayed) {
        activate();
      }
    }, 1000);
  });

  // Listener para cuando termine el audio - NO reiniciar
  bg.addEventListener('ended', () => {
    console.log("🎵 Audio terminado - no se reiniciará");
    hasPlayed = true;
  });

  // Prevenir que se reinicie si alguien cambia de pestaña y vuelve
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && audioActivated && bg.paused && !hasPlayed) {
      // Solo reanudar si no ha terminado completamente
      if (bg.currentTime < bg.duration) {
        bg.play().catch(()=>{});
      }
    }
  });

  // Manejo mejorado de errores
  bg.addEventListener("error", (e) => {
    console.log("❌ Error de audio:", e.target.error);
  });

  bg.addEventListener("canplaythrough", () => {
    console.log("📡 Audio listo para reproducir");
  });
});

// Variables del carrusel de mensajes
const cards = document.querySelectorAll('.message-card');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn'); // Asegúrate de que este botón existe en tu HTML
const nextBtn = document.getElementById('nextBtn'); // Asegúrate de que este botón existe en tu HTML
let current = 0; // Se inicializa en 0 para mostrar la primera carta al cargar

function updateCarousel(index) {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'prev', 'next');
    indicators[i].classList.remove('active');
    if (i === index) {
      card.classList.add('active');
      indicators[i].classList.add('active');
    } else if (i === (index - 1 + cards.length) % cards.length) {
      card.classList.add('prev');
    } else if (i === (index + 1) % cards.length) {
      card.classList.add('next');
    }
  });
}

// Event Listeners para botones y indicadores
prevBtn.addEventListener('click', () => {
  current = (current - 1 + cards.length) % cards.length;
  updateCarousel(current);
  console.log(`⬅️ Mensaje anterior. Índice: ${current}`);
});

nextBtn.addEventListener('click', () => {
  current = (current + 1) % cards.length;
  updateCarousel(current);
  console.log(`➡️ Mensaje siguiente. Índice: ${current}`);
});

indicators.forEach((ind, i) => {
  ind.addEventListener('click', () => {
    if (i === current) return; // Si ya está activa, no hacer nada
    current = i;
    updateCarousel(current);
    console.log(`🎯 Saltando al mensaje. Índice: ${current}`);
  });
});

// Mostrar autor al hacer clic en la tarjeta (mantener lógica)
cards.forEach(card => {
  card.addEventListener('click', () => {
    const author = card.querySelector('.message-author');
    if (author) {
      author.classList.toggle('hidden');
    }
  });
});

/* Si el carrusel ya está visible al cargar (p. ej. pruebas), inicializamos */
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('giftHintsCarousel');
  if (carousel && !carousel.classList.contains('hidden')) {
    setTimeout(initializeGiftHintCarousel, 50);
  }
});

// ---------------- INICIALIZACIÓN ----------------
window.onload = function() {
  console.log('Página cargada - Inicializando...');
  setupVideoControls();
  startCountdown();
  launchHearts();
  setTimeout(launchConfetti, 2000);
  setTimeout(launchBalloons, 4000);

  // Carrusel de mensajes
  if (messageCards.length > 0) scrollToMessage(0);

  // Cerrar modals al hacer clic fuera
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('personalGalleryModal');
    const lightbox = document.getElementById('lightbox');
    if (event.target === modal) closePersonGallery();
    if (event.target === lightbox) closeLightbox();
  });

  // Evitar que el contenido cierre el modal
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', e => e.stopPropagation());
  }

  // Tecla ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (document.getElementById('lightbox').style.display === 'block') closeLightbox();
      else if (document.getElementById('personalGalleryModal').style.display === 'block') closePersonGallery();
    }
  });

  console.log('✅ Inicialización completa');
};

// ---------------- AUDIO DE FONDO ----------------
document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("background-music");
  if (!bg) return;

  bg.volume = 0.3;
  let audioActivated = false;
  let hasPlayed = false;

  bg.play().catch(() => {});

  const activate = () => {
    if (audioActivated || hasPlayed) return;
    bg.muted = false;
    bg.removeAttribute("muted");
    bg.play().then(() => {
      audioActivated = true;
      hasPlayed = true;
      cleanup();
    }).catch(() => {});
  };

  const events = ["mousedown","touchstart","click","keydown","scroll","wheel","mousemove"];
  const options = { once: true, passive: true, capture: true };
  function cleanup(){ events.forEach(ev => { window.removeEventListener(ev, activate, true); document.removeEventListener(ev, activate, true); }); }
  events.forEach(ev => { window.addEventListener(ev, activate, options); document.addEventListener(ev, activate, options); });

  bg.addEventListener('ended', () => { hasPlayed = true; });
});