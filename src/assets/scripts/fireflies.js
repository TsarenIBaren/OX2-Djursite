import * as display from './hmiCanvas.js';

let canvas;
const fps = 60;
let interval;
let fireflies = [];
let offset = 0;
const prewarm = 10 * fps;

//DECENT SETTINGS
const amount = 25;
let minSpeed = 0.5;
let speedMpl = 2;
let minUndesicive = 8;
let undesiciveMpl = 8;
let turniness = Math.PI / 32;
let minRotationSpeed = Math.PI / 128;
let rotationSpeedMpl = Math.PI / 128;

function Play(off) {
    offset = off;
    canvas = document.getElementById('fg-canvas');
    display.Flip(canvas);

    for (let i = 0; i < amount; i++) {
        fireflies.push({
            x: display.screenSize[0] / 2 + offset,
            y: display.screenSize[1] / 2 + offset,
            speed: speedMpl * Math.random() + minSpeed,
            heading: Math.random() * Math.PI * 2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * rotationSpeedMpl + minRotationSpeed,

            neuronActivation: 0,
            undesicive: Math.round(undesiciveMpl * Math.random() + minUndesicive),
            turnSpeed: 0,
        });
    };

    for (let i = 0; i < prewarm; i++) {
        Update(false);
    };

    interval = setInterval(Update, 1000 / fps);
};

function Stop() {
    clearInterval(interval);
    display.Flip(canvas);
    fireflies = [];
};

function Update(draw=true) {
    display.Flip(canvas);

    for (let firefly of fireflies) {
        firefly.x += Math.cos(firefly.heading) * firefly.speed;
        firefly.y += Math.sin(firefly.heading) * firefly.speed;

        if (firefly.x < -offset) {
            firefly.x = -offset;
        };

        if (firefly.x > display.screenSize[0] + offset) {
            firefly.x = display.screenSize[0] + offset;
        };

        if (firefly.y < -offset) {
            firefly.y = -offset;
        };

        if (firefly.y > display.screenSize[1] + offset) {
            firefly.y = display.screenSize[1] + offset;
        };

        firefly.neuronActivation += 1;
        if (firefly.neuronActivation == firefly.undesicive) {
            firefly.neuronActivation = 0;
            firefly.turnSpeed = turniness * Math.random() - (turniness / 2);
        };

        firefly.heading += firefly.turnSpeed;
        firefly.rotation += firefly.rotationSpeed;

        let size = (Math.sin(firefly.rotation) + 2) * 0.05;

        display.DrawImage(
            'https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/01/Firefly-300x300.png',
            [firefly.x, firefly.y],
            [size, size],
            firefly.rotation,
            'center'
        );
    };
};

export { Play, Stop };
