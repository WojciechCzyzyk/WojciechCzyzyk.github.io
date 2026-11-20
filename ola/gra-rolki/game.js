const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const cookiesEl = document.getElementById("cookies");
const bestEl = document.getElementById("best");

let bestScore = parseInt(localStorage.getItem("olusia_rolki_best") || "0", 10);
bestEl.textContent = bestScore;

const GROUND_Y = 210;
let gameState = "START"; // START, PLAYING, GAMEOVER
let score = 0;
let cookieCount = 0;
let speed = 5.2;
let frame = 0;

const ola = {
  x: 155,
  y: GROUND_Y,
  vy: 0,
  grounded: true,
  jump() {
    if (this.grounded) {
      this.vy = -12.8;
      this.grounded = false;
    }
  },
  update() {
    this.vy += 0.62;
    this.y += this.vy;
    if (this.y >= GROUND_Y) {
      this.y = GROUND_Y;
      this.vy = 0;
      this.grounded = true;
    }
  }
};

const cat = {
  x: 68,
  y: GROUND_Y,
  update() {
    this.y += (ola.y - this.y) * 0.22;
  }
};

let obstacles = [];
let bonuses = [];
let pillarOffset = 0;

function resetGame() {
  score = 0;
  cookieCount = 0;
  speed = 5.2;
  frame = 0;
  obstacles = [];
  bonuses = [];
  ola.y = GROUND_Y;
  ola.vy = 0;
  ola.grounded = true;
  cat.y = GROUND_Y;
  gameState = "PLAYING";
  updateHud();
}

function updateHud() {
  const displayScore = Math.floor(score);
  scoreEl.textContent = displayScore;
  cookiesEl.textContent = cookieCount;
  if (displayScore > bestScore) {
    bestScore = displayScore;
    bestEl.textContent = bestScore;
    localStorage.setItem("olusia_rolki_best", bestScore);
  }
}

function spawnEntities() {
  if (frame % Math.max(58, Math.floor(105 - speed * 4)) === 0) {
    const types = [
      { label: "LEGO", w: 32, h: 36, color: "#ef4444" },
      { label: "PUFA", w: 42, h: 28, color: "#8b5cf6" },
      { label: "MISKA", w: 34, h: 22, color: "#0ea5e9" }
    ];
    const t = types[Math.floor(Math.random() * types.length)];
    obstacles.push({
      x: canvas.width + 20,
      y: GROUND_Y - t.h,
      w: t.w,
      h: t.h,
      color: t.color,
      label: t.label
    });
  }

  if (frame % 135 === 45) {
    bonuses.push({
      x: canvas.width + 20,
      y: GROUND_Y - 78 - Math.random() * 28,
      r: 14,
      collected: false
    });
  }
}

function drawBackground() {
  ctx.fillStyle = "#fffbeb";
  ctx.fillRect(0, 0, canvas.width, GROUND_Y);

  pillarOffset = (pillarOffset - speed * 0.45) % 480;
  const px = 480 + pillarOffset;
  ctx.fillStyle = "#fed7aa";
  ctx.fillRect(px, 25, 75, GROUND_Y - 25);
  ctx.strokeStyle = "#fb923c";
  ctx.lineWidth = 2;
  ctx.strokeRect(px, 25, 75, GROUND_Y - 25);
  ctx.fillStyle = "#c2410c";
  ctx.font = "bold 11px monospace";
  ctx.fillText("KOMIN", px + 18, 52);

  ctx.fillStyle = "#d97706";
  ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
  ctx.strokeStyle = "#92400e";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.lineTo(canvas.width, GROUND_Y);
  ctx.stroke();
}

