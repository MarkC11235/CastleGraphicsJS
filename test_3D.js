let cube = new Cube(50, 50, 50, 60, 'red');
let cube1 = new Cube(50, 50, 50, 40, 'blue');
let cube2 = new Cube(50, 50, 50, 20, 'green');

let rot = 0;
rot = rot * Math.PI / 180;
rot = rot % (2 * Math.PI);
function draw() {
    fillRect(0, 0, width, height, '#AAAAAA');
    
    rot += 0.01;
    if(rot > 2 * Math.PI)
        rot = 0;

    cube.rotY = rot;
    cube.draw();
    cube1.rotX = rot;
    cube1.draw();
    cube2.rotZ = rot;
    cube2.draw();
}

const c = document.getElementById('canvas');
initCG(c, draw, 100, 100);

// CGDraw();

render(); //Have to add this now if you want the render loop to start
