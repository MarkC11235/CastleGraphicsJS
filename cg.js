//Predefined colors--------------------------------------------------------------
const CG_RED = '#FF0000';
const CG_GREEN = '#00FF00';
const CG_DARK_GREEN = '#005000';
const CG_BLUE = '#0000FF';
const CG_LIGHT_BLUE = '#00AAFF';
const CG_YELLOW = '#FFFF00';
const CG_CYAN = '#00FFFF';
const CG_MAGENTA = '#FF00FF';
const CG_WHITE = '#FFFFFF';
const CG_BLACK = '#000000';
const CG_GRAY = '#AAAAAA';
const CG_DARK_GRAY = '#555555';
const CG_LIGHT_GRAY = '#CCCCCC';
const CG_BROWN = '#802000';
//--------------------------------------------------------------------------------

//Only works for the first canvas in the list
//Should only need to fullscreen the first canvas
function toggleFullscreen() {
    CG_CANVAS_LIST[0].fullscreen = !CG_CANVAS_LIST[0].fullscreen;
    CG_CANVAS_LIST[0].resizeCanvas();    
}   

//Temporary for testing fullscreen
let fullscreen_key = 'Escape';
window.addEventListener('keydown', function(e) {
    if(e.key == fullscreen_key){
        toggleFullscreen();
    }
});

function resizeCanvases() {
    for(let i = 0; i < CG_CANVAS_LIST.length; i++){
        CG_CANVAS_LIST[i].resizeCanvas();
    }
}

// Resize the canvases every time the window size changes
window.addEventListener('resize', resizeCanvases);

//CG_Canvas class----------------------------------------------------------------
class CG_CANVAS{
    constructor(canvas, drawfunction, w, h, fs = false){
        this.drawfunc = drawfunction;
        this.canvas = canvas;
        this.width = w;
        this.height = h;
        this.init_width = canvas.width;
        this.init_height = canvas.height;
        this.init_margin = document.body.style.margin;
        this.eye = [w/2, h/2, -w/2];
        this.fullscreen = fs;
        this.ctx = canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        let newWidth;
        let newHeight;
        if(this.fullscreen){
            newWidth = window.innerHeight * this.width/this.height;
            //if there is not enough room to fit the canvas, then set the width to be the width of the window
            //and set the height to be the right ratio to the width
            if(newWidth > window.innerWidth){
                newWidth = window.innerWidth;
                newHeight = window.innerWidth * this.height/this.width;
            }
            else{//else set the height to be the height of the window
                newHeight = window.innerHeight;
            }
            //set the margin to 0 so the canvas will fill the whole screen
            document.body.style.margin = 0;
        }
        else {
            newWidth = this.init_width;
            newHeight = this.init_height;
            //reset the margin to the initial margin
            document.body.style.margin = this.init_margin;
        }
        
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        //console.log("Resized canvas to " + canvas.width + "x" + canvas.height);
    }
}

let currentCTX;
let currentCanvas;
let currentWidth;
let currentHeight;
let CG_CANVAS_LIST = [];

function addCGCanvas(canvas, drawfunction, w, h, fs = false) {
    let cg_canvas = new CG_CANVAS(canvas, drawfunction, w, h, fs);
    CG_CANVAS_LIST.push(cg_canvas);
    currentCTX = cg_canvas.ctx;
    currentCanvas = cg_canvas.canvas;
    currentWidth = cg_canvas.width;
    currentHeight = cg_canvas.height;
    return cg_canvas;
}
//--------------------------------------------------------------------------------

//Render functions --------------------------------------------------------------
//this function will check if any part of the canvas is in the viewport
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom > 0 &&
        rect.right > 0
    );
}

