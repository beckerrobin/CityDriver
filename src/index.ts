import Vue from '../vue/vue'
import { Car } from "./car";

// Constant values
const BG_COLOR = "#133263";
const BUILDING_COLOR = "#88a8db";
const BUILDING_SIZE_MIN = 75;
const BUILDING_SIZE_MAX = 110;
const ROAD_SIZE = 30;
Car.HEIGHT = Math.floor(ROAD_SIZE / 2 - 4);
Car.WIDTH = ROAD_SIZE;

const canvas: HTMLCanvasElement = document.querySelector('#screen');
const ctx = canvas.getContext("2d");
canvas.height = document.body.clientHeight - document.querySelector("header").getBoundingClientRect().height;
canvas.width = document.querySelector("main").getBoundingClientRect().width;
document.body.style.backgroundColor = BG_COLOR;

var buildingDimensions = { "heights": Array<number>(), "widths": Array<number>() }
var cars: Array<Car> = [];

generateCity();
spawnACar();

window.requestAnimationFrame(loop);

function loop() {
    tick();
    draw();
    window.requestAnimationFrame(loop);
}

function tick() {
    // Move cars
    cars.forEach(car => {
        // Collision detection
        let otherCars = <Array<Car>>cars.filter(filterCar => filterCar !== car);
        let activeCollision = otherCars.find(otherCar => {
            let collision = car.collisionDetect(otherCar);

            if (collision) {
                car.color = "#a83232"
                if (otherCar.speed != 0)
                    car.speed = 0;
                else return false;
            }
            else {
                car.speed = Car.BASE_SPEED;
                car.color = Car.BASE_COLOR;
            }
            return collision;
        })

        if (activeCollision == undefined) {
            // TODO
            // slow down detection
            let stoppingLength = 0;
            for (let speed = car.speed; speed > 0; speed -= Car.BREAK_SPEED) {
                stoppingLength += speed / Car.BREAK_SPEED;
            }

            // Move
            switch (car.dir) {
                case 1:
                    car.body.y += car.speed;
                    break;
                case 2:
                    car.body.x += car.speed;
                    break;
                case 3:
                    car.body.y -= car.speed;
                    break;
                default:
                    car.body.x -= car.speed;
                    break;
            }
            // If car leaves canvas
            if (car.body.x < 0 ||
                car.body.x > canvas.width ||
                car.body.y < 0 ||
                car.body.y > canvas.height)
                car.setSpawnPoint(getRandomSpawnPoint());
        }

    })


}

function draw() {
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawCity();
    drawCars();
}

function generateCity() {
    // Randomize building size
    for (let y = ROAD_SIZE; y < canvas.height - (BUILDING_SIZE_MIN + ROAD_SIZE);) {
        let newHeight = Math.floor(Math.random() * (BUILDING_SIZE_MAX - BUILDING_SIZE_MIN) + BUILDING_SIZE_MIN);
        buildingDimensions.heights.push(newHeight);
        y += newHeight + ROAD_SIZE;
        if (canvas.height - y < (BUILDING_SIZE_MAX + ROAD_SIZE) * 2) {
            buildingDimensions.heights.push(BUILDING_SIZE_MIN)
            buildingDimensions.heights.push(canvas.height - (y + BUILDING_SIZE_MIN + ROAD_SIZE) - ROAD_SIZE)
            break;
        }
    }

    for (let x = ROAD_SIZE; x < canvas.width - (BUILDING_SIZE_MIN + ROAD_SIZE);) {
        let newWidth = Math.floor(Math.random() * (BUILDING_SIZE_MAX - BUILDING_SIZE_MIN) + BUILDING_SIZE_MIN);
        buildingDimensions.widths.push(newWidth);
        x += newWidth + ROAD_SIZE;
        if (canvas.width - x < (BUILDING_SIZE_MIN + ROAD_SIZE) * 2) {
            buildingDimensions.widths.push(canvas.width - x - ROAD_SIZE)
            break;
        }
    }
}

function drawCity() {
    var y = ROAD_SIZE;
    buildingDimensions.heights.forEach(height => {
        var x = ROAD_SIZE;
        buildingDimensions.widths.forEach(width => {
            drawBuilding(x, y, width, height)
            x += width + ROAD_SIZE;
        })
        y += height + ROAD_SIZE;
    });
}

function drawCars() {
    cars.forEach(car => car.drawCar(ctx));
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.hypot(x1 - x2, y1 - y2);
}

function spawnACar() {
    let tries = 0;
    let car = Car.CarFromSpawnPoint(getRandomSpawnPoint());

    // Avoid on-spawn collision
    let otherCars = cars.filter(otherCar => otherCar !== car);
    while (otherCars.find(otherCar => car.collisionDetect(otherCar)) !== undefined) {
        car.setSpawnPoint(getRandomSpawnPoint());
        if (tries++ > 10) {
            console.log("Too many cars");
            return;
        }

    }

    cars.push(car);
}


function getRandomSpawnPoint() {
    let y = 0;
    let x = 0;
    let dir = 0; // 0: Right, 1: Down, 2: Left, 3: Up
    let spawnHoriz = Math.floor(Math.random() * 2);

    if (spawnHoriz) {
        // Car goes horizontally
        // Random Height
        let randHeight = Math.floor(Math.random() * (buildingDimensions.heights.length + 1));

        let sumHeight = 0
        buildingDimensions.heights.slice(0, randHeight).forEach(h => sumHeight += h);
        y = ROAD_SIZE * randHeight + sumHeight

        // Left or right
        let goesRight = Math.floor(Math.random() * 2);

        y += Math.round(ROAD_SIZE / 4) + Math.round(ROAD_SIZE / 2) * goesRight;
        if (!goesRight)
            x = canvas.width;
        dir = 2 * goesRight;
    } else {
        // Car goes vertically
        // Random Width
        let randWidth = Math.floor(Math.random() * (buildingDimensions.widths.length + 1));

        let sumWidths = 0
        buildingDimensions.widths.slice(0, randWidth).forEach(w => sumWidths += w);
        x = ROAD_SIZE * randWidth + sumWidths

        // Up or down
        let goesUp = Math.floor(Math.random() * 2);
        x += Math.round(ROAD_SIZE / 4) + Math.round(ROAD_SIZE / 2) * goesUp;
        if (goesUp)
            y = canvas.height;
        dir = 1 + 2 * goesUp;
    }

    return { "x": x, "y": y, "dir": dir };
}

function isPointInSquare(point: any, square: any) {
    if (point.x < square.x ||
        point.y < square.y ||
        point.x > square.x + square.width ||
        point.y > square.y + square.height)
        return false;
    return true;
}

function drawBuilding(x: number, y: number, width: number, height: number) {
    ctx.fillStyle = BUILDING_COLOR;
    ctx.fillRect(x, y, width, height);
}

// (<HTMLButtonElement>document.querySelector("#spawn-button")).addEventListener("click", spawnACar);
window.onload = () => {

    (<HTMLInputElement>document.querySelector("#carsNumber-input")).addEventListener("change", ev => {
        let value = parseInt((<HTMLInputElement>ev.target).value);
        console.log(value);

        if (cars.length < value)
            for (let i = value - cars.length; i > 0; i--) {
                spawnACar();
            }
        else if (cars.length > value)
            while (cars.length > value) {
                cars.pop();
            }
    });

};

new Vue({
    el: '#carsNumber-input',
    computed: {
        noOfCars: () => {
            return cars.length;
        }
    },
})