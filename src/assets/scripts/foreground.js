import * as display from './hmiCanvas.js';

let canvas;
const fps = 60;

// Define properties for each firefly
let fireflies = [
    { ang: 0.10, A: 250, B: 125, speed: 0.005 },
    { ang: 0.15, A: 300, B: 150, speed: 0.006 },
    { ang: 0.20, A: 350, B: 175, speed: 0.007 },
    { ang: 0.25, A: 400, B: 200, speed: 0.008 },
    { ang: 0.30, A: 450, B: 225, speed: 0.009 }
];

function Play() {
    canvas = document.getElementById('fg-canvas');
    setInterval(Update, 1000 / fps);
}

function Update() {
    // Clear the canvas before drawing the fireflies
    display.Flip(canvas);

    // Update and draw each firefly
    for (let i = 0; i < fireflies.length; i++) {
        let firefly = fireflies[i];

        // Pulsating effect using cosine function
        let scaleFactor = 0.1 * (Math.cos(firefly.ang) + 2) / 2;

        // Figure-eight motion
        let centerX = display.screenSize[0] / 2;
        let centerY = display.screenSize[1] / 2;
        let x = centerX + firefly.A * Math.sin(firefly.ang);
        let y = centerY + firefly.B * Math.sin(firefly.ang + firefly.ang);

        display.DrawImage(
            'https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/Firefly-300x300.png',
            [x, y],
            [scaleFactor, scaleFactor],
            firefly.ang,
            'center'
        );

        // Update the angle for the next frame based on the firefly's speed
        firefly.ang += firefly.speed;
    }
}

export { Play };