//calling this function will cause the canvases to start being redrawn every frame
// ONLY CALL THIS ONCE
async function render() {
    for(let i = 0; i < CG_CANVAS_LIST.length; i++){
        //if the canvas is not in the viewport, then don't draw it
        if(!isElementInViewport(CG_CANVAS_LIST[i].canvas))
            continue;

        //console.log("Drawing canvas " + i);

        currentCTX = CG_CANVAS_LIST[i].ctx;
        currentCanvas = CG_CANVAS_LIST[i].canvas;
        currentWidth = CG_CANVAS_LIST[i].width;
        currentHeight = CG_CANVAS_LIST[i].height;
        //the eye is set to half the width and height of the canvas and z is set to -width/2
        changeEye(CG_CANVAS_LIST[i].eye[0], CG_CANVAS_LIST[i].eye[1], CG_CANVAS_LIST[i].eye[2]); 
        CG_CANVAS_LIST[i].drawfunc();
    } 
    await sleep(1000/60);
    render();
}

//this function will draw the given canvas once
function CGDraw(cg_canvas) {
    //if the canvas is not in the viewport, then don't draw it
    if(!isElementInViewport(cg_canvas.canvas))
        return;

    currentCTX = cg_canvas.ctx;
    currentCanvas = cg_canvas.canvas;
    currentWidth = cg_canvas.width;
    currentHeight = cg_canvas.height;
    cg_canvas.drawfunc();
}
//--------------------------------------------------------------------------------

//Helper functions --------------------------------------------------------------
//this function will take in the x and y (either coordinates or width and height) and return the standardized version
//this way I can use any width and height and it will be scaled to the canvas
function standardize(x, y) {
    x = (x / currentWidth) * currentCanvas.width;
    y = (y / currentHeight) * currentCanvas.height;
    return [x, y];
}

