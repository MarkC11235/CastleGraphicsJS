let floor = new RectPrism(50, 100, 60, 100, 10, 100, CG_DARK_GREEN); 

let trunk = new RectPrism(50, 90, 80, 10, 50, 10, CG_BROWN);

let x = 50;
let y = 55;
let z = 80;
let w = 40;
let h = 40;
let d = 40;
let main_leaves = new RectPrism(x, y, z, w, h, d, CG_GREEN);
let above = new RectPrism(x, y - h/2, z, 20, 10, 20, CG_GREEN); //top

changeLightSource(0, 1, .6);

let treeRot= 60;
treeRot= treeRot* Math.PI / 180;
treeRot= treeRot% (2 * Math.PI);

let zEye = -50;
function draw(){
    fillCanvas(CG_LIGHT_BLUE);

    treeRot+= 0.01;
    if(treeRot> 2 * Math.PI)
        treeRot= 0;

    floor.rotX = treeRot;
    floor.draw();

    trunk.rotX = treeRot;
    trunk.draw();

    above.rotX = treeRot;
    above.draw();

    main_leaves.rotX = treeRot;
    main_leaves.draw();

    //zEye += 0.1;
    //console.log(zEye);
    //changeEye(50, 50, zEye);
}

const canvas_3D_scene  = document.getElementById('canvas_3D_scene');
const cg_canvas_3D_scene = addCGCanvas(canvas_3D_scene, draw, 100, 100);
