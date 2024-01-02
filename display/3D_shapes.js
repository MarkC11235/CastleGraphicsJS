let xStartingPos = 0;
let xStartingPosGap = 50;
let yStartingPos = 10;
let yStartingPosGap = 70;
let zStartingPos = 50;

const cube = new Cube(xStartingPos, yStartingPos, zStartingPos, 20, '#FF0000FF');

const rp = new RectPrism(xStartingPos + xStartingPosGap, yStartingPos, zStartingPos, 30, 10, 10, '#FF0000FF');

const pyrimid = new Pyrimid(xStartingPos + xStartingPosGap*2, yStartingPos + 5, zStartingPos, 15, 15, '#FF0000FF');

const sphere = new Sphere(xStartingPos, yStartingPos + yStartingPosGap, zStartingPos, 20, '#FF0000FF', 20);

const cylinder = new Cylinder(xStartingPos + xStartingPosGap*2, yStartingPos + yStartingPosGap, zStartingPos, 20, 20, '#FF0000FF', 20);

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

const canvas_3D_shapes = document.getElementById("canvas_3D_shapes");
const cg_canvas_3D_shapes = addCGCanvas(canvas_3D_shapes, draw, 100, 100);