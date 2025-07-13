const cube = document.getElementById("cube");
const timerDisplay = document.getElementById("timer");
const movesDisplay = document.getElementById("moves");

let timer = 0;
let interval;
let moves = 0;
let colors = ["red", "green", "blue", "yellow", "orange", "white"];
let tiles = [];

function startTimer() {
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);
}

function createCube() {
  cube.innerHTML = "";
  tiles = [];

  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;
    const color = colors[i % colors.length];
    tile.style.backgroundColor = color;
    tile.dataset.color = color;
    cube.appendChild(tile);
    tiles.push(tile);

    tile.addEventListener("click", () => {
      rotateTile(i);
    });

    enableDrag(tile);
  }
}

function rotateTile(index) {
  const tile = tiles[index];
  const current = colors.indexOf(tile.dataset.color);
  const next = (current + 1) % colors.length;
  tile.dataset.color = colors[next];
  tile.style.backgroundColor = colors[next];
  moves++;
  movesDisplay.textContent = moves;
}

function shuffleCube() {
  for (let tile of tiles) {
    const rand = Math.floor(Math.random() * colors.length);
    tile.dataset.color = colors[rand];
    tile.style.backgroundColor = colors[rand];
  }
  moves = 0;
  movesDisplay.textContent = moves;
  timer = 0;
  timerDisplay.textContent = timer;
  clearInterval(interval);
  startTimer();
}

function resetGame() {
  createCube();
  moves = 0;
  timer = 0;
  clearInterval(interval);
  timerDisplay.textContent = 0;
  movesDisplay.textContent = 0;
}

function enableDrag(tile) {
  let startX, startY;

  tile.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });

  tile.addEventListener("mouseup", (e) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > 20 || Math.abs(dy) > 20) {
      rotateTile(parseInt(tile.dataset.index));
    }
  });

  // Mobile touch
  tile.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  tile.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    if (Math.abs(dx) > 20 || Math.abs(dy) > 20) {
      rotateTile(parseInt(tile.dataset.index));
    }
  });
}

createCube();
startTimer();
