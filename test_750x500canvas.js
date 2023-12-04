function draw(){
    clearCanvas(0, 0, 100, 80);
    fillRect(0, 0, 75, 50, 'grey');


    drawBorder(1, 'black');
}

const c = document.getElementById('canvas');
initCG(c, draw, 75, 50, false);