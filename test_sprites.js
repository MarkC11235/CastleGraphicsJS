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

const sprite = new AnimatedSprite(0, 0, 10, 10, images, 100);

const c = document.getElementById('canvas');
initCG(c, draw, 100, 100, false);