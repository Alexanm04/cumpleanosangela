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
    src: "video13.mp4", 
    title: "Recuerdo de Marta 🌸", 
    thumbnail: "aug225.jpg",
    person: "Marta"
  }
];

// Variables globales
let isSpinning = false;
let isSpotifyMinimized = false;
let currentRotation = 0; 

// 🎰 FUNCIONES DE LA RULETA
function createRoulettePhotos() {
      const container = document.getElementById("roulettePhotos");
      const totalVideos = videos.length;
      
      container.innerHTML = '';
      
      videos.forEach((video, index) => {
        const angle = (360 / totalVideos) * index;
        const item = document.createElement('div');
        item.className = 'roulette-item';
        item.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-100px) rotate(-${angle}deg)`;
        
        item.innerHTML = `
          <div class="video-preview">
            <div class="play-icon">▶️</div>
            <img src="${video.thumbnail}" 
                 alt="${video.title}" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div class="placeholder-title" style="display:none; font-size:10px; color:#666;">${video.person}</div>
          </div>
          <h4>${video.title}</h4>
        `;
        
        container.appendChild(item);
      });
    }

    function startVideoRoulette() {
      if (isSpinning) return;
      
      console.log('🎰 Iniciando ruleta...');
      isSpinning = true;
      
      const startBtn = document.getElementById("startRouletteBtn");
      const container = document.getElementById("rouletteContainer");
      const photosContainer = document.getElementById("roulettePhotos");
      
      startBtn.style.display = "none";
      container.style.display = "block";
      
      // Crear las fotos en la ruleta
      createRoulettePhotos();
      
      // Iniciar animación inmediatamente
      setTimeout(() => {
        startSpinAnimation();
      }, 500);
    }

    function startSpinAnimation() {
      const photosContainer = document.getElementById("roulettePhotos");
      let currentIndex = 0;
      let speed = 100; // Velocidad inicial
      const maxSpeed = 1200; // Velocidad final más lenta
      const acceleration = 1.08; // Factor de desaceleración
      let totalSpins = 0;
      const maxTotalSpins = Math.floor(Math.random() * 25) + 40; // Entre 40-65 cambios
      
      function animateStep() {
        // Limpiar clases anteriores
        const items = document.querySelectorAll('.roulette-item');
        items.forEach(item => {
          item.classList.remove('active');
          item.style.transform = item.style.transform.replace(' scale(1.2)', '');
        });
        
        // Resaltar elemento actual
        if (items[currentIndex]) {
          items[currentIndex].classList.add('active');
          // Hacer más grande el elemento seleccionado
          const currentTransform = items[currentIndex].style.transform;
          items[currentIndex].style.transform = currentTransform + ' scale(1.2)';
        }
        
        currentIndex = (currentIndex + 1) % videos.length;
        totalSpins++;
        
        console.log(`🎲 Spin ${totalSpins}/${maxTotalSpins}, velocidad: ${speed}ms`);
        
        if (totalSpins < maxTotalSpins) {
          // Aumentar velocidad gradualmente (hacer más lento)
          if (totalSpins > maxTotalSpins * 0.7) { // En las últimas 30% de vueltas
            speed *= acceleration;
          }
          setTimeout(animateStep, speed);
        } else {
          // Finalizar ruleta
          setTimeout(() => {
            finishRoulette(currentIndex === 0 ? videos.length - 1 : currentIndex - 1);
          }, 800);
        }
      }
      
      animateStep();
    }

    function finishRoulette(finalIndex) {
      const selectedVideo = videos[finalIndex];
      
      console.log('🎯 Video seleccionado:', selectedVideo.title);
      
      // Limpiar todas las clases y resaltar solo el ganador
      const items = document.querySelectorAll('.roulette-item');
      items.forEach((item, index) => {
        item.classList.remove('active');
        item.style.transform = item.style.transform.replace(' scale(1.2)', '');
        
        if (index === finalIndex) {
          item.classList.add('winner');
          // Agregar efectos de ganador
          if (!item.querySelector('.winner-glow')) {
            item.innerHTML += '<div class="winner-glow"></div>';
          }
          if (!item.querySelector('.winner-text')) {
            item.innerHTML += '<div class="winner-text">🎉 ¡SELECCIONADO! 🎉</div>';
          }
        }
      });
      
      // Después de 3 segundos, mostrar el video
      setTimeout(() => {
        const video = document.getElementById("randomVideo");
        const source = video.querySelector('source');
        
        source.src = selectedVideo.src;
        video.load();
        
        // Ocultar ruleta y mostrar video
        document.getElementById("videoRoulette").style.display = "none";
        document.getElementById("videoContainer").style.display = "block";
        
        // Intentar reproducir el video
        video.play().catch(e => {
          console.log('ℹ️ Video cargado, usuario debe hacer clic para reproducir');
        });
        
        isSpinning = false;
        launchConfetti(); // Efecto de celebración
        
      }, 3000);
    }

    function showRoulette() {
      console.log('🎲 Mostrando ruleta nuevamente');
      
      // Resetear estado
      isSpinning = false;
      currentVideoIndex = 0;
      
      // Limpiar contenedor de fotos
      const photosContainer = document.getElementById("roulettePhotos");
      photosContainer.innerHTML = '';
      photosContainer.style.transform = 'rotate(0deg)';
      
      // Mostrar elementos correctos
      document.getElementById("videoRoulette").style.display = "block";
      document.getElementById("videoContainer").style.display = "none";
      document.getElementById("startRouletteBtn").style.display = "block";
      document.getElementById("rouletteContainer").style.display = "none";
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

// 🎵 FUNCIONES DE SPOTIFY
function toggleSpotifySize() {
  const spotifySection = document.getElementById('spotifySection');
  const iframe = document.getElementById('spotify-player');
  
  if (!isSpotifyMinimized) {
    // Minimizar
    spotifySection.style.position = 'fixed';
    spotifySection.style.bottom = '20px';
    spotifySection.style.right = '20px';
    spotifySection.style.maxWidth = '300px';
    spotifySection.style.zIndex = '1000';
    spotifySection.style.transform = 'scale(0.8)';
    spotifySection.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    iframe.style.height = '80px';
    isSpotifyMinimized = true;
    console.log('Spotify minimizado');
  } else {
    // Maximizar
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
}

function scrollToSpotify() {
  const spotifySection = document.getElementById('spotifySection');
  
  if (isSpotifyMinimized) {
    toggleSpotifySize();
    setTimeout(() => {
      spotifySection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  } else {
    spotifySection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }
}

function showSpotifyMessage() {
  let message = document.getElementById('spotify-message');
  if (!message) {
    message = document.createElement('div');
    message.id = 'spotify-message';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      z-index: 9999;
      font-size: 14px;
      text-align: center;
      max-width: 90%;
      transition: opacity 0.3s ease;
    `;
    message.innerHTML = '🎵 Para pausar Spotify, haz clic en el reproductor minimizado ⬇️';
    document.body.appendChild(message);
  }
  message.style.display = 'block';
  message.style.opacity = '1';
  
  setTimeout(() => {
    hideSpotifyMessage();
  }, 4000);
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
      showSpotifyMessage();
    });

    video.addEventListener('pause', () => {
      hideSpotifyMessage();
    });
  });
}

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
function revealSurprise() {
  document.getElementById("surprise").classList.remove("hidden");
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
  
  // Verificar que los elementos existen
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
  
  // Efectos especiales opcionales
  setTimeout(launchConfetti, 2000);
  setTimeout(launchBalloons, 4000);
  
  console.log('Inicialización completa');
};