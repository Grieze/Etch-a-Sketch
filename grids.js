const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 64;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

// DOM objects
const colorPicker = document.getElementById('colorPicker');
const colorButton = document.getElementById('colorButton');
const rainbowButton = document.getElementById('rainbowButton');
const eraserButton = document.getElementById('eraserButton');
const clearButton = document.getElementById('clearButton');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');
const container = document.getElementById('container')

// button functionality
colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorButton.onclick = () => setCurrentMode('color');
rainbowButton.onclick = () => setCurrentMode('rainbow');
eraserButton.onclick = () => setCurrentMode('eraser');
clearButton.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

// function declarations and definitions
function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function clearGrid() {
  grid.innerHTML = '';
  container.style.animation = "shake 0.5s";
  container.addEventListener("animationend", () => {
    container.style.animation = "";
  })
}

function reloadGrid() {
  clearGrid();
  makeGrid(currentSize);
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function makeGrid(n) {
  grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${n}, 1fr)`;
  for (let i = 0; i < n * n; i++) {
    const gridElement = document.createElement('div');
    gridElement.addEventListener('mouseover', changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe';
  }
}

function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowButton.classList.remove('active');
  }
  else if (currentMode === 'color') {
    colorButton.classList.remove('active');
  }
  else if (currentMode === 'eraser') {
    eraserButton.classList.remove('active');
  }

  if (newMode === 'rainbow') {
    rainbowButton.classList.add('active');
  }
  else if (newMode === 'color') {
    colorButton.classList.add('active');
  }
  else if (newMode === 'eraser') {
    eraserButton.classList.add('active');
  }
}

window.onload = () => {
  makeGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
}