//this returns the x and y that the user wants to use
//this is useful for when you want to get the mouse position
function reverseStandardize(x, y) {
    x = (x / currentCanvas.width) * currentWidth;
    y = (y / currentCanvas.height) * currentHeight;
    return [x, y];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//always returns a string of length 2
function toHex2(num) {
    let str = num.toString(16);
    if(str.length < 2)
        str = '0' + str;
    if(str.length > 2)
        str = str.substring(str.length - 2);
    return str;
}

//r, g, b, a are numbers from 0 to 255, will be set to 255 if they are greater than 255
//returns a string of the form '#RRGGBBAA'
function toColor(r, g, b, a = 255) {
    if(r > 255)
        r = 255;
    if(g > 255)
        g = 255;
    if(b > 255)
        b = 255;
    if(a > 255)
        a = 255;
    return '#' + toHex2(r) + toHex2(g) + toHex2(b) + toHex2(a);
}
//--------------------------------------------------------------------------------

//Canvas functions --------------------------------------------------------------
function drawBorder(border_width, color) {
    fillRect(0, 0, currentWidth, border_width, color);
    fillRect(0, 0, border_width, currentHeight, color);
    fillRect(currentWidth - border_width, 0, border_width, currentHeight, color);
    fillRect(0, currentHeight - border_width, currentWidth, border_width, color);
}
function clearCanvas() {
    let [w,h] = standardize(currentWidth, currentHeight);
    currentCTX.clearRect(0, 0, w, h);
}
function fillCanvas(color) {
    let [w,h] = standardize(currentWidth, currentHeight);
    fillRect(0, 0, w, h, color);
}
//--------------------------------------------------------------------------------

//Shapes ------------------------------------------------------------------------
function fillRect(x, y, w, h, color) {
    [x,y] = standardize(x, y);
    [w,h] = standardize(w, h);
    currentCTX.fillStyle = color;
    currentCTX.fillRect(x, y, w, h);
}

function strokeRect(x, y, w, h, color) {
    [x,y] = standardize(x, y);
    [w,h] = standardize(w, h);
    currentCTX.strokeStyle = color;
    currentCTX.strokeRect(x, y, w, h);
}

function fillCircle(x, y, r, color) {
    [x,y] = standardize(x, y);
    [r, dummy] = standardize(r, 0); //this is to make the radius scale with the canvas
    currentCTX.fillStyle = color;
    currentCTX.beginPath();
    currentCTX.arc(x, y, r, 0, 2 * Math.PI);
    currentCTX.fill();
}

function strokeCircle(x, y, r, color) {
    [x,y] = standardize(x, y);
    [r, dummy] = standardize(r, 0); //this is to make the radius scale with the canvas
    currentCTX.strokeStyle = color;
    currentCTX.beginPath();
    currentCTX.arc(x, y, r, 0, 2 * Math.PI);
    currentCTX.stroke();
}

function fillTriangle(x1, y1, x2, y2, x3, y3, color) {
    [x1,y1] = standardize(x1, y1);
    [x2,y2] = standardize(x2, y2);
    [x3,y3] = standardize(x3, y3);
    currentCTX.fillStyle = color;
    currentCTX.beginPath();
    currentCTX.moveTo(x1, y1);
    currentCTX.lineTo(x2, y2);
    currentCTX.lineTo(x3, y3);
    currentCTX.fill();
}

function strokeTriangle(x1, y1, x2, y2, x3, y3, color) {
    [x1,y1] = standardize(x1, y1);
    [x2,y2] = standardize(x2, y2);
    [x3,y3] = standardize(x3, y3);
    currentCTX.strokeStyle = color;
    currentCTX.beginPath();
    currentCTX.moveTo(x1, y1);
    currentCTX.lineTo(x2, y2);
    currentCTX.lineTo(x3, y3);
    currentCTX.stroke();
}
//--------------------------------------------------------------------------------

//Lines -------------------------------------------------------------------------
function drawLine(x1, y1, x2, y2, color) {
    [x1,y1] = standardize(x1, y1);
    [x2,y2] = standardize(x2, y2);
    currentCTX.strokeStyle = color;
    currentCTX.beginPath();
    currentCTX.moveTo(x1, y1);
    currentCTX.lineTo(x2, y2);
    currentCTX.stroke();
}
//--------------------------------------------------------------------------------

//Text --------------------------------------------------------------------------
let font = 'Arial';
let font_size = 12;
let font_color = '#000000';

function setFont(f, s, c) {
    font = f;
    font_size = s;
    font_color = c;
}

function drawText(x, y, text, color = font_color, s = font_size, f = font) {
    [x,y] = standardize(x, y);
    let [dummy, normalized_font_size] = standardize(0, s); //this is to make the font size scale with the canvas
    currentCTX.font = normalized_font_size + 'px ' + f;
    currentCTX.fillStyle = color;
    currentCTX.fillText(text, x, y + normalized_font_size); //the y coordinate is the bottom of the text, so I add the font size to it to make it the top
}
//--------------------------------------------------------------------------------

//Sprites -----------------------------------------------------------------------
//create an animated sprite
//to use it, create an array of images, then pass it in
//the speed is how many frames it will wait before changing the image, so a speed of 10 will change the image every 10 frames
//a higher speed will make it slower
//the images should all be the same size
//call the draw() function inside of your draw function
class AnimatedSprite {
    constructor(x, y, w, h, images, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images; 
        this.speed = speed;
        this.speed_counter = 0;
        this.frame = 0;
    }
    draw(){
        if(this.speed_counter == this.speed){
            this.frame++;
            this.speed_counter = 0;
        }
        if(this.frame == this.images.length){
            this.frame = 0;
        }

        drawSprite(this.x, this.y, this.w, this.h, this.images[this.frame]);
        
        this.speed_counter++;
    }
}

function drawSprite(x, y, w, h, image) {
    [x,y] = standardize(x, y);
    [w,h] = standardize(w, h);
    currentCTX.imageSmoothingEnabled = false; //this is to scale the image without blurring it
    currentCTX.drawImage(image, x, y, w, h);
}

//takes in the angle in degrees, then converts it to radians for the ctx.rotate() function
function drawSpriteRotated(x, y, w, h, image, angle) {
    [x,y] = standardize(x, y);
    [w,h] = standardize(w, h);
    currentCTX.save();
    currentCTX.translate(x + w/2, y + h/2);
    angle = angle * Math.PI / 180;
    currentCTX.rotate(angle);
    currentCTX.drawImage(image, -w/2, -h/2, w, h);
    currentCTX.restore();
}

function drawSpriteFlipX(x, y, w, h, image) {
    [x,y] = standardize(x, y);
    [w,h] = standardize(w, h);
    currentCTX.save();
    currentCTX.translate(x + w/2, y + h/2);
    currentCTX.scale(-1, 1);
    currentCTX.drawImage(image, -w/2, -h/2, w, h);
    currentCTX.restore();
}
//--------------------------------------------------------------------------------

//3D -----------------------------------------------------------------------------

//3D helper functions ------------------------------------------------------------
//the position of the eye(eye[0] and eye[1] get set to half the width and height of the canvas in initCG())
//eye[2] is the z coordinate of the eye, and gets set to -width/2 in initCG()
const eye = [50, 50, -50]; 
function changeEye(x, y, z) {
    eye[0] = x;
    eye[1] = y;
    eye[2] = z;
}
const screenZ = 0;
function project(x, y, z) {
    // if(z === screenZ)
    //     return [x, y];
    
    let sx = (x - eye[0]) * (screenZ - z) / (z - eye[2]) + x;
    let sy = (y - eye[1]) * (screenZ - z) / (z - eye[2]) + y;

    return [sx, sy];
}

function rotateAroundAPointZ(point, center, angle) {
    const [cx, cy, cz] = center;
    const [x, y, z] = [point[0] - cx, point[1] - cy, point[2] - cz];
    const [cos, sin] = [Math.cos(angle), Math.sin(angle)];
    
    const [rx, ry, rz] = [x * cos - y * sin,
                          x * sin + y * cos,
                          z];

    return [rx + cx, ry + cy, rz + cz];
}

function rotateAroundAPointY(point, center, angle) {
    const [cx, cy, cz] = center;
    const [x, y, z] = [point[0] - cx, point[1] - cy, point[2] - cz];
    const [cos, sin] = [Math.cos(angle), Math.sin(angle)];
    
    const [rx, ry, rz] = [x,
                          y * cos - z * sin,
                          y * sin + z * cos];
                          
    return [rx + cx, ry + cy, rz + cz];
}

function rotateAroundAPointX(point, center, angle) {
    const [cx, cy, cz] = center;
    const [x, y, z] = [point[0] - cx, point[1] - cy, point[2] - cz];
    const [cos, sin] = [Math.cos(angle), Math.sin(angle)];
    
    const [rx, ry, rz] = [x * cos + z * sin,
                          y,
                          -x * sin + z * cos];
                          
    return [rx + cx, ry + cy, rz + cz];
}

function getNormal(p1, p2, p3) {
    let [x1, y1, z1] = p1;
    let [x2, y2, z2] = p2;
    let [x3, y3, z3] = p3;

    let [ux, uy, uz] = [x2 - x1, y2 - y1, z2 - z1];
    let [vx, vy, vz] = [x3 - x1, y3 - y1, z3 - z1];

    let [nx, ny, nz] = [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];

    let length = Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx /= length;
    ny /= length;
    nz /= length;

    return [nx, ny, nz];
}

function getShading(normal) {
    let [nx, ny, nz] = normal;
    let [lx, ly, lz] = LIGHT_SOURCE;

    let dot = nx * lx + ny * ly + nz * lz;
    dot = Math.abs(dot);
    dot = Math.min(dot, 1);
    return dot;
}

function dotProduct(v1, v2) {
    let [x1, y1, z1] = v1;
    let [x2, y2, z2] = v2;
    return x1 * x2 + y1 * y2 + z1 * z2;
}
    
function averageZ(face, points) {
    let sum = 0;
    for(let i = 0; i < face.length; i++){
        sum += points[face[i]][2];
    }
    return sum / face.length;
}

function changeLightSource(x, y, z) {
    LIGHT_SOURCE[0] = x;
    LIGHT_SOURCE[1] = y;
    LIGHT_SOURCE[2] = z;
}
//--------------------------------------------------------------------------------
//if the cube is paritially/fully behind the screenZ, then it won't be rendered correctly
//the EDGES and FACES get out of order because of the negative Z values
const EDGES = [[0, 1], [1, 2], [2, 3], [3, 0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7]];
const FACES = [[0,1,2,3], [4,5,6,7], [0,4,5,1], [2,3,7,6], [1,2,6,5], [0,3,7,4]];
const LIGHT_SOURCE = [0, 0, 1];//default to light coming from the screen
const TEST_MODE = false;
class Cube{
    constructor(x, y, z, s, color = '#FF0000', rotX = 0, rotY = 0, rotZ = 0){//x, y, z is the center of the cube
        this.x = x;
        this.y = y;
        this.z = z;
        this.s = s;
        this.color = color;
        this.rotX = rotX;
        this.rotY = rotY;
        this.rotZ = rotZ;

        this.points = [
            [this.x - this.s/2, this.y - this.s/2, this.z - this.s/2],
            [this.x + this.s/2, this.y - this.s/2, this.z - this.s/2],
            [this.x + this.s/2, this.y + this.s/2, this.z - this.s/2],
            [this.x - this.s/2, this.y + this.s/2, this.z - this.s/2],
            [this.x - this.s/2, this.y - this.s/2, this.z + this.s/2],
            [this.x + this.s/2, this.y - this.s/2, this.z + this.s/2],
            [this.x + this.s/2, this.y + this.s/2, this.z + this.s/2],
            [this.x - this.s/2, this.y + this.s/2, this.z + this.s/2]
        ]
    }

    rotate(rotX, rotY, rotZ){
        this.rotX += rotX;
        this.rotY += rotY;
        this.rotZ += rotZ;
    }

    draw(){
        drawCubeRotated(this.points, this.rotX, this.rotY, this.rotZ, this.color);
        //drawCube(this.points, this.color);
    }
}

class Block{
    constructor(x, y, z, w, h, d, color = '#FF0000', rotX = 0, rotY = 0, rotZ = 0){//x, y, z is the center of the block
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.h = h;
        this.d = d;
        this.color = color;
        this.rotX = rotX;
        this.rotY = rotY;
        this.rotZ = rotZ;

        this.points = [
            [this.x - this.w/2, this.y - this.h/2, this.z - this.d/2],
            [this.x + this.w/2, this.y - this.h/2, this.z - this.d/2],
            [this.x + this.w/2, this.y + this.h/2, this.z - this.d/2],
            [this.x - this.w/2, this.y + this.h/2, this.z - this.d/2],
            [this.x - this.w/2, this.y - this.h/2, this.z + this.d/2],
            [this.x + this.w/2, this.y - this.h/2, this.z + this.d/2],
            [this.x + this.w/2, this.y + this.h/2, this.z + this.d/2],
            [this.x - this.w/2, this.y + this.h/2, this.z + this.d/2]
        ]
    }

    draw(){
        drawCubeRotated(this.points, this.rotX, this.rotY, this.rotZ, this.color);
        //drawCube(this.points, this.color);
    }
}

function drawEdges(projected){
    //Draw lines
    for(let i = 0; i < EDGES.length; i++){
        const e = EDGES[i];
        const p1 = projected[e[0]];
        const p2 = projected[e[1]];
        drawLine(p1[0], p1[1], p2[0], p2[1], 'black');
    }
}

function drawFaces(points, projected, color = '#FF0000FF'){
    let center = [
        (points[0][0] + points[6][0]) / 2,
        (points[0][1] + points[6][1]) / 2,
        (points[0][2] + points[6][2]) / 2
    ];

    //sort the faces by average z value
    //this is so that the faces that are closer to the camera will be drawn on top of the faces that are farther away
    //just in case the face is technically facing you but is behind another face
    let faces = FACES.map(face => ({face, avgZ: averageZ(face, points)}));

    faces.sort((a, b) => b.avgZ - a.avgZ);
    //console.log(faces);

    //Draw faces
    for(let i = 0; i < faces.length; i++){
        //console.log("Drawing face " + i);
        //console.log(FACES[i]);
        const f = faces[i].face;
        const p1 = projected[f[0]];
        const p2 = projected[f[1]];
        const p3 = projected[f[2]];
        const p4 = projected[f[3]];


        //console.log(color);
        let normal = getNormal(points[f[0]], points[f[1]], points[f[2]]);
        //console.log(normal);

        let faceToCenter = [center[0] - points[f[0]][0], center[1] - points[f[0]][1], center[2] - points[f[0]][2]];
        //console.log(faceToCenter);
        //console.log(dotProduct(normal, faceToCenter));
        if(dotProduct(normal, faceToCenter) > 0) //if the normal is pointing towards from the center, then flip it
            normal = [-normal[0], -normal[1], -normal[2]];

        //console.log(normal);

        //backface culling
        let camToFace = [points[f[0]][0] - eye[0], points[f[0]][1] - eye[1], points[f[0]][2] - eye[2]];
        if(dotProduct(normal, camToFace) > 0){
            //console.log("Backface culling: " + i);
            continue;
        }

        let shading = getShading(normal);
        //console.log(normal, shading);
        let r = parseInt(color.substring(1, 3), 16);
        let g = parseInt(color.substring(3, 5), 16);
        let b = parseInt(color.substring(5, 7), 16);
      
        r = Math.round(r * shading);
        r = r.toString(16);
        r = r.padStart(2, '0');

        g = Math.round(g * shading);
        g = g.toString(16);
        g = g.padStart(2, '0');

        b = Math.round(b * shading);
        b = b.toString(16);
        b = b.padStart(2, '0');
        
        let newColor = '#' + r + g + b;

        //console.log(color, color.length, color.substring(7, 9));
        if(color.length == 9 && color.substring(7, 9) != 'ff' && color.substring(7, 9) != 'FF'){
            //console.log("Color has alpha", color);
            let a = parseInt(color.substring(7, 9), 16);
            a = Math.round(a * shading);
            a = a.toString(16);
            a = a.padStart(2, '0');
            newColor += a;
        }

        //console.log(newColor);
        
        fillTriangle(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], newColor);
        fillTriangle(p1[0], p1[1], p3[0], p3[1], p4[0], p4[1], newColor);
        //this to fix the lines between the faces
        //Only kind of works(would need a thicker line to work well)
        //drawLine(p1[0], p1[1], p3[0], p3[1], newColor); 
        //Right now only draw if the cube is opaque
        if(color.length == 9 && color.substring(7, 9) == 'ff'){
            //console.log("Drawing diagonal line");
            drawLine(p1[0], p1[1], p3[0], p3[1], newColor);
        }
    }
}

