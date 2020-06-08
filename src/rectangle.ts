export class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    intersect(otherRectangle: Rectangle) {
        return (this.x - this.width / 2 <= otherRectangle.x + otherRectangle.width / 2 &&
            this.x + this.width / 2 >= otherRectangle.x - otherRectangle.width / 2 &&
            this.y - this.height / 2 <= otherRectangle.y + otherRectangle.height / 2 &&
            this.y + this.height / 2 >= otherRectangle.y - otherRectangle.height / 2)
    }
}

