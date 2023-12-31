function draw(){
    clearCanvas(0, 0, 100, 80);
    fillRect(0, 0, 100, 80, 'grey');

    drawLine(0, 0, 100, 80, 'black');
    drawLine(0, 80, 100, 0, 'black');
    drawLine(50, 0, 50, 100, 'black');
    drawLine(0, 40, 100, 40, 'black');
    drawLine(0, 0, 0, 80, 'black');

    drawBorder(1, 'black');
}

const c = document.getElementById('canvas_non_square');
const cg_c = addCGCanvas(c, draw, 100, 80);

render(); //Have to add this now if you want the render loop to start