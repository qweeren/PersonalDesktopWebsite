let numRows = 20;
let numCols = 20;
const cellSize = 20;
const wait = 100;
let generation = 0;

const playIcon = "▷";
const pauseIcon = "| |";

let isGameRunning = false;
let grid = createEmptyGrid();

function createEmptyGrid() {
    const grid = new Array(numRows);
    for (let x = 0; x < numRows; x++) {
        grid[x] = new Array(numCols).fill(0);
        for (let y = 0; y < numCols; y++){
            grid[x][y] = {
                totalN : 0,
                redN: 0,
                blueN: 0,
                greenN: 0,

                color: 0,
                isAlive: false,
            }
        }
    }
    return grid;
}

function updateGenerationCount() {
    document.getElementById("generation").textContent = generation;
}

function createCell(row, col) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.width = cellSize + "px";
    cell.style.height = cellSize + "px";
    cell.addEventListener("click", () => toggleCell(row, col));
    return cell;
}

const gameBoard = document.getElementById("game-board");
function initializeGrid() {
    gameBoard.innerHTML = "";
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = createCell(row, col);
            gameBoard.appendChild(cell);
            document.documentElement.style.setProperty("--numCols", numCols);
        }
    }
}

function toggleCell(row, col) {
    if (isGameRunning) {
        toggleGame();
    }

    grid[row][col].isAlive = !grid[row][col].isAlive;
    const cell = document.getElementsByClassName("cell")[row * numCols + col];
    cell.style.backgroundColor = grid[row][col].isAlive ? "#333" : "#fff";
}

function toggleGame() {
    isGameRunning = !isGameRunning;
    const button = document.getElementById("playpause");
    if (isGameRunning) {
        button.textContent = pauseIcon;
        evolve();
    } else {
        button.textContent = playIcon;
    }
}

function clearGrid() {
    grid = createEmptyGrid();
    initializeGrid();
    generation = 0;
    updateGenerationCount();
    if(isGameRunning) toggleGame();
}


function resizeGrid() {
    numRows = parseInt(document.getElementById("row").value);
    numCols = parseInt(document.getElementById("col").value);
    
    clearGrid(); // Clear the current grid
    initializeGrid(); // Initialize the new grid with the specified size
}

document.getElementById("resizeButton").addEventListener("click", resizeGrid);

function evolve() {
    if(!isGameRunning) return;
    const newGrid = createEmptyGrid();
    countAllNeighbors();
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = grid[row][col];
            const neighbors = cell.totalN; 
            if (cell.isAlive) {
                if (neighbors < 2 || neighbors > 3) {
                    newGrid[row][col].isAlive = false;
                } else {
                    newGrid[row][col].isAlive = true;
                }
            } else if (neighbors === 3) {
                newGrid[row][col].isAlive = true;
            }

            // Update the grid cell's appearance without recreating the grid
            const cellElement = gameBoard.children[row * numCols + col];
            cellElement.style.backgroundColor = newGrid[row][col].isAlive ? "#333" : "#fff";
        }
    }
    grid = newGrid;
    countAllNeighbors();
    generation++;
    updateGenerationCount();
    setTimeout(evolve,wait)
}


initializeGrid();
updateGenerationCount();

document.getElementById("playpause").addEventListener("click", toggleGame);
document.getElementById("clear").addEventListener("click", clearGrid);

function countAllNeighbors() {
    //reset totalN before counting
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            grid[row][col].totalN = 0;
        }
    }
    
    
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = grid[row][col]
            if (!cell.isAlive) continue;

            //for alive cells
            
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [ 0, -1],          [ 0, 1],
                [ 1, -1], [ 1, 0], [ 1, 1]
            ];
            
            for (const [dx, dy] of directions) {
                const newRow = row + dx;
                const newCol = col + dy;
        
                if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                    grid[newRow][newCol].totalN +=1;
                }
            }
        }
    }
}