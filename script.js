const gridContainer = document.querySelector(".grid-container");
const colorInput = document.querySelector("#colorPicker");
const customColorPicker = document.querySelector(".custom-color-picker");
const buttons = document.querySelector(".buttons");
let selection = document.querySelector("#colorMode");

const gridSquares = generateGridSquares(16);
gridContainer.append(...gridSquares);

let userSelectedColor = colorInput.value;

colorInput.addEventListener("input", (e) => {
  customColorPicker.style.backgroundColor = colorInput.value;
  userSelectedColor = e.target.value;
});

buttons.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const previousSelection = document.querySelector(".selected");
    const currentSelection = e.target;

    if (currentSelection.id === "Clear") {
      gridSquares.forEach((square) => (square.style.backgroundColor = "#eee"));
    } else {
      previousSelection.classList.remove("selected");
      currentSelection.classList.add("selected");
      selection = currentSelection;
    }
  }
});

gridContainer.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("square")) {
    switch (selection.id) {
      case "colorMode":
        e.target.style.backgroundColor = userSelectedColor;
        e.target.style.boxShadow = `0 0 0 0.1px ${userSelectedColor}`;
        break;
      case "rainbowMode":
        e.target.style.backgroundColor = getRandomColor();
        e.target.style.boxShadow = `0 0 0 0.1px ${getRandomColor()}`;
        break;
      case "Eraser":
        e.target.style.backgroundColor = "#eee";
        e.target.style.boxShadow = "0 0 0 0.1px #222";
        break;
      default:
        break;
    }
  }
});

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function generateGridSquares(size) {
  const squaresQuantity = size * size;
  const squareSize = 400 / size;
  const squares = [];

  for (let i = 0; i < squaresQuantity; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    squares.push(square);
  }

  return squares;
}
