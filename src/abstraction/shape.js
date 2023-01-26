/**
 * Abstract class representing a generic prototype for all forms
 * 
 * @abstract 
 * 
 * @class Form
 *  
 */
class Shape
{
    addEvent(event, callback) {

    };

    deleteEvent(event){

    }

    addChild(child, translate, rotate){

    }

    setOffsetX(x){
        
    }

    setOffsetY(y){

    }

    setScaleX(x){

    }

    setScaleY(y){

    }

    getOffsetX(){

    }

    getOffsetY(){

    }

    getScaleX(){

    }

    getScaleY(){

    }

    setRotateCenter(centerX, centerY){

    }

    setRotateAngle(angle){

    }


    drawVertex(){

    }

    drawConnector() {

    }

    drawBox(){

    }

    draw(svg){

    };

    removeFromDOM(){

    }


    redraw(){

    };

    shift(dx, dy){

    }

    resize(pos, dx, dy){

    };

    optimalPath(line){

    };
}
export {Form}

