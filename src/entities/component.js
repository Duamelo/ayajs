
function generateIds(t)
{
    return Math.floor(Math.random() * t);
}


class Component
{
    id = 0;

    constructor( type, abscisse = 0, ordonnee = 0, id = 0)
    {
        this.id += id;
        this.type = type;
        this.abscisse = abscisse;
        this.ordonnee = ordonnee;
        this.form = FactoryForm.createForm(this.type);
        console.log(this);
    }

    
    clone = ()=>
    {
        var ids = generateIds(this.id);
        console.log(ids);
        return new Component(this.type, this.abscisse + 5, this.ordonnee + 4, this.id);
    }
}

module.exports = Component;