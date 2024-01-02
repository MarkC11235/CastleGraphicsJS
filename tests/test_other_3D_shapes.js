// const p = [[40, 40, 40], [40, 60, 40], [60, 60, 40], [60, 40, 40], [40, 40, 60], [40, 60, 60], [60, 60, 60], [60, 40, 60]];
// const faces = [
//     [0, 1, 2],
//     [0, 2, 3],
//     [0, 3, 7],
//     [0, 7, 4],
//     [0, 4, 5],
//     [0, 5, 1],
//     [6, 2, 1],
//     [6, 3, 2],
//     [6, 7, 3],
//     [6, 4, 7],
//     [6, 5, 4],
//     [6, 1, 5]
// ];
// const shape = new AbstractShape(p, faces, '#FF0000FF');

let x = 0;
let xGap = 50;
let y = 10;
let yGap = 70;
let z = 50;

const cube = new Cube(x, y, z, 20, '#FF0000FF');

const rp = new RectPrism(x + xGap, y, z, 30, 10, 10, '#FF0000FF');

const pyrimid = new Pyrimid(x + xGap*2, y + 5, z, 15, 15, '#FF0000FF');

const sphere = new Sphere(x, y + yGap, z, 20, '#FF0000FF', 20);

const cylinder = new Cylinder(x + xGap*2, y + yGap, z, 20, 20, '#FF0000FF', 20);

let angle = 1;
angle = angle * Math.PI / 180;

function draw(){
    fillCanvas("#808080");

    cube.rotate(angle, angle, angle);
    cube.draw();

    rp.rotate(angle, angle, angle);
    rp.draw();

    pyrimid.rotate(angle, angle, angle);
    pyrimid.draw();

    sphere.rotate(angle, angle, angle);
    sphere.draw();
    
    cylinder.rotate(angle, angle, angle);
    cylinder.draw();
}

const c = document.getElementById("canvas");
const cg_c = addCGCanvas(c, draw, 100, 100);

const renderLoop = true;

if(renderLoop)render();
if(!renderLoop)CGDraw(cg_c);