function drawCharacters() {
  // Sznurek między Olusią a kotem
  ctx.strokeStyle = "#ec4899";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(ola.x + 8, ola.y - 24);
  ctx.quadraticCurveTo((ola.x + cat.x) / 2, Math.max(ola.y, cat.y) - 8, cat.x + 26, cat.y - 14);
  ctx.stroke();

  // Pręgowany kociak (QA Tester)
  ctx.fillStyle = "#9ca3af";
  ctx.beginPath();
  ctx.roundRect(cat.x, cat.y - 24, 30, 18, 8);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cat.x + 28, cat.y - 22, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cat.x + 22, cat.y - 30);
  ctx.lineTo(cat.x + 25, cat.y - 38);
  ctx.lineTo(cat.x + 29, cat.y - 30);
  ctx.moveTo(cat.x + 29, cat.y - 30);
  ctx.lineTo(cat.x + 33, cat.y - 38);
  ctx.lineTo(cat.x + 36, cat.y - 30);
  ctx.fill();
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cat.x, cat.y - 18);
  ctx.lineTo(cat.x - 10, cat.y - 28 + Math.sin(frame * 0.3) * 4);
  ctx.stroke();

  // Olusia (CEO & UX Designer)
  ctx.fillStyle = "#f472b6";
  ctx.fillRect(ola.x + 10, ola.y - 24, 14, 16);
  ctx.fillStyle = "#1e293b";
  ctx.beginPath();
  ctx.roundRect(ola.x + 6, ola.y - 44, 22, 22, 6);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 7px sans-serif";
  ctx.fillText("CEO", ola.x + 9, ola.y - 31);

  ctx.fillStyle = "#fde68a";
  ctx.beginPath();
  ctx.arc(ola.x + 17, ola.y - 52, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#facc15";
  ctx.beginPath();
  ctx.arc(ola.x + 5, ola.y - 54, 7, 0, Math.PI * 2);
  ctx.fill();

  // Różowe rolki (3 kółka)
  ctx.fillStyle = "#ec4899";
  ctx.fillRect(ola.x + 6, ola.y - 9, 24, 5);
  ctx.fillStyle = "#db2777";
  [ola.x + 9, ola.x + 17, ola.x + 26].forEach(wx => {
    ctx.beginPath();
    ctx.arc(wx, ola.y - 3, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawObstaclesAndBonuses() {
  obstacles.forEach(ob => {
    ctx.fillStyle = ob.color;
    ctx.beginPath();
    ctx.roundRect(ob.x, ob.y, ob.w, ob.h, 6);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 9px sans-serif";
    ctx.fillText(ob.label, ob.x + 3, ob.y + ob.h / 2 + 3);
  });

  bonuses.forEach(b => {
    if (b.collected) return;
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#92400e";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#451a03";
    ctx.fillRect(b.x - 5, b.y - 4, 3, 3);
    ctx.fillRect(b.x + 3, b.y - 2, 3, 3);
    ctx.fillRect(b.x - 1, b.y + 4, 3, 3);
  });
}

function drawOverlay(title, sub) {
  ctx.fillStyle = "rgba(15, 23, 42, 0.72)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 12);
  ctx.fillStyle = "#fbcfe8";
  ctx.font = "15px sans-serif";
  ctx.fillText(sub, canvas.width / 2, canvas.height / 2 + 20);
  ctx.textAlign = "left";
}

function loop() {
  drawBackground();

  if (gameState === "START") {
    drawCharacters();
    drawOverlay("🛼 Gotowa na pętlę while(true)?", "Dotknij ekranu lub naciśnij SPACJĘ, aby wystartować!");
  } else if (gameState === "PLAYING") {
    frame++;
    score += 0.15;
    speed = Math.min(10.5, 5.2 + score * 0.004);

    ola.update();
    cat.update();
    spawnEntities();

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const ob = obstacles[i];
      ob.x -= speed;

      if (
        ola.x + 26 > ob.x + 4 &&
        ola.x + 8 < ob.x + ob.w - 4 &&
        ola.y > ob.y + 4
      ) {
        gameState = "GAMEOVER";
      }

      if (ob.x + ob.w < 0) obstacles.splice(i, 1);
    }

    for (let i = bonuses.length - 1; i >= 0; i--) {
      const b = bonuses[i];
      b.x -= speed;

      if (!b.collected) {
        const dx = (ola.x + 17) - b.x;
        const dy = (ola.y - 32) - b.y;
        if (Math.hypot(dx, dy) < b.r + 22) {
          b.collected = true;
          cookieCount++;
          score += 25;
        }
      }
      if (b.x + b.r < 0) bonuses.splice(i, 1);
    }

    drawObstaclesAndBonuses();
    drawCharacters();
    updateHud();
  } else if (gameState === "GAMEOVER") {
    drawObstaclesAndBonuses();
    drawCharacters();
    drawOverlay(
      `💥 Collision Exception! Wynik: ${Math.floor(score)} pkt (🍪 ${cookieCount})`,
      "Dotknij ekranu lub naciśnij SPACJĘ, aby uruchomić kolejny sprint!"
    );
  }

  requestAnimationFrame(loop);
}

function handleAction(e) {
  if (e && e.type === "keydown" && e.code !== "Space" && e.code !== "ArrowUp") return;
  if (e) e.preventDefault();

  if (gameState === "START" || gameState === "GAMEOVER") {
    resetGame();
  } else if (gameState === "PLAYING") {
    ola.jump();
  }
}

canvas.addEventListener("pointerdown", handleAction);
window.addEventListener("keydown", handleAction);

loop();
