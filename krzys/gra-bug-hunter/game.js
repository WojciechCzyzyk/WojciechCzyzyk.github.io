const slots = document.querySelectorAll(".slot");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timeEl = document.getElementById("time");
const bestEl = document.getElementById("best");
const statusBanner = document.getElementById("statusBanner");
const startBtn = document.getElementById("startBtn");

let bestScore = parseInt(localStorage.getItem("ys_bug_hunter_best") || "0", 10);
bestEl.textContent = bestScore;

let score = 0;
let lives = 3;
let timeLeft = 45;
let isPlaying = false;
let turboMode = false;
let gameTimer = null;
let spawnTimer = null;
let turboTimeout = null;

const slotStates = Array(9).fill(null);

function clearSlot(idx) {
  slotStates[idx] = null;
  const s = slots[idx];
  s.className = "slot";
  s.innerHTML = "";
}

function clearAllSlots() {
  for (let i = 0; i < 9; i++) clearSlot(i);
}

function updateHud() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  timeEl.textContent = timeLeft;

  if (score > bestScore) {
    bestScore = score;
    bestEl.textContent = bestScore;
    localStorage.setItem("ys_bug_hunter_best", bestScore);
  }
}

function activateTurbo() {
  turboMode = true;
  statusBanner.textContent = "🦄 TURBO SPRINT OD OLUSI! Podwójne punkty (2x) przez 5s!";
  clearTimeout(turboTimeout);
  turboTimeout = setTimeout(() => {
    turboMode = false;
    if (isPlaying) {
      statusBanner.textContent = "🔍 Szukaj robaków i błędów 404 na tablicy Kanban!";
    }
  }, 5000);
}

function spawnEntity() {
  if (!isPlaying) return;

  const freeIndices = [];
  slotStates.forEach((st, idx) => {
    if (st === null) freeIndices.push(idx);
  });
  if (freeIndices.length === 0) return;

  const idx = freeIndices[Math.floor(Math.random() * freeIndices.length)];
  const rand = Math.random();

  let item;
  if (rand < 0.62) {
    const bugs = [
      { type: "bug", icon: "🐛", label: "BUG!" },
      { type: "bug", icon: "⚠️", label: "ERR 404" },
      { type: "bug", icon: "🕷️", label: "GLITCH" }
    ];
    item = bugs[Math.floor(Math.random() * bugs.length)];
  } else if (rand < 0.88) {
    item = { type: "safe", icon: "✅", label: "BUILD OK" };
  } else {
    const bonuses = [
      { type: "bonus", icon: "🍪", label: "COOKIE 2x" },
      { type: "bonus", icon: "🦄", label: "UX BOOST" }
    ];
    item = bonuses[Math.floor(Math.random() * bonuses.length)];
  }

  slotStates[idx] = item.type;
  const s = slots[idx];
  s.className = `slot ${item.type}`;
  s.innerHTML = `<div>${item.icon}</div><div class="slot-label">${item.label}</div>`;

  const visibleTime = Math.max(750, 1450 - (45 - timeLeft) * 14);
  setTimeout(() => {
    if (slotStates[idx] === item.type) {
      clearSlot(idx);
    }
  }, visibleTime);
}

function endGame(reason) {
  isPlaying = false;
  turboMode = false;
  clearInterval(gameTimer);
  clearInterval(spawnTimer);
  clearTimeout(turboTimeout);
  clearAllSlots();
  startBtn.disabled = false;
  startBtn.textContent = "🔄 Uruchom Kolejny Sprint QA";

  const rank =
    score >= 250
      ? "🏆 Legendarny Senior QA Architect (+100 XP)!"
      : score >= 140
      ? "⭐ Mistrz Łapania Bugów (+100 XP)!"
      : "✅ Solidny Audyt Produkcji (+100 XP)!";

  statusBanner.textContent = `${reason} Wynik: ${score} pkt — ${rank}`;
}

function startGame() {
  score = 0;
  lives = 3;
  timeLeft = 45;
  isPlaying = true;
  turboMode = false;
  clearAllSlots();
  updateHud();

  startBtn.disabled = true;
  statusBanner.textContent = "🚀 Sprint wystartował! Klikaj 🐛 i ⚠️, omijaj ✅!";

  gameTimer = setInterval(() => {
    timeLeft--;
    updateHud();
    if (timeLeft <= 0) {
      endGame("⏱️ Koniec czasu sprintu!");
    }
  }, 1000);

  spawnTimer = setInterval(() => {
    spawnEntity();
    if (timeLeft < 22 && Math.random() < 0.45) {
      spawnEntity();
    }
  }, 680);
}

slots.forEach((slot, idx) => {
  slot.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    if (!isPlaying) return;

    const type = slotStates[idx];
    if (!type) return;

    if (type === "bug") {
      const pts = turboMode ? 20 : 10;
      score += pts;
      statusBanner.textContent = `💥 Hotfix wdrożony! +${pts} pkt`;
      clearSlot(idx);
    } else if (type === "safe") {
      lives--;
      statusBanner.textContent = "🚨 UPS! Kliknąłeś zielony kod Baty! (-1 ❤️)";
      clearSlot(idx);
      if (lives <= 0) {
        updateHud();
        endGame("💥 Production Crash (0 żyć)!");
        return;
      }
    } else if (type === "bonus") {
      score += 15;
      clearSlot(idx);
      activateTurbo();
    }

    updateHud();
  });
});

startBtn.addEventListener("click", startGame);
