const gridContainer = document.querySelector(".grid-container");
const colorInput = document.querySelector("#colorPicker");
const customColorPicker = document.querySelector(".custom-color-picker");
const buttons = document.querySelector(".buttons");
let selection = document.querySelector("#colorMode");
let userSelectedColor = colorInput.value;

const gridSquares = generateGridSquares(16);
gridContainer.append(...gridSquares);

colorInput.addEventListener("input", (e) => {
  customColorPicker.style.backgroundColor = e.target.value;
  userSelectedColor = e.target.value;
});

buttons.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const previousSelection = document.querySelector(".selected");
    const currentSelection = e.target;

    if (currentSelection.id === "Clear") {
      e.target.classList.add("click");
      e.target.addEventListener("transitionend", (e) => {
        e.target.classList.remove("click");
      });
      gridSquares.forEach((square) => {
        square.style.backgroundColor = "#eee";
        square.style.boxShadow = `0 0 0 0.1px #222`;
        square.style.opacity = 1;
      });
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
        console.log(userSelectedColor);
        e.target.style.boxShadow = `0 0 0 0.1px ${userSelectedColor}`;
        break;
      case "rainbowMode":
        e.target.style.backgroundColor = getRandomColor();
        e.target.style.boxShadow = `0 0 0 0.1px ${getRandomColor()}`;
        break;
      case "Eraser":
        resetSquareStyles(e);
        break;
      default:
        break;
    }
  }
});

function resetSquareStyles(e) {
  e.target.style.backgroundColor = "#eee";
  e.target.style.boxShadow = `0 0 0 0.1px #222`;
  e.target.style.opacity = 1;
}

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
