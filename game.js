const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;

// Load car image
const carImage = new Image();
carImage.src = "traffic.png"; // Replace with your car image path

// Load background image
const backgroundImage = new Image();
backgroundImage.src = "back2.jpg"; // Replace with your background image path

// Background position
let bgY = 0;

// Car properties
const car = {
  x: canvas.width / 2 - (canvas.width * 0.1),
  y: canvas.height - (canvas.height * 0.25),
  width: canvas.width * 0.1,
  height: canvas.height * 0.15,
  speed: 0,
  maxSpeed: 10,
  acceleration: 0.5,
  brakeForce: 0.2,
  dx: 0,
  dy: 0,
};

// Update speedometer
function updateSpeedometer() {
  document.getElementById("speedometer").innerText = `Speed: ${Math.round(car.speed)}`;
}

// Move the car
function moveCar() {
  car.x += car.dx;
  car.y += car.dy;

  // Boundary checks
  if (car.x < 0) car.x = 0;
  if (car.x + car.width > canvas.width) car.x = canvas.width - car.width;
  if (car.y < 0) car.y = 0;
  if (car.y + car.height > canvas.height) car.y = canvas.height - car.height;
}

// Draw the background and the car
function draw() {
  // Scroll the background
  ctx.drawImage(backgroundImage, 0, bgY, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, bgY - canvas.height, canvas.width, canvas.height);

  bgY += 2; // Move the background down
  if (bgY >= canvas.height) {
    bgY = 0; // Reset background position
  }

  // Draw the car
  ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
}

// Update game state
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  moveCar(); // Move the car
  draw(); // Draw the background and car
  updateSpeedometer(); // Update the speedometer
  requestAnimationFrame(update); // Loop the update function
}

// Event listeners for controls
document.getElementById("accelerate").addEventListener("mousedown", () => {
  if (car.speed < car.maxSpeed) car.speed += car.acceleration;
});

document.getElementById("brake").addEventListener("mousedown", () => {
  if (car.speed > 0) car.speed -= car.brakeForce;
  if (car.speed < 0) car.speed = 0; // Prevent negative speed
});

document.getElementById("moveLeft").addEventListener("mousedown", () => {
  car.dx = -car.speed / 2; // Move left
});

document.getElementById("moveRight").addEventListener("mousedown", () => {
  car.dx = car.speed / 2; // Move right
});

document.getElementById("moveUp").addEventListener("mousedown", () => {
  car.dy = -car.speed / 2; // Move up
});

document.getElementById("moveDown").addEventListener("mousedown", () => {
  car.dy = car.speed / 2; // Move down
});

// Stop car movement on button release
document.addEventListener("mouseup", () => {
  car.dx = 0;
  car.dy = 0;
});

// Resize canvas when window size changes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.7;
  car.x = canvas.width / 2 - (canvas.width * 0.1);
  car.y = canvas.height - (canvas.height * 0.25);
  car.width = canvas.width * 0.1;
  car.height = canvas.height * 0.15;
});

// Start the game when images are loaded
backgroundImage.onload = () => {
  carImage.onload = () => {
    update(); // Start the game loop
  };
};
