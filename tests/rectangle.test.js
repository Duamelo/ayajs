const { test } = require("tape");
var Rectangle = require("../src/entities/rectangle.js");

test("width and height should be equals 10", (t) =>{
    let rect = new Rectangle();
    t.plan(2);
    t.equal(rect.width, 10);
    t.equal(rect.width, 10);
    t.end();
});

test("width and height should be equals {x,y}", (t) =>{
    let data = {x: 100, y:200};
    let rect = new Rectangle(100,200);
    
    t.plan(2);
    t.equal(rect.width,data.x);
    t.equal(rect.height, data.y);
    t.end();
});

test("coordinates X and Y should be equals {0, 0}", (t) => {
    
    let data = {x:0 , y:0};
    let rect = new Rectangle(120, 30);

    t.plan()
    t.equal(rect.posInit.x, data.x);
    t.equal(rect.posInit.y, data.y);
    t.end()
});

test("coordinates X and Y should be equals {50, 50}", (t) => {
    
    let data = {x:50 , y:50};
    let rect = new Rectangle(120, 30, 50, 50);

    t.plan()
    t.equal(rect.posInit.x, data.x);
    t.equal(rect.posInit.y, data.y);
    t.end()
});

test("coordinates X and Y should be equals {50, 50}", (t) => {
    
    let data = {x:50 , y:50};
    let rect = new Rectangle(120, 30, 50, 50);

    t.plan(1)
    t.equal(rect.forme instanceof SVGRectElement, true);
    t.end()
});



test("have 2 parameters of type point to have necessary information for rectangle creation", (t) => {
    const p1 = new Point(11, 2);
    const p2 = new Point(12, 6);

  
    const rect = new Rectangle(50, 100,30,50);
    t.equal(rect.width instanceof Number, true);
    t.equal(rect.height instanceof Number, true);
    t.end();
  });
  
  

