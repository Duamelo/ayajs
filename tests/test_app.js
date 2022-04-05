var svg = 1;

class uuid {
  constructor() {}

  generate() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}

class Component {
  //constructor( type, events = [],  x = 0, y = 0, r = 0)
  constructor(type, events = [], props) {
    this.uuid = new uuid().generate();
    this.type = type;
    this.props = props;
    // this.x = x;
    // this.y = y;
    // this.r = r;
    //this.events = events;
    //this.form = FactoryForm.createForm(this.uuid, this.type, {x:this.x, y:this.y, r: this.r}, events);
    this.form = FactoryForm.createForm(
      this.uuid,
      this.type,
      this.props,
      events
    );

    this.form.draw(svg);
  }

  clone = () => {};
}

class Circle {
  constructor(uuid, x, y, r, events) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.uuid = uuid;
    this.events = events;
  }

  draw(svgs) {
    var ns = "http://www.w3.org/2000/svg";

    var circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", this.x);
    circle.setAttribute("cy", this.y);
    circle.setAttribute("r", this.r);
    circle.setAttribute("id", this.uuid);

    //  console.log("draw");
    this.events.map((e) => {
      circle.addEventListener(e.ev, e.cb);
    });

    svgs.appendChild(circle);
  }
}

// const test = {
//   M: {
//     x: "test",
//     y: 12,
//   },
//   l1: {
//     x: "test",
//     y: 12,
//   },
//   l2: {
//     x: "test",
//     y: 12,
//   },
// };

class Triangle {
  constructor(uuid, path, events) {
    this.uuid = uuid;
    this.Mx = path.M.x;
    this.My = path.M.y;
    this.l1x = path.l1.x;
    this.l1y = path.l1.y;
    this.l2x = path.l2.x;
    this.l2y = path.l2.y;
    this.events = events;
  }

  draw(svg) {
    const svgns = "http://www.w3.org/2000/svg";
    const triangle = document.createElementNS(svgns, "path");
    //M 150 25 l -50 100 l 50 0 z
    const path = `M ${this.Mx} ${this.My} l ${this.l1x} ${this.l1y} l ${this.l2x} ${this.l2y} z`;
    triangle.setAttributeNS(null, "d", path);
    svg.appendChild(triangle);
  }

  move() {}
}

class _FactoryForm {
  createForm(uuid, type, props, events) {
    if (type == "circle")
      return new Circle(uuid, props.x, props.y, props.r, events);
    if (type == "rectangle")
      return new Rectangle(
        uuid,
        props.width,
        props.height,
        props._X,
        props._Y,
        events
      );
    if (type == "triangle") return new Triangle(uuid, props, events);
  }
}

FactoryForm = new _FactoryForm();