//if edges is null, then it will just draw the points
function drawCube(points, color = '#FF0000FF'){
    let projected = [];
    for(let i = 0; i < points.length; i++){
        const p = points[i];
        const x = p[0];
        const y = p[1];
        const z = p[2];

        // if(z < screenZ){
        //     console.log("Point is behind screenZ");
        //     return;
        // }

        [sx, sy] = project(x, y, z);
        projected.push([sx, sy]);
        
    }
    if(TEST_MODE){
        for(let i = 0; i < projected.length; i++){
            fillCircle(projected[i][0], projected[i][1], .5, 'red');
            drawText(projected[i][0], projected[i][1], i, 'black', 2.5);
        }
    }

    //console.log(projected); 

    if(TEST_MODE)
        drawEdges(projected);
    else
        drawFaces(points, projected, color);
}

function drawCubeRotated(points, rotX, rotY, rotZ, color = '#FF0000FF'){
    let rotatedPoints = [];

    let center = [
        (points[0][0] + points[6][0]) / 2,
        (points[0][1] + points[6][1]) / 2,
        (points[0][2] + points[6][2]) / 2
    ];

    for(let i = 0; i < points.length; i++){
        const p = points[i];
        const x = p[0];
        const y = p[1];
        const z = p[2];

        let  [rx, ry, rz] = rotateAroundAPointX(p, center, rotX);
        [rx, ry, rz] = rotateAroundAPointY([rx, ry, rz], center, rotY);
        [rx, ry, rz] = rotateAroundAPointZ([rx, ry, rz], center, rotZ);

        rotatedPoints.push([rx, ry, rz]);
    }

    drawCube(rotatedPoints, color);
}
//--------------------------------------------------------------------------------