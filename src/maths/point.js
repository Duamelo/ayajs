/**
 * 
 * @class Point
 * @param {number} x
 * @param {number} y
 * 
 */

class Point
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    add(point)
    {
        this.x += point.x;
        this.y += point.y;
    }

    addScalar(sc)
    {
        this.x += sc;
        this.y += sc;
    }

    subScalar(sc)
    {
        this.x -= sc;
        this.y -= sc;
    }

    substract(point)
    {
        this.x -= point.x;
        this.y -= point.y;
    }

    putScale(sc)
    {
        this.x *= sc;
        this.y *= sc;
    }

    multiplyBy(point)
    {
        this.x *= point.x;
        this.y *= point.y;
    }

    copy(point)
    {
        this.x = point.x;
        this.y = point.y;
    }

    clone()
    {
        return new Point(this.x, this.y);
    }
}

module.exports = Point;