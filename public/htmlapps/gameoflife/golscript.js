let numRows = 20;
let numCols = 20;
const cellSize = 20;
const wait = 100;
let generation = 0;

let selectedColor = 0;

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
    grid[row][col].color = selectedColor; // Initialize the color
    updateCellColor(row, col);
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
    if (!isGameRunning) return;
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
                    // Check if any neighbor count is 2 or 3
                    if (cell.redN === 2 || cell.redN === 3) {
                        newGrid[row][col].color = 1; // Red
                    } else if (cell.greenN === 2 || cell.greenN === 3) {
                        newGrid[row][col].color = 2; // Green
                    } else if (cell.blueN === 2 || cell.blueN === 3) {
                        newGrid[row][col].color = 3; // Blue
                    } else {
                        newGrid[row][col].color = 0; // Default to black
                    }
                }
            } else if (neighbors === 3) {
                newGrid[row][col].isAlive = true;
                // Determine the dominant color based on neighbor counts
                if (cell.redN === 2 || cell.redN === 3) {
                    newGrid[row][col].color = 1; // Red
                } else if (cell.greenN === 2 || cell.greenN === 3) {
                    newGrid[row][col].color = 2; // Green
                } else if (cell.blueN === 2 || cell.blueN === 3) {
                    newGrid[row][col].color = 3; // Blue
                } else {
                    newGrid[row][col].color = 0; // Default to black
                }
            }

            updateCellColor(row, col);
        }
    }
    grid = newGrid;
    countAllNeighbors();
    generation++;
    updateGenerationCount();
    setTimeout(evolve, wait);
}

function updateCellColor(row,col){
    // Update the grid cell's appearance without recreating the grid
    const cellElement = gameBoard.children[row * numCols + col];
    if(!grid[row][col].isAlive){
        cellElement.style.backgroundColor = "#fff";
    }else{
        cellElement.style.backgroundColor = getColorFromCode(grid[row][col].color);
    }
}

initializeGrid();
updateGenerationCount();

document.getElementById("playpause").addEventListener("click", toggleGame);
document.getElementById("clear").addEventListener("click", clearGrid);

function countAllNeighbors() {
    // Reset totalN and color-specific counts before counting
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            grid[row][col].totalN = 0;
            grid[row][col].redN = 0;
            grid[row][col].greenN = 0;
            grid[row][col].blueN = 0;
        }
    }

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = grid[row][col];
            if (!cell.isAlive) continue;

            // Define the directions array
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1],  [1, 0],  [1, 1]
            ];

            for (const [dx, dy] of directions) {
                let newRow = row + dx, newCol = col + dy;

                if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                    const neighbor = grid[newRow][newCol];
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
}

colorDivs = document.getElementsByClassName("color");
for (let i = 0; i < colorDivs.length; i++) {
    const colorDiv = colorDivs[i];
    console.log(colorDiv.style.backgroundColor);
    colorDiv.addEventListener("click", () => selectColor(i));
    
}

function selectColor(colorCode) {
    selectedColor = colorCode;
    document.documentElement.style.setProperty("--cellColor", getColorFromCode(colorCode));
}

// Function to get color from color code
function getColorFromCode(colorCode) {
    switch (colorCode) {
        case 0:
            return "#333";
        case 1:
            return "red";
        case 2:
            return "lime";
        case 3:
            return "lightseagreen";
        default:
            return "#333";
    }
}
