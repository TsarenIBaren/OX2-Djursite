import * as display from './hmiCanvas.js';

let canvas;
const fps = 60;
let interval;
let ticks = 0;
let snowflakes = [];
let offset = 100;
const prewarm = 10 * fps;

const ticksPerFlake = 4;
const minSize = 0.025;
const sizeMpl = 0.05;
const minSpeed = 1;
const speedMpl = 2;
const minRotationSpeed = Math.PI / 128;
const rotationSpeedMpl = Math.PI / 128;

function Play() {
    canvas = document.getElementById('fg-canvas');
    display.Flip(canvas);

    for (let i = 0; i < prewarm; i++) {
        Update(false);
    };

    interval = setInterval(Update, 1000 / fps);
};

function Stop() {
    clearInterval(interval);
    display.Flip(canvas);
    snowflakes = [];
};

function Update(draw=true) {
    display.Flip(canvas);

    snowflakes = snowflakes.filter(flake => {
        return flake.y < display.screenSize[1] + 128;
    });

    ticks += 1;
    if (ticksPerFlake == ticks) {
        ticks = 0;
        snowflakes.push({
            x: display.screenSize[0] * Math.random() - offset,
            y: offset - 128,
            size: Math.random() * sizeMpl + minSize,
            speed: speedMpl * Math.random() + minSpeed,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * rotationSpeedMpl + minRotationSpeed,
            direction: Math.round(Math.random()) ? -1 : 1
        });
    };

    for (let snowflake of snowflakes) {
        snowflake.y += snowflake.speed;
        snowflake.rotation += snowflake.rotationSpeed * snowflake.direction;

        display.DrawImage(
            'https://www.datanom.ax/~kjell/ox2/wp-content/uploads/2024/02/Snowflake.png',
            [snowflake.x, snowflake.y],
            [snowflake.size, snowflake.size],
            snowflake.rotation,
            'center'
        );
    };
};

export { Play, Stop };
