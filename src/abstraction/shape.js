/**
 * Abstract class representing a generic prototype for all shapes
 * 
 * @abstract 
 * 
 * @class Shape
 *  
 */
class Shape
{
    addEvent(event, callback) {

    };

    deleteEvent(event){

    }

    deleteAllEvents(){
        
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
}
export {Shape}

