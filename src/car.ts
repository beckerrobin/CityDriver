import { distance } from "./index"
import { Rectangle } from "./rectangle";

export class Car {
    static BASE_COLOR = "#7cc775";
    static HEIGHT: number;
    static WIDTH: number;
    static BASE_SPEED = 3.5;
    static BREAK_SPEED = 0.5;

    body: Rectangle;
    dir: number;
    speed: number;
    color: string;

    constructor(x: number, y: number, dir: number) {
        this.body = new Rectangle(x, y, Car.WIDTH, Car.HEIGHT);
        this.dir = dir;
        this.speed = Car.BASE_SPEED;
        this.color = Car.BASE_COLOR;
    }

    static CarFromSpawnPoint(spawnPoint: any) {
        return new Car(spawnPoint.x, spawnPoint.y, spawnPoint.dir);
    }

    setSpawnPoint(spawnPoint: any) {
        this.body.x = spawnPoint.x;
        this.body.y = spawnPoint.y;
        this.dir = spawnPoint.dir;
    }

    drawCar(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.translate(this.body.x, this.body.y);
        ctx.rotate((this.dir * 90) * Math.PI / 180);

        ctx.fillStyle = this.color;
        ctx.fillRect(-(Car.WIDTH / 2), -(Car.HEIGHT / 2), Car.WIDTH, Car.HEIGHT);

        ctx.restore();
    }

    collisionDetect(otherCar: Car) {
        // Check rotation
        let tempRect;
        let otherTempRect;
        if (this.dir % 2 == 0)
            tempRect = this.body;
        else
            tempRect = new Rectangle(this.body.x, this.body.y, this.body.height, this.body.width);

        if (otherCar.dir % 2 == 0)
            otherTempRect = otherCar.body;
        else
            otherTempRect = new Rectangle(otherCar.body.x, otherCar.body.y, otherCar.body.height, otherCar.body.width);

        // intersection control
        return tempRect.intersect(otherTempRect);
    }

    /**
     * toString
     */
    public toString() {
        return "x: " + this.body.x + ", y: " + this.body.y + ", dir: " + this.dir + ", speed: " + this.speed;
    }
}