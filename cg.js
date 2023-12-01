//Just always sets to be a square
function resizeCanvas() {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
}

// Resize the canvas every time the window size changes
window.addEventListener('resize', resizeCanvas);

//these are what the user wants the coordinates to be
const width = 100;
const height = 100;

let canvas;
let ctx;

function initCG(html_canvas) {
    canvas = html_canvas;
    ctx = canvas.getContext('2d');
    resizeCanvas();
}

//this function will take in the x and y (either coordinates or width and height) and return the standardized version
//this way i can use any width and height and it will be scaled to the canvas
function standardize(x, y) {
    x = (x / width) * canvas.width;
    y = (y / height) * canvas.height;
    return [x, y];
}

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

function drawBorder(border_width, color) {
    fillRect(0, 0, width, border_width, color);
    fillRect(0, 0, border_width, height, color);
    fillRect(width - border_width, 0, border_width, height, color);
    fillRect(0, height - border_width, width, border_width, color);
}


