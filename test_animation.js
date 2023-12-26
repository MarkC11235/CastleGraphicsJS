let i = 0;
let j = 0;

function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
let addorsub = add;

//This is what will be rendered on the canvas every frame
//This animation is made for a 100x100 canvas
function draw() {
    clearCanvas(0, 0, 100, 100);
    fillRect(i, j, 10, 10, 'red');
    fillRect(i, 90-j, 10, 10, 'blue');
    fillRect(90-i, j, 10, 10, 'green');
    fillRect(90-i, 90-j, 10, 10, 'yellow');
    
    function op() {
        i = addorsub(i, 1);
        j = addorsub(j, 1);
    }
    op();
    if(i > 90) {
        addorsub = sub;
    }
    if(i < 0) {
        addorsub = add;
    }
}

const c = document.getElementById('canvas');
initCG(c, draw, 100, 100);

render();