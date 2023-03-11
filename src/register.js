class _Register
{
    static store = {};

    static add(object) {
        _Register.store[object.uuid] = object;
    }

    static find(uuid){
        return _Register.store[uuid];
    }

    static clear(uuid){
        delete _Register.store[uuid];
    }
    
    static findAllLink(component){
        var result = [];
        Object.keys(_Register.store).map((id) => {
            var obj = _Register.find(id);
            if(obj.type == "link"){
                if(component.uuid == obj.source.ref || component.uuid == obj.destination.ref)
                    result.push(obj);
            }
        });
        return result;
    }

    static findAllComponents(){
        var result = [];
        Object.keys(_Register.store).map((id) => {
            var obj = _Register.find(id);
            if(obj.shape) // it means the obj is a component
                result.push(obj);
        });
        return result;
    }
}
export  {_Register};