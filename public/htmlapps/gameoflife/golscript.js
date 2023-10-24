let grid;
let savedGrid;
let cols;
let rows;
let resolution = 24; // Adjust this for the size of your grid
let isPaused = true; // Add this global variable to track the game state

let w = window.innerWidth;
let h= window.innerHeight;

let isDragging = false;
let initialCellState = false;

function setup() {
    createCanvas(w, h);
  
    cols = floor(w / resolution);
    rows = floor(h / resolution);
    grid = createGrid(cols, rows);
    nextGen = createGrid(cols, rows);
  
    frameRate(10);
  
    mousePressed = handleMousePressed;
    mouseReleased = handleMouseReleased;
    mouseDragged = handleMouseDragged;
  }
  
function togglePausePlay() {
    isPaused = !isPaused;
    const button = document.getElementById('pauseplay');

    if (isPaused) {
        button.textContent = '▷';
        frameRate(60);
    } else {
        button.textContent = '| |';
        frameRate(Number(document.getElementById("speedSlider").value));
    }
}

window.addEventListener("resize", (event) => {
    setScale();
});

function setScale(){
    w = window.innerWidth;
    h= window.innerHeight;
  let resSlider = document.getElementById("scaleslider");
  resolution = resSlider.value;
  setup();
}

function setSpeed(){
  let speedSlider = document.getElementById("speedSlider");
  frameRate(Number(speedSlider.value));
}

async function saveGrid(){
    savedGrid = JSON.parse(JSON.stringify(grid));
    saveButton = document.getElementById("savebutton");
    saveButton.textContent = "✅";
    await new Promise(resolve => setTimeout(resolve, 1000));
    saveButton.textContent = "💾";

}

function clearGrid(){
    grid = createGrid(cols, rows);
}

function takeBack(){
    grid = JSON.parse(JSON.stringify(savedGrid));
    if(!isPaused){ togglePausePlay()};
}

  function draw() {
    background(255);
    if (!isPaused) {
      computeNextGeneration();
    }
    drawGrid(grid);
  }
  
  function drawGrid(current) {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let cell = current[x][y];
        if (cell.isAlive) {
          fill(cell.color);
          stroke(0);
        } else {
          noFill();
          stroke(200);
        }
        rect(x * resolution, y * resolution, resolution, resolution);
      }
    }
  }
  
function handleMousePressed() {
    isDragging = true;
    initialCellState = grid[floor(mouseX / resolution)][floor(mouseY / resolution)].isAlive;
    handleMouseDragged();
}

function handleMouseReleased() {
    isDragging = false;
}

function handleMouseDragged() {
    if (!isDragging) return;

    let x = floor(mouseX / resolution);
    let y = floor(mouseY / resolution);
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
            grid[x][y].isAlive = !initialCellState;
        }
}
  
  function computeNextGeneration() {
    countAllNeighbors();
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        neighbors = grid[x][y].totalN;
        let cell = grid[x][y];
        if (!cell.isAlive && neighbors === 3) {
          cell.isAlive = true;
          // You can modify other properties here as well
        } else if (cell.isAlive && (neighbors < 2 || neighbors > 3)) {
          cell.isAlive = false;
          // You can modify other properties here as well
        }
      }
    }
  }
  
  function createGrid(cols, rows) {
    let grid = new Array(cols);
    for (let x = 0; x < cols; x++) {
      grid[x] = new Array(rows);
      for (let y = 0; y < rows; y++) {
        grid[x][y] = {
            totalN: 0,
            redN: 0,
            greenN: 0,
            blueN: 0,

            color: 0,
            isAlive: false,
        };
      }
    }
    return grid;
  }
  
  function countAllNeighbors() {
    // Reset totalN and color-specific counts before counting
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let cell = grid[col][row];
            cell.totalN = 0;
            cell.redN = 0;
            cell.greenN = 0;
            cell.blueN = 0;
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = grid[col][row];
            if (!cell.isAlive) continue;

            // Define the directions array
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1],  [1, 0],  [1, 1]
            ];

            for (const [dx, dy] of directions) {
                let newRow = (row + dx + rows) % rows; // Apply modulus for looping
                let newCol = (col + dy + cols) % cols; // Apply modulus for looping

                const neighbor = grid[newCol][newRow];
                neighbor.totalN += 1;

                if (cell.color === 1) {
                    neighbor.redN += 1;
                } else if (cell.color === 2) {
                    neighbor.greenN += 1;
                } else if (cell.color === 3) {
                    neighbor.blueN += 1;
                }
            }
        }
    }
}
