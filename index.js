const GRID_SIZE = 10;
let hitCount = 0;

// create the 2d array that will contain the status of each square on the board
const gameBoard = Array.from({ length: GRID_SIZE }, () =>
  Array.from({ length: GRID_SIZE }, () => 0)
);

const ships = [
  { name: "Carrier", size: 5 },
  { name: "Battleship", size: 4 },
  { name: "Destroyer", size: 4 },
];

const totalShipSize = ships.reduce((acc, ship) => acc + ship.size, 0);

// Create a 10x10 grid and add event listeners to each square.
const gridContainer = document.querySelector(".grid-container");

for (let i = 0; i < GRID_SIZE; i++) {
  const gridRow = document.createElement("div");
  gridRow.classList.add("grid-row");
  for (let j = 0; j < GRID_SIZE; j++) {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("grid-square");
    gridSquare.id = `s${i}${j}`;
    gridSquare.style.cursor = "pointer";
    gridRow.appendChild(gridSquare);

    // Add event listener to the grid square
    gridSquare.addEventListener("click", (e) => {
      const row = e.target.id.substring(1, 2);
      const col = e.target.id.substring(2, 3);

      if (gameBoard[row][col] === 1) {
        e.target.style.background = "red";
        gameBoard[row][col] = 2;
        hitCount++;
      } else if (gameBoard[row][col] === 0) {
        e.target.style.background = "#bbb";
        gameBoard[row][col] = 3;
      } else {
        alert("You already shot here!");
        return;
      }

      if (hitCount === totalShipSize) {
        alert("You sank all my battleships!");
      }
    });
  }
  gridContainer.appendChild(gridRow);
}

const availablePositions = new Set();
for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
  availablePositions.add(i);
}

const placeShips = () => {
  ships.forEach((ship) => {
    let placed = false;

    while (!placed) {
      const position = Math.floor(Math.random() * availablePositions.size);
      const [row, col] = [
        Math.floor(position / GRID_SIZE),
        position % GRID_SIZE,
      ];
      const direction = Math.floor(Math.random() * 2);

      if (direction === 0) {
        // horizontal
        if (col + ship.size <= GRID_SIZE) {
          let canPlace = true;
          for (let i = 0; i < ship.size; i++) {
            if (gameBoard[row][col + i] === 1) {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < ship.size; i++) {
              gameBoard[row][col + i] = 1;
              availablePositions.delete(row * GRID_SIZE + col + i);
            }
            placed = true;
          }
        }
      } else {
        // vertical
        if (row + ship.size <= GRID_SIZE) {
          let canPlace = true;
          for (let i = 0; i < ship.size; i++) {
            if (gameBoard[row + i][col] === 1) {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < ship.size; i++) {
              gameBoard[row + i][col] = 1;
              availablePositions.delete((row + i) * GRID_SIZE + col);
            }
            placed = true;
          }
        }
      }
    }
  });
  console.log({ gameBoard });
};

placeShips();
