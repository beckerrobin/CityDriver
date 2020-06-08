import { distance } from "./index"
import { Rectangle } from "./rectangle";

export class Car {
    static COLOR_BODY = "#9cc4d9";
    static COLOR_HEAD = "#e8e8e8";
    static COLOR_TAIL = "#9e4242";
    static HEIGHT: number;
    static WIDTH: number;
    static BASE_SPEED = 3;
    static BREAK_SPEED = 0.5;

    body: Rectangle;
    dir: number;
    speed: number;
    color: string;

    constructor(x: number, y: number, dir: number) {
        this.body = new Rectangle(x, y, Car.WIDTH, Car.HEIGHT);
        this.dir = dir;
        this.speed = Car.BASE_SPEED;
        this.color = Car.COLOR_BODY;
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
        ctx.rotate(-(this.dir * 90) * Math.PI / 180);

        ctx.fillStyle = this.color;
        ctx.fillRect(-(this.body.width / 2), -(this.body.height / 2), this.body.width, this.body.height);
        
        ctx.fillStyle = Car.COLOR_HEAD
        ctx.fillRect(-(this.body.width / 2) - 1, -(this.body.height / 4) - 2, 3, 4)
        ctx.fillRect(-(this.body.width / 2) - 1, this.body.height / 4 - 2, 3, 4)
        ctx.fillStyle = Car.COLOR_TAIL
        ctx.fillRect((this.body.width / 2) - 3, -(this.body.height / 4) - 2, 3, 4)
        ctx.fillRect((this.body.width / 2) - 3, this.body.height / 4 - 2, 3, 4)

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