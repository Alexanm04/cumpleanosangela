const videos = [
  "video11.mp4",
  "video12.mp4",
  "video13.mp4"
];

function loadRandomVideo() {
  const randomIndex = Math.floor(Math.random() * videos.length);
  const video = document.getElementById("randomVideo");
  video.src = videos[randomIndex];
  video.load();
  video.play();
}

window.onload = loadRandomVideo;


// 🎂 Cuenta atrás
const countdown = document.getElementById("countdown");
const birthday = new Date("Oct 3, 2025 00:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = birthday - now;
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  const m = Math.floor((distance % (1000*60*60)) / (1000*60));
  const s = Math.floor((distance % (1000*60)) / 1000);
  countdown.innerHTML = `🎂 Faltan ${d}d ${h}h ${m}m ${s}s 🎂`;
}, 1000);

// ✨ Sorpresa final
function revealSurprise() {
  document.getElementById("surprise").classList.remove("hidden");
}

// 🎊 Confeti
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

// 🎈 Globos
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

// ❤️ Corazones
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
