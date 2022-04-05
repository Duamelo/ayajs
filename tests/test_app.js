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
    

    //constructor( type, events = [],  x = 0, y = 0, r = 0)
    constructor( type, events = [],  props)
    {
        this.uuid = new uuid().generate();
        this.type = type;
        this.props = props;
        // this.x = x;
        // this.y = y;
        // this.r = r;
        //this.events = events;
        //this.form = FactoryForm.createForm(this.uuid, this.type, {x:this.x, y:this.y, r: this.r}, events);
        this.form = FactoryForm.createForm(this.uuid, this.type, this.props, events);
        
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


class Rectangle {
    
    constructor(uuid,width = 10, height = 10, _X = 0, _Y = 0, events){
        
        this.width = width;
        this.height = height;
        this.uuid = uuid;
        this.posInit = {x:_X,y:_Y};
        this.events = events;
        const svgns = "http://www.w3.org/2000/svg";
        this.rect = document.createElementNS(svgns,'rect');

    }

    draw(svgs){

        
        this.rect.setAttributeNS(null, 'x', this.posInit.x);
        this.rect.setAttributeNS(null, 'y', this.posInit.y);
        this.rect.setAttributeNS(null, 'height', this.height);
        this.rect.setAttributeNS(null, 'width',this.width);
        this.rect.classList.add("draggable");      
        svgs.appendChild(this.rect);
    }

    move(){

    }

}

class _FactoryForm
{

    createForm(uuid, type, props, events)
    {
        if(type == "circle")
            return new Circle(uuid, props.x, props.y, props.r, events);
        if(type == "rectangle")
            return new Rectangle(uuid, props.width, props.height, props._X,props._Y, events);
    }
}


FactoryForm = new _FactoryForm();


class NativeEvents{
    
    static move(evt){
        
        var selectedElement, offset, positionObj = {},transform;
        let target = evt.target;


        target.addEventListener("mousedown",startMove);
        target.addEventListener("mousemove",move);
        target.addEventListener("mouseup",endMove);
        target.addEventListener("mouseleave",endMove);

        function getMousePosition(evt) {
            var CTM = svg.getScreenCTM();
            
            return {
                x : (evt.clientX - CTM.e) / CTM.a,
                y : (evt.clientY - CTM.f) / CTM.d
            }
        }

        function startMove(evt){
            if(target.classList.contains('draggable')){
                selectedElement = evt.target
                offset = getMousePosition(evt);
                
                var transforms = selectedElement.transform.baseVal;

                if(transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE){
                    var translate = svg.createSVGTransform();
                    translate.setTranslate(0,0);
                    selectedElement.transform.baseVal.insertItemBefore(translate, 0);
                }
                transform = transforms.getItem(0);
                positionObj.x = transform.matrix.e;
                positionObj.y = transform.matrix.f;
                
            }
        }

        function move(evt) {
            

            if(selectedElement){
                evt.preventDefault();
                var coord = getMousePosition(evt);
  

                //selectedElement.setAttributeNS(null,"x",coord.x - offset.x + positionObj.x);
                //selectedElement.setAttributeNS(null,"y",coord.y - offset.y + positionObj.y);
                transform.setTranslate(coord.x - offset.x + positionObj.x, coord.y - offset.y + positionObj.y)

            }
        }

        function endMove(evt) {
        
            selectedElement = null;
        }


    }

    resize(){

    }

    static scale(target){

            //let target = evt.target;
            // evt.setAttribute("currentScale", 1.5);
            // evt.currentScale = 1.5;
            //target.setAttribute("transform", "scale(1.5)");
        
    }

}




