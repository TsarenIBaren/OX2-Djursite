import * as display from './hmiCanvas.js';

let canvas;
const fps = 60;
let fireflies = [];
let offset = 100;

function Play() {
    canvas = document.getElementById('fg-canvas');
    display.Flip(canvas);

    for (let i = 0; i < 10; i++) {
        fireflies.push({
            x: display.screenSize[0] / 2 + offset,
            y: display.screenSize[1] / 2 + offset,
            speed: 10 * Math.random(),
            heading: Math.random() * Math.PI * 2,
            undesicive: Math.round(10 * Math.random())
        });
    };

    console.log(fireflies);

    setInterval(Update, 1000 / fps);
};

function Update() {
    display.Flip(canvas);

    for (let firefly of fireflies) {
        firefly.x += Math.cos(firefly.heading) * firefly.speed;
        firefly.y += Math.sin(firefly.heading) * firefly.speed;



        display.DrawImage(
            'https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/Firefly-300x300.png',
            [firefly.x, firefly.y],
            [0.2, 0.2],
            0,
            'center'
        );
    };
};

export { Play };
