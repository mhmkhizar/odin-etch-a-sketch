const gridContainer = document.querySelector(".grid-container");
const colorInput = document.querySelector("#color-picker");
const customColorPicker = document.querySelector(".custom-color-picker");

const gridSquares = generateGridSquares(16);
gridContainer.append(...gridSquares);

colorInput.addEventListener("input", (e) => {
  customColorPicker.style.backgroundColor = e.target.value;
});

gridContainer.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("square")) {
    e.target.style.backgroundColor = colorInput.value;
    e.target.style.boxShadow = `0 0 0 0.05px ${colorInput.value}`;
  }
});

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
