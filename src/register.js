var store = {};

class Register
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
}

module.exports =  Register;

// rnvoyer la liste des liens à bouger

// comparer comp_actuel et source_liaison/dest_liaison

// mettre le mousedown sur les points de conect

// dans comp