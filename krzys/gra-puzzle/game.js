const boardEl = document.getElementById("board");
const imageSelect = document.getElementById("imageSelect");
const sizeSelect = document.getElementById("sizeSelect");
const shuffleBtn = document.getElementById("shuffleBtn");
const movesEl = document.getElementById("moves");
const best3El = document.getElementById("best3");
const best4El = document.getElementById("best4");
const statusMsg = document.getElementById("statusMsg");

let gridSize = parseInt(sizeSelect.value, 10);
let currentImg = imageSelect.value;
let tiles = [];
let moves = 0;
let solved = false;

function loadRecords() {
  const b3 = localStorage.getItem("ys_puzzle_best_3");
  const b4 = localStorage.getItem("ys_puzzle_best_4");
  best3El.textContent = b3 ? `${b3} ruchów` : "-";
  best4El.textContent = b4 ? `${b4} ruchów` : "-";
}

function getNeighbors(emptyIdx, size) {
  const row = Math.floor(emptyIdx / size);
  const col = emptyIdx % size;
  const neighbors = [];
  if (row > 0) neighbors.push(emptyIdx - size);
  if (row < size - 1) neighbors.push(emptyIdx + size);
  if (col > 0) neighbors.push(emptyIdx - 1);
  if (col < size - 1) neighbors.push(emptyIdx + 1);
  return neighbors;
}

function initPuzzle() {
  gridSize = parseInt(sizeSelect.value, 10);
  currentImg = imageSelect.value;
  moves = 0;
  solved = false;
  movesEl.textContent = "0";
  statusMsg.textContent = "Kliknij kafelek obok pustego pola, aby go przesunąć!";

  const total = gridSize * gridSize;
  tiles = Array.from({ length: total }, (_, i) => i);

  // Mieszanie przez poprawne ruchy z ułożonego obrazka (gwarancja 100% rozwiązywalności)
  let emptyIdx = total - 1;
  let lastIdx = -1;
  const shuffleSteps = gridSize === 3 ? 65 : 140;

  for (let s = 0; s < shuffleSteps; s++) {
    const neighbors = getNeighbors(emptyIdx, gridSize).filter(n => n !== lastIdx);
    const nextIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
    [tiles[emptyIdx], tiles[nextIdx]] = [tiles[nextIdx], tiles[emptyIdx]];
    lastIdx = emptyIdx;
    emptyIdx = nextIdx;
  }

  renderBoard();
}

function renderBoard() {
  boardEl.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  boardEl.innerHTML = "";
  const total = gridSize * gridSize;
  const emptyVal = total - 1;

  tiles.forEach((tileVal, idx) => {
    const div = document.createElement("div");
    div.className = "tile";

    if (tileVal === emptyVal && !solved) {
      div.classList.add("empty");
    } else {
      const origRow = Math.floor(tileVal / gridSize);
      const origCol = tileVal % gridSize;
      const posX = gridSize > 1 ? (origCol / (gridSize - 1)) * 100 : 0;
      const posY = gridSize > 1 ? (origRow / (gridSize - 1)) * 100 : 0;

      div.style.backgroundImage = `url('${currentImg}')`;
      div.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;
      div.style.backgroundPosition = `${posX}% ${posY}%`;
    }

    div.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      handleTileClick(idx);
    });

    boardEl.appendChild(div);
  });
}

function handleTileClick(idx) {
  if (solved) return;
  const emptyVal = gridSize * gridSize - 1;
  const emptyIdx = tiles.indexOf(emptyVal);
  const validMoves = getNeighbors(emptyIdx, gridSize);

  if (!validMoves.includes(idx)) return;

  [tiles[emptyIdx], tiles[idx]] = [tiles[idx], tiles[emptyIdx]];
  moves++;
  movesEl.textContent = moves;

  checkWin();
  renderBoard();
}

function checkWin() {
  const isWin = tiles.every((val, idx) => val === idx);
  if (!isWin) return;

  solved = true;
  const key = `ys_puzzle_best_${gridSize}`;
  const prevBest = parseInt(localStorage.getItem(key) || "999999", 10);

  if (moves < prevBest) {
    localStorage.setItem(key, moves);
    loadRecords();
    statusMsg.textContent = `🏆 NOWY REKORD! Ułożono w ${moves} ruchach (+100 XP)!`;
  } else {
    statusMsg.textContent = `🎉 Brawo! Obrazek ułożony w ${moves} ruchach!`;
  }
}

imageSelect.addEventListener("change", initPuzzle);
sizeSelect.addEventListener("change", initPuzzle);
shuffleBtn.addEventListener("click", initPuzzle);

loadRecords();
initPuzzle();
