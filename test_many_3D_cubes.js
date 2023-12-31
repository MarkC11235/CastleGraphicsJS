let cubes = [];

for(let i = 0; i < 5; i++) {
    for(let j = 0; j < 5; j++) {
        for(let k = 0; k < 5; k++) {
            let cube = new Cube(i*20 + 8, j*20 + 8, -k*20 + 110, 10, '#FF0000');
            let cubeInfo = {
                cube : cube,
                colorStart : 25*i+5*j+k
            }
            cubes.push(cubeInfo);
        }
    }
}

cubes.sort((a, b) => b.cube.z - a.cube.z);

let rot = 1;
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
    fillCanvas('#AAAAAA');
    
    //rot += 0.01;
    // if(rot > 2 * Math.PI)
    //     rot = 0;

    colorRot += 0.01;
    colorRot = colorRot % (2 * Math.PI);


    for(let i = 0; i < cubes.length; i++) {
        r = Math.abs(Math.sin(colorRot + cubes[i].colorStart) * 255);
        r = Math.round(r);
        b = Math.abs(Math.cos(colorRot + cubes[i].colorStart) * 255);
        b = Math.round(b);
        g = Math.abs(Math.sin(colorRot + cubes[i].colorStart + Math.PI/4) * 255);
        g = Math.round(g);
        cubes[i].cube.color = toColor(r, g, b);

        cubes[i].cube.rotate(rot, rot, rot);
        cubes[i].cube.draw();
    }
}

const c = document.getElementById('canvas');
const cg_c = addCGCanvas(c, draw, 100, 100);

render(); //Have to add this now if you want the render loop to start
