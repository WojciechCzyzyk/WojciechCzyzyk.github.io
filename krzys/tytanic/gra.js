const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('best-score');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayDesc = document.getElementById('overlay-desc');
const startBtn = document.getElementById('start-btn');

let bestScore = Number(localStorage.getItem('titanic_best') || 0);
bestScoreEl.textContent = bestScore;

const ship = { x: 162, y: 405, w: 36, h: 92, speed: 5 };
let icebergs = [];
let keys = { left: false, right: false };
let distance = 0;
let speedMult = 1;
let spawnTimer = 0;
let running = false;

function startGame() {
  ship.x = canvas.width / 2 - ship.w / 2;
  icebergs = [];
  distance = 0;
  speedMult = 1;
  spawnTimer = 0;
  running = true;
  overlay.style.display = 'none';
  requestAnimationFrame(loop);
}

function drawOcean() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(125, 211, 252, 0.12)';
  ctx.lineWidth = 2;
  const offset = (distance * 3) % 40;
  for (let y = offset; y < canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(15, y);
    ctx.lineTo(canvas.width - 15, y);
    ctx.stroke();
  }
}

function drawShip() {
  const { x, y, w, h } = ship;
  // Kilwater (piana za rufą)
  ctx.fillStyle = 'rgba(224, 242, 254, 0.25)';
  ctx.beginPath();
  ctx.moveTo(x + 6, y + h);
  ctx.lineTo(x + w - 6, y + h);
  ctx.lineTo(x + w + 10, y + h + 28);
  ctx.lineTo(x - 10, y + h + 28);
  ctx.closePath();
  ctx.fill();

  // Kadłub Titanica (czarny z czerwonym dziobem)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w, y + 26);
  ctx.lineTo(x + w - 3, y + h);
  ctx.lineTo(x + 3, y + h);
  ctx.lineTo(x, y + 26);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Biały pokład i 4 kultowe kominy
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(x + 7, y + 24, w - 14, h - 34);
  for (let i = 0; i < 4; i++) {
    const fy = y + 30 + i * 14;
    ctx.fillStyle = '#d97706';
    ctx.fillRect(x + w / 2 - 4, fy, 8, 9);
    ctx.fillStyle = '#020617';
    ctx.fillRect(x + w / 2 - 4, fy, 8, 3);
  }
}

function drawIceberg(ice) {
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.moveTo(ice.x + ice.w * 0.5, ice.y);
  ctx.lineTo(ice.x + ice.w, ice.y + ice.h * 0.45);
  ctx.lineTo(ice.x + ice.w * 0.82, ice.y + ice.h);
  ctx.lineTo(ice.x + ice.w * 0.15, ice.y + ice.h);
  ctx.lineTo(ice.x, ice.y + ice.h * 0.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.moveTo(ice.x + ice.w * 0.5, ice.y + 3);
  ctx.lineTo(ice.x + ice.w * 0.72, ice.y + ice.h * 0.45);
  ctx.lineTo(ice.x + ice.w * 0.45, ice.y + ice.h * 0.65);
  ctx.lineTo(ice.x + ice.w * 0.22, ice.y + ice.h * 0.42);
  ctx.closePath();
  ctx.fill();
}

function update() {
  if (keys.left && ship.x > 8) ship.x -= ship.speed;
  if (keys.right && ship.x + ship.w < canvas.width - 8) ship.x += ship.speed;

  distance += 0.35 * speedMult;
  speedMult = 1 + Math.floor(distance / 250) * 0.18;
  scoreEl.textContent = Math.floor(distance);

  spawnTimer++;
  const spawnInterval = Math.max(26, Math.floor(58 / speedMult));
  if (spawnTimer >= spawnInterval) {
    spawnTimer = 0;
    const w = 38 + Math.random() * 44;
    const h = 32 + Math.random() * 34;
    const x = Math.random() * (canvas.width - w);
    icebergs.push({ x, y: -h, w, h, vy: 2.8 * speedMult });
  }

  for (let i = icebergs.length - 1; i >= 0; i--) {
    const ice = icebergs[i];
    ice.y += ice.vy;

    // Uczciwy hitbox (lekki margines 5 px, żeby nie karać za muśnięcie krawędzi)
    if (
      ship.x + 5 < ice.x + ice.w - 4 &&
      ship.x + ship.w - 5 > ice.x + 4 &&
      ship.y + 6 < ice.y + ice.h - 4 &&
      ship.y + ship.h - 5 > ice.y + 4
    ) {
      endGame();
      return;
    }
    if (ice.y > canvas.height) icebergs.splice(i, 1);
  }
}

function endGame() {
  running = false;
  const finalDist = Math.floor(distance);
  if (finalDist > bestScore) {
    bestScore = finalDist;
    localStorage.setItem('titanic_best', bestScore);
    bestScoreEl.textContent = bestScore;
  }
  overlayTitle.textContent = '💥 Zderzenie z górą lodową!';
  overlayDesc.textContent = `Przepłynąłeś ${finalDist} m (Rekord: ${bestScore} m). Spróbuj jeszcze raz!`;
  startBtn.textContent = '🔄 Popłyń ponownie';
  overlay.style.display = 'flex';
}

function loop() {
  if (!running) return;
  update();
  drawOcean();
  icebergs.forEach(drawIceberg);
  drawShip();
  requestAnimationFrame(loop);
}

// Sterowanie klawiaturą
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
});

// Sterowanie dotykowe na telefonie
const bindBtn = (id, dir) => {
  const el = document.getElementById(id);
  el.addEventListener('pointerdown', (e) => { e.preventDefault(); keys[dir] = true; });
  el.addEventListener('pointerup', () => { keys[dir] = false; });
  el.addEventListener('pointerleave', () => { keys[dir] = false; });
};
bindBtn('btn-left', 'left');
bindBtn('btn-right', 'right');
startBtn.addEventListener('click', startGame);
