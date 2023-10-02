// Constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to match the window's inner dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cellSize = 7; // Size of each cell in pixels
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let numColumns = Math.floor(canvasWidth / cellSize); // Make these variables mutable
let numRows = Math.floor(canvasHeight / cellSize);    // Make these variables mutable
const verticalSpreadCoefficient = 0.5; // Adjust as needed
const horizontalSpreadCoefficient = 0.2; // Adjust as needed
const temperatureLossRate = 0.01; // Temperature loss rate per frame
let heat = 100;

let grid = [];

// Initialize the grid with random temperatures
function initializeGrid() {
    for (let i = 0; i < numRows; i++) {
        grid[i] = [];
        for (let j = 0; j < numColumns; j++) {
            grid[i][j] = Math.random() * 100; // Random initial temperature (0-100)
        }
    }
}

initializeGrid(); // Call the function to initialize the grid

const colorGradient = [
    "#000000", // Black
    "#190000",
    "#330000",
    "#4C0000",
    "#660000",
    "#7F0000",
    "#990000",
    "#B20000",
    "#CC0000",
    "#E50000", // Red
    "#E50000", // Red
    "#E50000", // Red
    "#E50000", // Red
    "#FF0A00",
    "#FF1F00",
    "#FF3300",
    "#FF4800",
    "#FF5D00",
    "#FF7200",
    "#FF8800",
    "#FF9D00",
    "#FFB200",
    "#FFC600",
    "#FFDB00", // Orange
    "#FFDB00", // Orange
    "#FFDB00", // Orange
    "#FFDB00", // Orange
    "#FFEF00", // Yellow
    "#FFFF10",
    "#FFFF25",
    "#FFFF3A",
    "#FFFF4F",
    "#FFFF66",
    "#FFFF7B",
    "#FFFF90",
    "#FFFFA5",
    "#FFFFBB",
    "#FFFFD0",
    "#FFFFE5", // Light Yellow
    "#FFFFE5", // Light Yellow
    "#FFFFE5", // Light Yellow
    "#FFFFE5", // Light Yellow
    "#FFFFFF", // White
    "#FFFFFF", // White
    "#FFFFFF", // White
    "#FFFFFF", // White
    "#FFFFFF", // White
    "#80FFFF", // Cyan
];




// Function to update the grid and redraw the canvas
function update() {
    for (let i = numRows - 1; i >= 0; i--) { // Change the loop condition to include the top row
        for (let j = 0; j < numColumns; j++) {
            // Calculate the new temperature based on neighbors
            let newTemp = grid[i][j];

            if (i < numRows - 1) {
                // Spread upwards with a higher coefficient
                newTemp += (grid[i + 1][j] - grid[i][j]) * verticalSpreadCoefficient;
            }

            if (i > 0) {
                // Spread downwards with a lower coefficient
                newTemp += (grid[i - 1][j] - grid[i][j]) * verticalSpreadCoefficient/3;
            }

            if (j > 0) {
                newTemp += (grid[i][j - 1] - grid[i][j]) * horizontalSpreadCoefficient;
            }

            if (j < numColumns - 1) {
                newTemp += (grid[i][j + 1] - grid[i][j]) * horizontalSpreadCoefficient;
            }

            // Apply temperature loss over time
            newTemp -= temperatureLossRate * newTemp;

            grid[i][j] = Math.min(100, newTemp); // Ensure temperature does not exceed 100
        }
    }

    // Redraw the canvas based on the updated temperatures and color gradient
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            const temperature = grid[i][j];
            const color = getColor(temperature);
            ctx.fillStyle = color;
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }

    requestAnimationFrame(update);
}


// Function to get a color based on temperature
function getColor(temperature) {
    const gradientIndex = Math.floor((temperature / 200) * (colorGradient.length));
    return colorGradient[gradientIndex];
}

canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const x = Math.floor(mouseX / cellSize);
    const y = Math.floor(mouseY / cellSize); // Use cellSize instead of numRows
    if (grid[y] && grid[y][x] !== undefined) {
        grid[y][x] += 100; // Increase temperature by 100 (adjust as needed)
    }
});

let isMouseDown = false;

canvas.addEventListener("mousedown", function () {
    isMouseDown = true;
});

canvas.addEventListener("mouseup", function () {
    isMouseDown = false;
});

canvas.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
        // Add temperature continuously while the mouse button is held down
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const x = Math.floor(mouseX / cellSize);
        const y = Math.floor(mouseY / cellSize);
        if (grid[y] && grid[y][x] !== undefined) {
            grid[y][x] += heat; // Increase temperature by 100 (adjust as needed)
        }
    }
});

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    numColumns = Math.floor(canvas.width / cellSize); // Change to canvas.width
    numRows = Math.floor(canvas.height / cellSize);    // Change to canvas.height
    initializeGrid(); // Reinitialize the grid after resizing
});



document.addEventListener("DOMContentLoaded", function () {
    const settingsButton = document.getElementById("settingsButton");
    const settingsPopup = document.getElementById("settingsPopup");
    const cellSizeSlider = document.getElementById("cellSizeSlider");
    const cellSizeValue = document.getElementById("cellSizeValue");
    const applyButton = document.getElementById("applyButton");
    const closeButton = document.getElementById("closeButton");
    const heatSlider = document.getElementById("heatSlider");
    const heatValue = document.getElementById("heatValue");

    // Update the heat value when the slider is moved
    heatSlider.addEventListener("input", function () {
        heat = parseInt(heatSlider.value);
        heatValue.textContent = heat;
    });
    
    // Show the settings popup when the Settings button is clicked
    settingsButton.addEventListener("click", function () {
        settingsPopup.style.display = "block";
    });
    
    // Update the cell size value when the slider is moved
    cellSizeSlider.addEventListener("input", function () {
        cellSizeValue.textContent = cellSizeSlider.value;
    });
    
    // Apply the selected cell size when the Apply button is clicked
    applyButton.addEventListener("click", function () {
        const newCellSize = parseInt(cellSizeSlider.value);
        if (newCellSize >= 5 && newCellSize <= 10) {
            cellSize = newCellSize;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            numColumns = Math.floor(canvas.width / cellSize);
            numRows = Math.floor(canvas.height / cellSize);
            initializeGrid(); // Reinitialize the grid after changing cell size
        }
    
        // Apply the selected heat value
        if (heat >= 100 && heat <= 1000) {
            temperatureLossRate = 0.01 * heat / 100; // Adjust temperature loss rate
        }
    
        settingsPopup.style.display = "none"; // Close the settings popup
    });
    
    // Close the settings popup when the Close button is clicked
    closeButton.addEventListener("click", function () {
        settingsPopup.style.display = "none";
    });
});


// Start the simulation
update();