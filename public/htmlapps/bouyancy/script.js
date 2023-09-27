// Constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;
let BLOCK_SIZE = 50;
let BLOCK_DENSITY = 0.8;
let WATER_DENSITY = 1;
let GRAVITY = 9.81;
const BOUNCINESS = 0.7;
const DAMPING_COEFFICIENT = 0.98;
const WATER_LEVEL = 400; // Height of the water surface (in pixels)

// Create the block
const block = {
    x: SCREEN_WIDTH / 2 - BLOCK_SIZE / 2,
    y: SCREEN_HEIGHT / 2 - BLOCK_SIZE / 2,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
    velocity: { x: 0, y: 0 },
    dragging: false,
};

// Create variables to store previous mouse position
let prevMouseX = 0;
let prevMouseY = 0;

// Initialize delta time
let lastTime = 0;

// Function to update the canvas
function updateCanvas() {
    // Calculate delta time
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    // Clear the canvas
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    if (!block.dragging) {
        // Apply gravity (in m/s^2)
        block.velocity.y += GRAVITY * deltaTime;

        // Apply damping
        block.velocity.x *= DAMPING_COEFFICIENT;
        block.velocity.y *= DAMPING_COEFFICIENT;

        // Update block position
        block.x += block.velocity.x * deltaTime;
        block.y += block.velocity.y * deltaTime;

        // Handle collisions with window edges
        if (block.x < 0) {
            block.x = 0;
            block.velocity.x *= -BOUNCINESS;
        } else if (block.x + block.width > SCREEN_WIDTH) {
            block.x = SCREEN_WIDTH - block.width;
            block.velocity.x *= -BOUNCINESS;
        }
        if (block.y < 0) {
            block.y = 0;
            block.velocity.y *= -BOUNCINESS;
        } else if (block.y + block.height > SCREEN_HEIGHT) {
            block.y = SCREEN_HEIGHT - block.height;
            block.velocity.y *= -BOUNCINESS;
        }

        if (block.y + block.height > WATER_LEVEL) {
            const submergedHeight = block.y + block.height - WATER_LEVEL;
            const submergedVolume = block.width * block.height * submergedHeight;
        
            // Calculate the force due to the weight of the water displaced by the block
            const displacedWaterMass = submergedVolume * WATER_DENSITY;
            const buoyancyForce = GRAVITY * displacedWaterMass;
        
            // Calculate the force due to the weight of the block
            const blockWeight = BLOCK_DENSITY * GRAVITY * block.width * block.height;
        
            // Check if the block's density is lower than the water's density
            if (BLOCK_DENSITY < WATER_DENSITY) {
                // Apply the net force (buoyancy - weight of the block)
                block.velocity.y -= (buoyancyForce - blockWeight) / (BLOCK_DENSITY * block.width * block.height) * deltaTime;
            } else if (BLOCK_DENSITY > WATER_DENSITY) {
                // If the block's density is higher, don't apply buoyancy force
                block.velocity.y += GRAVITY;
            } else {
                // If densities are equal, no net force is applied
                block.velocity.y = 0;
            }
        }
        

        block.velocity.y += GRAVITY;
    }
    
    // Draw the block
    ctx.fillStyle = "#8B4513"; // Brown
    ctx.fillRect(block.x, block.y, block.width, block.height);

    // Draw water
    ctx.fillStyle = "#2424ff50";
    ctx.fillRect(0, WATER_LEVEL, SCREEN_WIDTH, SCREEN_HEIGHT - WATER_LEVEL);

    // Request the next frame
    requestAnimationFrame(updateCanvas);
}

// Event listeners
canvas.addEventListener("mousedown", (event) => {
    if (
        event.clientX >= block.x &&
        event.clientX <= block.x + block.width &&
        event.clientY >= block.y &&
        event.clientY <= block.y + block.height
    ) {
        block.dragging = true;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    }
});

canvas.addEventListener("mouseup", () => {
    if (block.dragging) {
        block.dragging = false;
        // Calculate velocity when releasing the block
        const deltaTime = (performance.now() - lastTime) / 1000;
        block.velocity.x = (event.clientX - prevMouseX) / deltaTime;
        block.velocity.y = (event.clientY - prevMouseY) / deltaTime;

        // Add an extra force to make it feel like a fling
        const flingForceFactor = 0.1;
        block.velocity.x *= flingForceFactor;
        block.velocity.y *= flingForceFactor;
    }
});

canvas.addEventListener("mousemove", (event) => {
    if (block.dragging) {
        block.x += event.clientX - prevMouseX;
        block.y += event.clientY - prevMouseY;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    }
});

document.getElementById("blockSizeSlider").addEventListener("input", (event) => {
    BLOCK_SIZE = parseInt(event.target.value);
    document.getElementById("blockSizeValue").textContent = BLOCK_SIZE;

    // Update the block's size
    block.width = BLOCK_SIZE;
    block.height = BLOCK_SIZE;
});

document.getElementById("blockDensitySlider").addEventListener("input", (event) => {
    BLOCK_DENSITY = parseFloat(event.target.value);
    document.getElementById("blockDensityValue").textContent = BLOCK_DENSITY;
});

document.getElementById("waterDensitySlider").addEventListener("input", (event) => {
    WATER_DENSITY = parseFloat(event.target.value);
    document.getElementById("waterDensityValue").textContent = WATER_DENSITY;
});

document.getElementById("gravitySlider").addEventListener("input", (event) => {
    GRAVITY = parseFloat(event.target.value);
    document.getElementById("gravityValue").textContent = GRAVITY;
});

// Start the animation
requestAnimationFrame(updateCanvas);
