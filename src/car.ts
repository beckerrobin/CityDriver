export class Car {
    static BASE_COLOR = "#7cc775";
    static WIDTH: number; // = Math.floor(ROAD_SIZE / 2 - 4);
    static LENGTH: number; // = ROAD_SIZE;
    static BASE_SPEED = 3.5;

    x: number;
    y: number;
    dir: number;
    speed: number;
    

    constructor(x: number, y: number, dir: number) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.speed = Car.BASE_SPEED;
    }
    
    static CarFromSpawnPoint(spawnPoint: any) {
        return new Car(spawnPoint.x, spawnPoint.y, spawnPoint.dir);
    }

    drawCar(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate((this.dir * 90) * Math.PI / 180);

        ctx.fillStyle = Car.BASE_COLOR;
        ctx.fillRect(-(Car.LENGTH / 2), -(Car.WIDTH / 2), Car.LENGTH, Car.WIDTH);

        ctx.restore();
    }
}