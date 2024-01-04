const canvas_width = 1000;
const canvas_height = 1000;

let center_x = canvas_width/2;
let center_y = canvas_height/2;
let center_z = canvas_width*.8;

let planet_smoothness = 10;
let planets = [];

let sun = new Sphere(center_x, center_y, center_z, 100, "#FFFF00", planet_smoothness);
sun.rotX = Math.PI/2;

let mercury = new Sphere(center_x + 140, center_y, center_z, 10, "#AAAAAA", planet_smoothness);
mercury.rotX = Math.PI/2;
planets.push(mercury);

let venus = new Sphere(center_x + 200, center_y, center_z, 22, "#FFCCCC", planet_smoothness);
venus.rotX = Math.PI/2;
planets.push(venus);

let earth = new Sphere(center_x + 275, center_y, center_z, 25, "#0000FF", planet_smoothness);
earth.rotX = Math.PI/2;
planets.push(earth);

let mars = new Sphere(center_x + 350, center_y, center_z, 20, "#FF6060", planet_smoothness);
mars.rotX = Math.PI/2;
planets.push(mars);

let jupiter = new Sphere(center_x + 500, center_y, center_z, 52, "#F5F5AA", planet_smoothness);
jupiter.rotX = Math.PI/2;
planets.push(jupiter);

let saturn = new Sphere(center_x + 650, center_y, center_z, 45, "#F5F5AA", planet_smoothness);
saturn.rotX = Math.PI/2;
planets.push(saturn);

let uranus = new Sphere(center_x + 780, center_y, center_z, 35, "#55A0FF", planet_smoothness);
uranus.rotX = Math.PI/2;
planets.push(uranus);

let neptune = new Sphere(center_x + 900, center_y, center_z, 32, "#1010AA", planet_smoothness);
neptune.rotX = Math.PI/2;
planets.push(neptune);

let speed = 0.05;
                          //mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
let planet_orbital_speed = [speed*4, speed*2, speed, speed/2, speed/12, speed/30, speed/90, speed/180];

let drawables = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];

let stars = [];
for(let i = 0; i < 1000; i++){
    let star = [Math.random() * canvas_width, Math.random() * canvas_height];
    stars.push(star);
}

function draw(){
    fillCanvas("#000000");
    for(let i = 0; i < stars.length; i++){
        let star = stars[i];
        fillCircle(star[0], star[1], 1, "#FFFFFF");
    }

    for(let i = 0; i < planets.length; i++){
        let planet = planets[i];
        let planet_center = planet.getCenter();

        planet_center = rotatePointAroundAPoint(planet_center, sun.getCenter(), 0, planet_orbital_speed[i], planet_orbital_speed[i]/2);
        planet.moveTo(planet_center[0], planet_center[1], planet_center[2]);
        //planet.rotate(0, .01, 0);
    }

    drawables.sort(function(a, b){
        return b.getCenter()[2] - a.getCenter()[2];
    });

    for(let i = 0; i < drawables.length; i++){
        drawables[i].draw();
    }
}

const canvas_solar_system = document.getElementById("canvas_solar_system");
const cg_canvas_solar_system = addCGCanvas(canvas_solar_system, draw, canvas_width, canvas_height);