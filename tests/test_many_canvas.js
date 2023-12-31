let width = 100;
let height = 100;

const c1 = document.getElementById('canvas');
const cg_c1 = addCGCanvas(c1, draw1, width, height);

const c2 = document.getElementById('canvas2');
const cg_c2 = addCGCanvas(c2, draw2, width, height);

const c3 = document.getElementById('canvas3');
const cg_c3 = addCGCanvas(c3, draw3, width, height);

let cube1 = new Cube(50, 50, 60, 60, '#FF0000');

let rot1 = 0;
function draw1() {
    fillCanvas('#AAAAAA');
    
    rot1 += 0.01;
    if(rot1 > 2 * Math.PI)
        rot1 = 0;

    cube1.rotX = rot1;
    cube1.rotY = rot1;
    cube1.rotZ = rot1;
    cube1.draw();
}

let cube2 = new Cube(50, 50, 60, 60, '#00FF00');

let rot2 = 0;
function draw2() {
    fillCanvas('#AAAAAA');
    
    rot2 += 0.01;
    if(rot2 > 2 * Math.PI)
        rot2 = 0;

    cube2.rotX = rot2;
    cube2.rotY = rot2;
    cube2.rotZ = rot2;
    cube2.draw();
}

let cube3 = new Cube(50, 50, 60, 60, '#0000FF');

let rot3 = 0;
function draw3() {
    fillCanvas('#AAAAAA');
    
    rot3 += 0.01;
    if(rot3 > 2 * Math.PI)
        rot3 = 0;

    cube3.rotX = rot3;
    cube3.rotY = rot3;
    cube3.rotZ = rot3;
    cube3.draw();
}

render(); //Have to add this now if you want the render loop to start