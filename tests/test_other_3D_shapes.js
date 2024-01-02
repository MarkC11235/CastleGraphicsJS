const p = [[40, 40, 40], [40, 60, 40], [60, 60, 40], [60, 40, 40], [40, 40, 60], [40, 60, 60], [60, 60, 60], [60, 40, 60]];
const faces = [
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 7],
    [0, 7, 4],
    [0, 4, 5],
    [0, 5, 1],
    [6, 2, 1],
    [6, 3, 2],
    [6, 7, 3],
    [6, 4, 7],
    [6, 5, 4],
    [6, 1, 5]
];
const shape = new AbstractShape(p, faces, '#FF0000FF');

const cube = new Cube(50, 50, 50, 50, '#FF0000FF');

const rp = new RectPrism(50, 50, 50, 80, 50, 50, '#FF0000FF');

function draw(){
    fillCanvas("#808080");
    // shape.rotate(.01, .01, .01);
    //shape.rotate(.01, .01, .01);
    //shape.draw();
    // cube.rotate(.01, .01, .01);
    // cube.draw();
    rp.rotate(.01, .01, .01);
    rp.draw();
}

const c = document.getElementById("canvas");
const cg_c = addCGCanvas(c, draw, 100, 100);

render();
//CGDraw(cg_c);