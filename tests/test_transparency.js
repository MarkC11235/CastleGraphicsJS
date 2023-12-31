let cube = new Cube(50, 50, 60, 60, '#FF000080');
let cube2 = new Cube(50, 50, 60, 30, '#00FF00FF');

function draw(){
    fillCanvas('#AAAAAA');

    cube2.rotate(0.01, 0.01, 0.01);
    cube2.draw();

    cube.rotate(0.01, 0.01, 0.01);
    cube.draw();
}

const c = document.getElementById('canvas');
const cg_c = addCGCanvas(c, draw, 100, 100);

render();