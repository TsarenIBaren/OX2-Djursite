import * as display from './hmiCanvas.js';

let canvas;
const fps = 60;

function Play() {
    canvas = document.getElementById('fg-canvas');
    setInterval(Update, 1000 / fps);
}

let ang = 0.15;

function Update() {
    // Clear the canvas before drawing the firefly
    display.Flip(canvas);

    // Pulsating effect using cosine function
    let scaleFactor = 0.05 * (Math.cos(ang) + 2) / 2;

    // Figure-eight motion
    let A = 150;  // Adjust the size of the loop as needed
    let B = 75;   // Adjust the size of the loop as needed
    let centerX = display.screenSize[0] / 2;
    let centerY = display.screenSize[1] / 2;
    let x = centerX + A * Math.sin(ang);
    let y = centerY + B * Math.sin(ang + ang);

    display.DrawImage(
        'https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/Firefly-300x300.png',
        [x, y],
        [scaleFactor, scaleFactor],
        ang,
        'center'
    );

    // Update the angle for the next frame
    ang += 0.05;
}

export { Play };