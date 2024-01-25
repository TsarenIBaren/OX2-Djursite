import * as display from './hmiCanvas.js';

let canvas;
const fps = 60;
let ang = 0;

function Play() {
    canvas = document.getElementById('fg-canvas');
    setInterval(Update, 1000/fps);
};

function Update() {
    ang += 0.01;
    display.Flip(canvas);
    display.DrawImage(
        'https://p7.hiclipart.com/preview/280/901/253/a-firefly-thumbnail.jpg',
        [display.screenSize[0]/2, display.screenSize[1]/2],
        [1,1],
        ang,
        'center');
};

export {Play};