
class Group{
    /**
     * 
     * @param {string} uuid 
     */

    constructor(uuid, svg, event, config){

        this.uuid = uuid;

        this.events = {};
        this.nativeEvent = event;
        this.config = config;

        this.c_svg = "";
        this.svg = svg;

        this.type = "group";

        /**
         * @description
         * .This variable represents the value of the rotation angle to be
         *  applied to rotate the group.
         * 
         * @type { Number } - The angle is given in radian.
         */
        this.angle = 0;


        /**
         * @description
         * The center of rotation is defined by defining centerX.
         * 
         * @type { Number } - centerX
         */
        this.centerX = 0;

        /**
         * @description
         * The center of rotation is defined by defining centerY.
         * 
         * @type { Number } - centerY
         */
        this.centerY = 0;

        this.c_svg = "";

        this.children = [];
    }

    addEvent(event, callback){
        this.c_svg.addEventListener(event, callback);
        this.events[event] = callback;
    }
    
    deleteEvent(event){
        var callback = this.events[event];
        this.c_svg.removeEventListener(event, callback);
        delete this.events[event];
    }

    addShape(children = []){
        children.map( (child) =>{
            this.children.push(child)
        });
    }

    setRotateCenter(centerX, centerY){
        this.centerX = centerX;
        this.centerY = centerY;
    }


    setRotateAngle(angle){
        this.angle = angle;
    }

    setOffsetX(x){
        this.offsetX = x;
    }

    draw(){
        const svgns = "http://www.w3.org/2000/svg";
        this.c_svg = document.createElementNS(svgns, "g");

        this.c_svg.setAttribute("id", this.uuid);
        this.c_svg.setAttribute("fill", this.config.form.fill);
        this.c_svg.setAttribute("stroke", this.config.form.stroke);

        this.children.map((child) => {
            this.c_svg.appendChild(child.c_svg);
        });
        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");

        this.svg.appendChild(this.c_svg);
        this.addEvent("mousedown", this.nativeEvent.mouseDownCb);
    }

    redraw(){
        this.c_svg.setAttribute("transform", "rotate(" + `${this.angle}` + "," + `${this.centerX}` + "," + `${this.centerY}` + ")");
        // this.c_svg.setAttribute("transform", "translate(0, 0)");
    }

    removeFromDOM(){
        this.children.map( (child) =>{
            console.log(child);
            child.removeFromDOM();
        });
        this.svg.removeChild(this.c_svg);
    }
}
export {Group};