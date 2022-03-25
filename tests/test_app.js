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

    
    clone = ()=>
    {
        return new Component(this.type, this.x + 5, this.y + 4);
    }

    render()
    {

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

    addEvent(ev, cb){
        this.event += ".addEventListener("+ ev + "," + cb + ")"; 

    }
    
    draw(svgs){
        var ns="http://www.w3.org/2000/svg";

        var newElem = document.createElementNS(ns,"circle");
    
        newElem.setAttribute("cx", this.x);
    
        newElem.setAttribute("cy",this.y);
    
        newElem.setAttribute("r", this.r);

        newElem.setAttribute("id", this.uuid);
    
      //  console.log("draw");
        this.events.map( (e)=>{
            newElem.addEventListener(e.ev, e.cb);
        });
        //var elt = `<circle id=${this.uuid} cx=${this.x} cy=${this.y} r=${this.r}/>`;
        svgs.appendChild(newElem);
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


