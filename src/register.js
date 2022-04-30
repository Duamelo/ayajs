var store = {};

class _Register
{
    static add(object) {
        store[object.uuid] = object;
    }

    static find(uuid){
        return store[uuid];
    }

    static clear(uuid){
        delete store[uuid];
    }
    
    static getAllLinksByComponent(component){
        var result = [];
        Object.keys(store).map((id) => {
            var obj = _Register.find(id);
            if(obj.type == undefined){
                if((component == obj.source)  || (component == obj.destination))
                    result.push(obj);
            }
        });
        return result;
    }
}

export  {_Register};