var test = require("tape");
var FactoryForm = require("../src/factoryForm");
const uuid = require("../src/entities/uuid");

 
/**
 * HUB Circle Class
 */

class _Circle{

    constructor(uuid, x, y, r, events){
        this.uuid = uuid;
        this.x = x;
        this.y = y;
        this.r = r;
        this.events = events;
        
    }

    draw(){
        form_draw++;
    }
}


class _Triangle
{
    constructor(uuid, x1 = 0, y1 = 0, x2 = 5 , y2 = 5 , x3 = 10 , y3 = 10, events = []){

        this.uuid = uuid;
    
        this.x1 = x1;
        this.y1 = y1;
    
        this.x2 = x2;
        this.y2 = y2;
    
        this.x3 = x3;
        this.y3 = y3;
    
        this.events = events;
        this.path = "";
      }
      draw(){

      }
}

class _Line
{
    constructor(uuid, x=0, y=0, events = []){
        
        this.x = x;
        this.y = y;
        this.uuid = uuid;
       
        this.events = events;
        this.path = "";
    }

    draw(){

    }

    redraw(){

    }
}

class _Rectangle
{
    constructor(uuid, x= 0, y = 0, width = 10, height = 10, events = []){
        
        this.uuid = uuid;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
      
        this.events = events;
        this.rect = "";
    }

    draw(){

    }
}


global.Circle = _Circle;
global.Triangle = _Triangle;
global.Line = _Line;
global.Rectangle = _Rectangle;



test("create a circle form", (t) => {
    var form = new FactoryForm().createForm(uuid.generate(), "circle", {}, []);

    t.equal(form instanceof Circle, true);
    t.end();
});


test("create a triangle form", (t) => {
    var form = new FactoryForm().createForm(uuid.generate(), "triangle", {}, []);

    t.equal(form instanceof Triangle, true);
    t.end();
});


test("create a line form", (t) => {
    var form = new FactoryForm().createForm(uuid.generate(), "line", {}, []);

    t.equal(form instanceof Line, true);
    t.end();
});


test("create a rectangle form", (t) => {
    var form = new FactoryForm().createForm(uuid.generate(), "rectangle", {}, []);

    t.equal(form instanceof Rectangle, true);
    t.end();
});
