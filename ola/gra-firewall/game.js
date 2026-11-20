const canvas = document.getElementById("firewallCanvas");
const ctx = canvas.getContext("2d");

const cookiesEl = document.getElementById("cookies");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");

let bestScore = parseInt(localStorage.getItem("olusia_firewall_best") || "0", 10);
bestEl.textContent = bestScore;

const CX = canvas.width / 2;
const CY = canvas.height / 2;

let gameState = "START"; // START, PLAYING, GAMEOVER
let cookies = 5;
let score = 0;
let frame = 0;
let cats = [];
let effects = [];
let guardAngle = 0;

function resetGame() {
  cookies = 5;
  score = 0;
  frame = 0;
  cats = [];
  effects = [];
  gameState = "PLAYING";
  updateHud();
}

function updateHud() {
  cookiesEl.textContent = cookies;
  scoreEl.textContent = score;
  if (score > bestScore) {
    bestScore = score;
    bestEl.textContent = bestScore;
    localStorage.setItem("olusia_firewall_best", bestScore);
  }
}

function spawnCat() {
  const side = Math.floor(Math.random() * 4);
  let x, y;
  if (side === 0) { x = Math.random() * canvas.width; y = -25; }
  else if (side === 1) { x = canvas.width + 25; y = Math.random() * canvas.height; }
  else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height + 25; }
  else { x = -25; y = Math.random() * canvas.height; }

  const isBonus = Math.random() < 0.14; // Kubek kakao od Olusi (+1 ciasteczko!)
  const baseSpeed = isBonus ? 1.5 : Math.min(3.4, 1.35 + score * 0.03);

  cats.push({
    x,
    y,
    r: 26,
    speed: baseSpeed,
    isBonus,
    wobble: Math.random() * Math.PI * 2
  });
}

function addEffect(x, y, text, color) {
  effects.push({ x, y, text, color, life: 36 });
}

function drawPlateAndGuard() {
  // Talerz z ciasteczkami na środku
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(CX, CY, 56, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Pozostałe ciasteczka na talerzu
   const positions = [,
    [-20, -14],
    [20, -14],
    [-18, 18],
    [18, 18]
  ];

  for (let i = 0; i < cookies; i++) {
    const [dx, dy] = positions[i];
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.arc(CX + dx, CY + dy, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#451a03";
    ctx.fillRect(CX + dx - 4, CY + dy - 3, 3, 3);
    ctx.fillRect(CX + dx + 3, CY + dy + 2, 3, 3);
  }

  // Biały kot Firewall krążący wokół talerza
  guardAngle += 0.035;
  const gx = CX + Math.cos(guardAngle) * 72;
  const gy = CY + Math.sin(guardAngle) * 72;

  ctx.fillStyle = "#f8fafc";
  ctx.beginPath();
  ctx.arc(gx, gy, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Uszka białego kota
  ctx.fillStyle = "#cbd5e1";
  ctx.beginPath();
  ctx.moveTo(gx - 12, gy - 10);
  ctx.lineTo(gx - 8, gy - 23);
  ctx.lineTo(gx - 2, gy - 14);
  ctx.moveTo(gx + 2, gy - 14);
  ctx.lineTo(gx + 8, gy - 23);
  ctx.lineTo(gx + 12, gy - 10);
  ctx.fill();

  // Oczy niebieskie Ragdolla
  ctx.fillStyle = "#0284c7";
  ctx.beginPath();
  ctx.arc(gx - 5, gy - 2, 2.5, 0, Math.PI * 2);
  ctx.arc(gx + 5, gy - 2, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawCats() {
  cats.forEach(c => {
    c.wobble += 0.15;
    if (c.isBonus) {
      // Bonusowy kubek kakao od Olusi
      ctx.fillStyle = "#ec4899";
      ctx.beginPath();
      ctx.roundRect(c.x - 16, c.y - 16, 32, 32, 8);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("☕", c.x, c.y + 7);
      ctx.textAlign = "left";
      return;
    }

    // Pręgowany kociak-pentester
    ctx.fillStyle = "#78716c";
    ctx.beginPath();
    ctx.arc(c.x, c.y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Uszy
    ctx.beginPath();
    ctx.moveTo(c.x - 14, c.y - 10);
    ctx.lineTo(c.x - 10, c.y - 25);
    ctx.lineTo(c.x - 2, c.y - 16);
    ctx.moveTo(c.x + 2, c.y - 16);
    ctx.lineTo(c.x + 10, c.y - 25);
    ctx.lineTo(c.x + 14, c.y - 10);
    ctx.fill();

    // Oczy i nosek
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(c.x - 6, c.y - 3, 3.2, 0, Math.PI * 2);
    ctx.arc(c.x + 6, c.y - 3, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(c.x, c.y + 4, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawEffects() {
  for (let i = effects.length - 1; i >= 0; i--) {
    const ef = effects[i];
    ef.y -= 1.1;
    ef.life--;
    ctx.fillStyle = ef.color;
    ctx.font = "bold 15px monospace";
    ctx.textAlign = "center";
    ctx.fillText(ef.text, ef.x, ef.y);
    ctx.textAlign = "left";
    if (ef.life <= 0) effects.splice(i, 1);
  }
}

function drawOverlay(title, sub) {
  ctx.fillStyle = "rgba(15, 23, 42, 0.76)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, CX, CY - 14);
  ctx.fillStyle = "#fde68a";
  ctx.font = "15px sans-serif";
  ctx.fillText(sub, CX, CY + 20);
  ctx.textAlign = "left";
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlateAndGuard();

  if (gameState === "START") {
    drawOverlay("🛡️ Koci Firewall Gotowy!", "Dotknij ekranu, aby bronić ciasteczek Olusi!");
  } else if (gameState === "PLAYING") {
    frame++;
    const spawnRate = Math.max(36, Math.floor(85 - score * 1.1));
    if (frame % spawnRate === 0) spawnCat();

    for (let i = cats.length - 1; i >= 0; i--) {
      const c = cats[i];
      const angle = Math.atan2(CY - c.y, CX - c.x);
      c.x += Math.cos(angle) * c.speed;
      c.y += Math.sin(angle) * c.speed;

      if (Math.hypot(CX - c.x, CY - c.y) < 52) {
        if (!c.isBonus) {
          cookies--;
          addEffect(CX, CY - 45, "🍪 -1 Cookie!", "#ef4444");
          updateHud();
          if (cookies <= 0) {
            gameState = "GAMEOVER";
          }
        }
        cats.splice(i, 1);
      }
    }

    drawCats();
    drawEffects();
  } else if (gameState === "GAMEOVER") {
    drawOverlay(
      `🍪 Koniec zapasów! Zablokowano: ${score} kociaków`,
      "Dotknij ekranu, aby upiec nową partię ciasteczek!"
    );
  }

  requestAnimationFrame(loop);
}

canvas.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  if (gameState === "START" || gameState === "GAMEOVER") {
    resetGame();
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const clickX = (e.clientX - rect.left) * scaleX;
  const clickY = (e.clientY - rect.top) * scaleY;

  for (let i = cats.length - 1; i >= 0; i--) {
    const c = cats[i];
    if (Math.hypot(clickX - c.x, clickY - c.y) <= c.r + 14) {
      if (c.isBonus) {
        if (cookies < 5) cookies++;
        score += 2;
        addEffect(c.x, c.y, "☕ Kakao Olusi! +1 🍪", "#ec4899");
      } else {
        score++;
        addEffect(c.x, c.y, "🐾 403 BLOCKED!", "#10b981");
      }
      cats.splice(i, 1);
      updateHud();
      break;
    }
  }
});

loop();
