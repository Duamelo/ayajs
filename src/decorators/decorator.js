class Decorator{
    constructor(component){
        if (!component || !component.shape)
            throw new Error("component is required");
        this.component = component;
    }

    addChild(child, translate, rotate, drawing){
        this.component.addChild(child, translate, rotate, drawing);
    }
}

export {Decorator};