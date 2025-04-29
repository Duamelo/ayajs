import { Component } from "../component";

class Image extends Component {
    constructor(x = 0, y = 0, width = 50, height = 50, path, name, isdrawing = true, save = true, id = undefined, config, c_svg = undefined) {

        super({ uuid: id, isSave: save, config: config });

        if (c_svg != undefined)
            this.c_svg = this.stringToSvg(c_svg);
        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.path = path;
        this.name = name;

        this.type = 'image';
        if (isdrawing)
            this.draw();
    }

    stringToSvg(c_svgString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(c_svgString, 'image/svg+xml');
        var c_svg = doc.documentElement;
        return c_svg;
    }

    draw() {
        this.c_svg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        this.c_svg.setAttributeNS(null, 'id', this.uuid);
        this.c_svg.setAttributeNS(null, 'height', this.height);
        this.c_svg.setAttributeNS(null, 'width', this.width);
        this.c_svg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.path);
        this.c_svg.setAttributeNS(null, 'x', this.x + this.offsetX);
        this.c_svg.setAttributeNS(null, 'y', this.y + this.offsetY);

        this.svg.append(this.c_svg);
    }

    shift(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    redraw() {
        this.c_svg.setAttributeNS(null, 'x', this.x + this.offsetX);
        this.c_svg.setAttributeNS(null, 'y', this.y + this.offsetY);
    }

    removeFromDOM() {
        this.svg.removeChild(this.c_svg);
    }
}
export { Image }