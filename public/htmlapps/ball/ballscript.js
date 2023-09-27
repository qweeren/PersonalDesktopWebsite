const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    color: "blue",
    velocityX: 0,
    velocityY: 0,
    isDragging: false,
    isThrown: false,
    dragCoef: -0.8,
};

let isMouseDown = false;
let lastMouseX, lastMouseY;
let mouseX, mouseY;

canvas.addEventListener("mousedown", (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    if (Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2) <= ball.radius) {
        isMouseDown = true;
        ball.isDragging = true;
        ball.isThrown = false; // Reset the thrown state
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
});

canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - canvas.getBoundingClientRect().left;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;


    if (!ball.isThrown && ball.isDragging) {
        isMouseDown = true;
        ball.isDragging = true;
        ball.isThrown = false; // Reset the thrown state
        mouseX = e.clientX - canvas.getBoundingClientRect().left;
        mouseY = e.clientY - canvas.getBoundingClientRect().top;
    }
});


canvas.addEventListener("mouseup", (e) => {
    
    if (!ball.isThrown && ball.isDragging) {
        // Calculate velocity based on mouse movement when releasing
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;
        ball.velocityX = (mouseX - lastMouseX) / 10; // Adjust the division factor to control the velocity
        ball.velocityY = (mouseY - lastMouseY) / 10; // Adjust the division factor to control the velocity
        ball.isThrown = true;
    }
    isMouseDown = false;
    ball.isDragging = false;

});

function animate() { // Pass the event as a parameter
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!ball.isDragging || ball.isThrown) {
        // Gravity effect
        ball.velocityY += 0.5;

        // Update ball position
        ball.x += ball.velocityX * -ball.dragCoef;
        ball.y += ball.velocityY;

        // Bounce off the canvas edges
        if (ball.x + ball.radius > canvas.width) {
            ball.velocityX *= ball.dragCoef;
            ball.x = canvas.width - ball.radius;
        }
        if (ball.x - ball.radius < 0) {
            ball.velocityX *= ball.dragCoef;
            ball.x = ball.radius;
        }
        if (ball.y + ball.radius > canvas.height) {
            ball.velocityY *= ball.dragCoef;
            ball.y = canvas.height - ball.radius;
        }
        if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.velocityY *= ball.dragCoef;
        }
    }

    if (!ball.isThrown && ball.isDragging) {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

animate();