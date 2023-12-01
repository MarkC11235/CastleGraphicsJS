const c = document.getElementById('canvas');
initCG(c, draw, 100, 100);

function draw() {
    fillRect(0, 0, 100, 100, 'black');
    fillRect(25, 25, 50, 50, 'red');
    fillCircle(50, 50, 10, 'blue');
}

//drawLine(50, 50, 90, 90, 'red');

// drawBorder(1, 'black');

// fillCircle(50, 50, 10, 'blue');
// strokeCircle(50, 50, 15, 'black');

// fillTriangle(50, 60, 40, 50, 60, 50, 'green');
// // flip this triangle
// fillTriangle(50, 40, 40, 50, 60, 50, 'yellow');

// strokeTriangle(0, 0, 100, 100, 0, 100, 'purple');

//Checkboard
// for(let i = 0; i < 4; i++) {
//     for(let j = 0; j < 4; j++) {
//         if((i + j) % 2 == 0) {
//             fillRect(ctx, i * 25, j * 25, 25, 25, 'blue');
//         }
//         else {
//             fillRect(ctx, i * 25, j * 25, 25, 25, 'red');
//         }
//     }
// }