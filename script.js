const gridContainer = document.querySelector(".grid-container");
const squares = generateGridSquares(16);

gridContainer.append(...squares);

function generateGridSquares(size) {
  const squaresQuantity = size * size;
  const squares = [];

  for (let i = 0; i < squaresQuantity; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    squares.push(square);
  }

  return squares;
}
