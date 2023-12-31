function draw(){
    clearCanvas(0, 0, 100, 100);
    fillRect(0, 0, 100, 100, 'grey');
    
    sprite.draw();
}

const arrow = new Image();
arrow.src = 'sprites/arrow.png';

const sword = new Image();
sword.src = 'sprites/sword.png';

const images = [arrow, sword];

const sprite = new AnimatedSprite(0, 0, 100, 100, images, 100);

const c = document.getElementById('canvas');
const cg_c = addCGCanvas(c, draw, 100, 100);

render(); //Have to add this now if you want the render loop to start