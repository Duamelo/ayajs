var svg = 1;

class uuid
{

    constructor()
    {

    }

    generate()
    {
        return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
}



class Component
{
    

    constructor( type, events = [],  x = 0, y = 0, r = 0)
    {
        this.uuid = new uuid().generate();
        this.type = type;
        this.x = x;
        this.y = y;
        this.r = r;
        //this.events = events;
        this.form = FactoryForm.createForm(this.uuid, this.type, {x:this.x, y:this.y, r: this.r}, events);
        
       /* this.events.map( (e) => {
            this.form.addEvent(e.ev, e.cb);
        });*/

        this.form.draw(svg);
       
    }

    
    clone = ()=>{
       
    }
}


class Circle
{
    
    constructor(uuid, x, y, r, events){
        this.x = x;
        this.y = y;
        this.r = r;
        this.uuid = uuid;
        this.events = events;

    }
    
    draw(svgs){
        var ns="http://www.w3.org/2000/svg";

        var circle = document.createElementNS(ns,"circle");
    
        circle.setAttribute("cx", this.x);
    
        circle.setAttribute("cy",this.y);
    
        circle.setAttribute("r", this.r);

        circle.setAttribute("id", this.uuid);
    
      //  console.log("draw");
        this.events.map( (e)=>{
            circle.addEventListener(e.ev, e.cb);
        });
        //var elt = `<circle id=${this.uuid} cx=${this.x} cy=${this.y} r=${this.r}/>`;
        svgs.appendChild(circle);
    }
}

class _FactoryForm
{

    createForm(uuid, type, param, events)
    {
        return new Circle(uuid, param.x, param.y, param.r, events);
    }
}


FactoryForm = new _FactoryForm();


