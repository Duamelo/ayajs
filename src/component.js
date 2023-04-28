import {_Register}  from "./register.js";
import {_uuid} from "./uuid.js";
import {Factory} from "./factory.js";

class Component
{
    /**
     * 
     * @param {*} type 
     * @param {*} props 
     * @param {*} svg 
     */
    constructor(type, props)
    {
        this.uuid = _uuid.generate();
        this.type = type;
        this.shape = Factory.createShape(this.uuid, type, props);
        this.shape.draw();
        _Register.add(this);
    }

    move(dx,dy){
        this.shape.x += dx;
        this.shape.y += dy;

        this.shape.redraw();
	
        var lk = _Register.findAllLink(this);
        
        lk.map((link) => {
            link.redraw();
        });
    }

  /**
   * @description
   * We can build any shape by adding to a basic component a children shape.
   * 
   * @param { (Rectangle | Lozenge | Triangle | Circle | Line | Text) } child - This shape ( @extend Shape) is added 
   * as a child to a component with a form.
   * @param { Function } translate - { x:, y: } This object allows us to position the child relative to its parent.
   * @param {Function } rotate  - { x:, y: , r: } This object allows us to apply a rotation of the child taking into 
   * account its relative position and the center of rotation.
   */
  addChild(child, translate = null, rotate = null, drawing = true){
    /* resizing and connection to child isn't possible */
    child.vertex = [];
    child.c_points = [];

    if(translate != null){
        child.offsetX = translate.x;
        child.offsetY = translate.y;
    }
    if(rotate != null){
        child.centerX = rotate.x;
        child.centerY = rotate.y;
        child.angle = rotate.angle;
    }       
    if(drawing == true)
        child.draw();
    this.shape.children.push({child});
  }

  remove(){
    this.shape.removeFromDOM();
    _Register.clear(this.uuid);
  }
}
export {Component};
