import * as display from './hmiCanvas.js';

let canvas;
const fps = 60;
const numFireflies = 6; // Adjust the number of fireflies as needed

let fireflies = [];

function Play() {
    canvas = document.getElementById('fg-canvas');

    // Initialize fireflies at random positions
    for (let i = 0; i < numFireflies; i++) {
        fireflies.push({
            x: Math.random() * display.screenSize[0],
            y: Math.random() * display.screenSize[1],
            ang: Math.random() * Math.PI * 2,
        });
    }

    setInterval(Update, 1000 / fps);
}

function Update() {
    // Clear the canvas before drawing the fireflies
    display.Flip(canvas);

    for (let i = 0; i < numFireflies; i++) {
        // Pulsating effect using cosine function
        let scaleFactor = 0.15 * (Math.cos(fireflies[i].ang) + 2) / 2;

        // Figure-eight motion
        let A = 100;  // Adjust the size of the loop as needed
        let B = 50;   // Adjust the size of the loop as needed
        let centerX = display.screenSize[0] / 2;
        let centerY = display.screenSize[1] / 2;
        fireflies[i].x = centerX + A * Math.sin(fireflies[i].ang);
        fireflies[i].y = centerY + B * Math.sin(fireflies[i].ang + fireflies[i].ang);

        display.DrawImage(
            'https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/Firefly-300x300.png',
            [fireflies[i].x, fireflies[i].y],  // Use the updated position [x, y]
            [scaleFactor, scaleFactor],
            fireflies[i].ang,
            'center'
        );

        // Update the angle for the next frame
        fireflies[i].ang += 0.05;
    }
}

export { Play };