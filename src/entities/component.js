class Component
{
    
    constructor(type, abscisse =  0, ordonnee =0)
    {
        this.type = type;
        this.abscisse = abscisse;
        this.ordonnee = ordonnee;
        this.form = FactoryForm.getForm(this.type);
    }

    clone()
    {
        
    }

}

module.exports = Component;