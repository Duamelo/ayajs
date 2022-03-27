var store = {}

class Register
{
    constructor() {}

    add(uuid, component) {
    
        store[uuid] = component;

        return {
            id: uuid,
            Component: component,
            store: store
        }
    }

    find(uuid){
        return store[uuid];
    }

    update(uuid, params){

        var cp = store[uuid];

        cp.params.x = params.x;
        cp.params.y = params.y;
        cp.params.r = params.r;

        cp.form.x = params.x;
        cp.form.y = params.y;
        cp.form.r = params.r;
    }

    clear(uuid){
        delete store[uuid];
    }
}

module.exports = Register;

