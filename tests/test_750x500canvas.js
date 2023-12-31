function draw(){
    clearCanvas(0, 0, 750, 500);
    fillRect(0, 0, 750, 500, 'grey');


    drawBorder(10, 'black');
}

const c = document.getElementById('canvas_750x500');
const cg_c = addCGCanvas(c, draw, 750, 500);

render(); //Have to add this now if you want the render loop to start