let cubeOuter = new Cube(50, 50, 60, 60, '#FF000080');
let cubeInner = new Cube(50, 50, 60, 30, '#00FF00FF');

function draw(){
    fillCanvas('#AAAAAA');

    cubeInner.rotate(0.01, 0.01, 0.01);
    cubeInner.draw();

    cubeOuter.rotate(0.01, 0.01, 0.01);
    cubeOuter.draw();
}

const canvas_transparent_cubes = document.getElementById('canvas_transparent_cubes');
const cg_canvas_transparent_cubes = addCGCanvas(canvas_transparent_cubes, draw, 100, 100);
