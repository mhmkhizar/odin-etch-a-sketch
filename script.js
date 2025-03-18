const gridContainer = document.querySelector(".grid-container");
const gridSquares = generateGridSquares(16);

gridContainer.append(...gridSquares);

gridContainer.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("square")) {
    e.target.classList.add("color");
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
