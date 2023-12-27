let cube = new Cube(50, 50, 60, 60, '#FF0000');
let cube1 = new Cube(10, 10, 20, 20, '#00FF00');
let cube2 = new Cube(90, 90, 20, 20, '#0000FF');

let rot = 0;
rot = rot * Math.PI / 180;
rot = rot % (2 * Math.PI);
function draw() {
    fillRect(0, 0, width, height, '#AAAAAA');
    
    rot += 0.01;
    if(rot > 2 * Math.PI)
        rot = 0;

    cube.rotX = rot;
    cube.rotY = rot;
    cube.rotZ = rot;
    cube.draw();

    cube1.rotX = rot;
    cube1.rotY = rot;
    cube1.rotZ = rot;
    cube1.draw();

    cube2.rotX = rot;
    cube2.rotY = rot;
    cube2.rotZ = rot;
    cube2.draw();
}

const c = document.getElementById('canvas');
initCG(c, draw, 100, 100);

//CGDraw();

render(); //Have to add this now if you want the render loop to start
