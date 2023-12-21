//these are what the user wants the coordinates to be
let width;
let height;

//stores the width and height of the canvas at initialization
let init_width;
let init_height;

//store the old margin of the body so it can be reset when fullscreen is toggled off
let init_margin;

//if fullscreen is true, it will choose the largest size that will fit on the screen
//that is the same ratio as the width and height
function resizeCanvas() {
    let newWidth;
    let newHeight;
    if(fullscreen){
        newWidth = window.innerHeight * width/height;
        //if there is not enough room to fit the canvas, then set the width to be the width of the window
        //and set the height to be the right ratio to the width
        if(newWidth > window.innerWidth){
            newWidth = window.innerWidth;
            newHeight = window.innerWidth * height/width;
        }
        else{//else set the height to be the height of the window
            newHeight = window.innerHeight;
        }
        //set the margin to 0 so the canvas will fill the whole screen
        document.body.style.margin = 0;
    }
    else {
        newWidth = init_width;
        newHeight = init_height;
        //reset the margin to the initial margin
        document.body.style.margin = init_margin;
    }
    
    canvas.width = newWidth;
    canvas.height = newHeight;
    //console.log("Resized canvas to " + canvas.width + "x" + canvas.height);
}

let fullscreen = false;
function toggleFullscreen() {
    fullscreen = !fullscreen;
    resizeCanvas();
}   

//Temporary for testing fullscreen
let fullscreen_key = 'Escape';
window.addEventListener('keydown', function(e) {
    if(e.key == fullscreen_key){
        toggleFullscreen();
    }
});

// Resize the canvas every time the window size changes
window.addEventListener('resize', resizeCanvas);

let canvas;
let ctx;
let drawfunc;

//this should only be called once
//the size of the canvas that you send in should be the size that you want the canvas to be
//the width and height are the coordinates that you want to use
//the coordinates should be the same ratio as the canvas
function initCG(html_canvas, drawfunction, w, h, fs = false) {
    drawfunc = drawfunction;
    canvas = html_canvas;
    //store the users perference for coordinates to be used in the standardize function
    width = w;
    height = h;

    //store the initial width and height of the canvas
    init_width = canvas.width;
    init_height = canvas.height;

    //store the initial margin of the body so it can be reset when fullscreen is toggled off
    init_margin = document.body.style.margin;

    fullscreen = fs;
    ctx = canvas.getContext('2d');

    resizeCanvas();
    //render();
}

//Render functions --------------------------------------------------------------
//takes in a function that will draw the canvas
//calling this function will cause the canvas to start being redrawn every frame
async function render() {
    drawfunc();
    await sleep(1000/60);
    render();
}

//this function will draw the canvas once
//this is useful for when you want to draw the canvas only when something changes
function CGDraw() {
    drawfunc();
}
//--------------------------------------------------------------------------------

//Helper functions --------------------------------------------------------------
//this function will take in the x and y (either coordinates or width and height) and return the standardized version
//this way I can use any width and height and it will be scaled to the canvas
function standardize(x, y) {
    x = (x / width) * canvas.width;
    y = (y / height) * canvas.height;
    return [x, y];
}

//this returns the x and y that the user wants to use
//this is useful for when you want to get the mouse position
function reverseStandardize(x, y) {
    x = (x / canvas.width) * width;
    y = (y / canvas.height) * height;
    return [x, y];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//--------------------------------------------------------------------------------

//Canvas functions --------------------------------------------------------------
function drawBorder(border_width, color) {
    fillRect(0, 0, width, border_width, color);
    fillRect(0, 0, border_width, height, color);
    fillRect(width - border_width, 0, border_width, height, color);
    fillRect(0, height - border_width, width, border_width, color);
}
function clearCanvas() {
    let [w,h] = standardize(width, height);
    ctx.clearRect(0, 0, w, h);
}
//--------------------------------------------------------------------------------

//Shapes ------------------------------------------------------------------------
function fillRect(x, y, w, h, color) {
    [x,y] = standardize(x, y);
    [w,h] = standardize(w, h);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function strokeRect(x, y, w, h, color) {
    [x,y] = standardize(x, y);
    [w,h] = standardize(w, h);
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
}

function fillCircle(x, y, r, color) {
    [x,y] = standardize(x, y);
    r = (r / width) * canvas.width;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

function strokeCircle(x, y, r, color) {
    [x,y] = standardize(x, y);
    r = (r / width) * canvas.width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function fillTriangle(x1, y1, x2, y2, x3, y3, color) {
    [x1,y1] = standardize(x1, y1);
    [x2,y2] = standardize(x2, y2);
    [x3,y3] = standardize(x3, y3);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
}

function strokeTriangle(x1, y1, x2, y2, x3, y3, color) {
    [x1,y1] = standardize(x1, y1);
    [x2,y2] = standardize(x2, y2);
    [x3,y3] = standardize(x3, y3);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();
}
//--------------------------------------------------------------------------------

//Lines -------------------------------------------------------------------------
function drawLine(x1, y1, x2, y2, color) {
    [x1,y1] = standardize(x1, y1);
    [x2,y2] = standardize(x2, y2);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
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
    ctx.font = normalized_font_size + 'px ' + f;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y + normalized_font_size); //the y coordinate is the bottom of the text, so I add the font size to it to make it the top
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
    ctx.imageSmoothingEnabled = false; //this is to scale the image without blurring it
    ctx.drawImage(image, x, y, w, h);
}

//takes in the angle in degrees, then converts it to radians for the ctx.rotate() function
function drawSpriteRotated(x, y, w, h, image, angle) {
    [x,y] = standardize(x, y);
    [w,h] = standardize(w, h);
    ctx.save();
    ctx.translate(x + w/2, y + h/2);
    angle = angle * Math.PI / 180;
    ctx.rotate(angle);
    ctx.drawImage(image, -w/2, -h/2, w, h);
    ctx.restore();
}

function drawSpriteFlipX(x, y, w, h, image) {
    [x,y] = standardize(x, y);
    [w,h] = standardize(w, h);
    ctx.save();
    ctx.translate(x + w/2, y + h/2);
    ctx.scale(-1, 1);
    ctx.drawImage(image, -w/2, -h/2, w, h);
    ctx.restore();
}
//--------------------------------------------------------------------------------