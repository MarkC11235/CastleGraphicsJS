let cube = new Cube(50, 50, 60, 60, '#FF0000');

let rot = 0;
rot = rot * Math.PI / 180;
rot = rot % (2 * Math.PI);
let r = 0;
let rRate = 1;
let g = 0;
let gRate = 3;
let b = 0;
let bRate = 5;

let colorRot = 0;
function draw() {
    fillRect(0, 0, width, height, '#AAAAAA');
    
    rot += 0.01;
    if(rot > 2 * Math.PI)
        rot = 0;

    colorRot += 0.01;
    if(colorRot > 2 * Math.PI)
        colorRot = 0;

    r = Math.abs(Math.sin(colorRot) * 255);
    r = Math.round(r);
    b = Math.abs(Math.cos(colorRot) * 255);
    b = Math.round(b);
    g = Math.abs(Math.sin(colorRot + Math.PI/4) * 255);
    g = Math.round(g);

    //console.log(r, g, b);

    cube.color = toColor(r, g, b);

    cube.rotX = rot;
    cube.rotY = rot;
    cube.rotZ = rot;
    cube.draw();
}

const c = document.getElementById('canvas');
cg_c = addCGCanvas(c, draw, width, height);

render(); //Have to add this now if you want the render loop to start