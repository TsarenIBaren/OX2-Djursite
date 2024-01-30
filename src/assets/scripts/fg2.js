import * as display from './hmiCanvas.js';

let canvas;
const fps = 60;
let fireflies = [];

function Play() {
    canvas = document.getElementById('fg-canvas');

    for (let i = 0; i < 10; i++) {
        fireflies.push({
            x: display.screenSize[0] * Math.random(),
            y: display.screenSize[1]
        });
    };

    setInterval(Update, 1000 / fps);
};

function Update() {
    display.Flip(canvas);

    display.DrawImage(
        'https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/Firefly-300x300.png',
        [0, 0],
        [0.2, 0.2],
        0,
        'center'
    );
};

export { Play };
