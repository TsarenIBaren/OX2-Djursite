let ctx;
let screenSize = [0, 0];
let images = {};

function StdDraw(position, rotation, scale) {
    ctx.save();
    ctx.translate(position[0], position[1]);
    ctx.rotate(rotation);
    ctx.scale(scale[0],scale[1]);
};

function StdAnchor(size, anchor=null) {
    switch(anchor) {
        case 'nw':
            return [0, 0];
        case 'n':
            return [-size[0] / 2, 0];
        case 'ne':
            return [-size[0], 0];
        case 'e':
            return [-size[0], -size[1] / 2];
        case 'se':
            return [-size[0], -size[1]];
        case 's':
            return [-size[0] / 2, -size[1]];
        case 'sw':
            return [0, -size[1]];
        case 'w':
            return [0, -size[1] / 2];
    }

    return [-size[0] / 2, -size[1] / 2];
}

function Flip(canvas) {
    if (canvas) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;

        screenSize = [canvas.width, canvas.height];

        ctx = canvas.getContext('2d');
    };
};

function DrawImage(imageDir, position, scale=[1,1], rotation=0, anchor=null) {
    if (ctx) {
        if (images[imageDir]?.loaded) {
            let image = images[imageDir];

            StdDraw(position, rotation, scale);

            let offset = StdAnchor(image.size, anchor);

            ctx.drawImage(image.object, offset[0], offset[1], image.object.width, image.object.height);
            ctx.restore();

        } else {
            if (!images[imageDir]) {
                images[imageDir] = {
                    object: new Image(),
                    size: [null, null],
                    loaded: false,
                    beganLoad: Date.now()
                }
                images[imageDir].object.src = imageDir;
                images[imageDir].object.onload = () => {
                    //console.log(`Loaded image: ${imageDir.split('/').pop()} (${Date.now() - images[imageDir].beganLoad}ms)`);
                    images[imageDir].loaded = true;
                    images[imageDir].size = [images[imageDir].object.width, images[imageDir].object.height];
                };
            };
        };
    };
};

export {screenSize, Flip, DrawImage};