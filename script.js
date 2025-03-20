const gridContainer = document.querySelector(".grid-container");
const colorInput = document.querySelector("#colorPicker");
const customColorPicker = document.querySelector(".custom-color-picker");
const selectionButtons = document.querySelector(".buttons");
const sizeSpans = document.querySelectorAll(".range-container .count");
const rangeInput = document.querySelector("#gridSize");

let currentColor = colorInput.value;
let currentSelection = document.querySelector("#colorMode");
let currentSize = rangeInput.value;

const defaultGrid = generateGrid(currentSize);
gridContainer.append(...defaultGrid);
let updatedGrid;

colorInput.addEventListener("input", (e) => {
  const selectedValue = e.target.value;
  customColorPicker.style.backgroundColor = selectedValue;
  currentColor = selectedValue;
});

selectionButtons.addEventListener("click", (e) => {
  const selectedButton = e.target;
  if (selectedButton.tagName !== "BUTTON") return;

  if (selectedButton.id === "Clear") {
    selectedButton.classList.add("click");
    selectedButton.addEventListener("transitionend", (e) => {
      e.target.classList.remove("click");
    });

    (updatedGrid || defaultGrid).forEach((square) => resetSquare(square));
    return;
  }

  if (currentSelection.classList.contains("selected")) {
    currentSelection.classList.remove("selected");
  }

  selectedButton.classList.add("selected");
  currentSelection = selectedButton;
});

rangeInput.addEventListener("input", (e) => {
  const selectedValue = e.target.value;
  sizeSpans.forEach((span) => (span.textContent = selectedValue));

  currentSize = selectedValue;
  updatedGrid = generateGrid(selectedValue);
  gridContainer.replaceChildren(...updatedGrid);
});

gridContainer.addEventListener("mouseover", (e) => {
  if (!e.target.classList.contains("square")) return;

  const square = e.target;

  switch (currentSelection.id) {
    case "colorMode":
      square.style.backgroundColor = currentColor;
      square.style.boxShadow = "none";
      break;
    case "rainbowMode":
      square.style.backgroundColor = getRandomColor();
      square.style.boxShadow = "none";
      break;
    case "Eraser":
      resetSquare(square);
      break;
    default:
      break;
  }
});

function resetSquare(element) {
  const square = element.target ? element.target : element;

  square.style.backgroundColor = "#eee";
  square.style.boxShadow = `0 0 0 0.1px #222`;
  square.style.opacity = 1;
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function generateGrid(gridSize) {
  const totalSquares = gridSize * gridSize;
  const squareDimension = 400 / gridSize;
  const gridSquares = [];

  for (let i = 0; i < totalSquares; i++) {
    const squareElement = document.createElement("div");
    squareElement.classList.add("square");
    squareElement.style.width = `${squareDimension}px`;
    squareElement.style.height = `${squareDimension}px`;
    gridSquares.push(squareElement);
  }

  return gridSquares;
}
