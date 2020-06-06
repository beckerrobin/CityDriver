import { Car } from "./car";

// Constant values
const BG_COLOR = "#133263";
const BUILDING_COLOR = "#88a8db";
const BUILDING_SIZE_MIN = 75;
const BUILDING_SIZE_MAX = 110;
const ROAD_SIZE = 30;
Car.WIDTH = Math.floor(ROAD_SIZE / 2 - 4);
Car.LENGTH = ROAD_SIZE;

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
        // Collission detection
        let otherCars = <Array<Car>>cars.filter(filterCar => filterCar !== car);
        let activeCollision = otherCars.find(otherCar => {
            if (car.y >= otherCar.y && car.y <= otherCar.y + Car.WIDTH)
                if (car.x >= otherCar.x && car.x <= otherCar.x + Car.LENGTH)
                    if (otherCar.speed != 0) {
                        car.speed = 0;
                        return true;
                    }
            car.speed = Car.BASE_SPEED;
            return false;
        })
        if (activeCollision == undefined)
            // Move
            switch (car.dir) {
                case 1:
                    car.y += car.speed;
                    break;
                case 2:
                    car.x += car.speed;
                    break;
                case 3:
                    car.y -= car.speed;
                    break;
                default:
                    car.x -= car.speed;
                    break;
            }
    })
    cars = cars.filter(car => car.x > 0 &&
        car.x < canvas.width &&
        car.y > 0 &&
        car.y < canvas.height);
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

function spawnACar() {
    let car = Car.CarFromSpawnPoint(getRandomSpawnPoint());
    cars.push(car);
}
(<HTMLButtonElement>document.querySelector("#spawn-button")).addEventListener("click", spawnACar)


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