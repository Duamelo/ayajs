import { Component } from "./component";

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
            if(obj.type == "link"){
                if(component.uuid == obj.source.ref || component.uuid == obj.destination.ref)
                    result.push(obj);
            }
        });
        return result;
    }

    static getAllComponent(){
        var result = [];
        Object.keys(store).map((id) => {
            var obj = _Register.find(id);
            if(obj instanceof Component)
                result.push(obj);
        });
        return result;
    }
}
export  {_Register};