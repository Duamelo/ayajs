var test = require("tape");


class _FactoryForm
{

    createForm(type)
    {
        return type;
    }
}

global.FactoryForm = new _FactoryForm();

var Component = require("../src/entities/component");



test("test component constructor with 1 parametre", (t)=> {
    
    var comp = new Component("rectangle");

    t.plan(3);
    t.equal(comp.abscisse, 0, "abscisse should be 0");
    t.equal(comp.ordonnee, 0, "ordonne should be 0");
    t.equal(comp.form, "rectangle", "form of component should be different of null");

    t.end();
});

test("test component constructor with 3 parameters", (t) => {
    
    var comp1 = new Component("carre", 1, 5);

    t.plan(3);
    t.equal(comp1.abscisse, 1, "abscisse should be 1");
    t.equal(comp1.ordonnee, 5, "ordonnee should be 5");
    t.equal(comp1.form, "carre", "form of component should be different of null");
    t.end();
});


test("it should be clone a component", (t) => {
    var comp = new Component("triangle", 1, 2, 5);
    var c_comp = comp.clone();

    t.plan(5);
    t.assert(c_comp instanceof Object,  true, "clone component is an objet before");
    t.equal(c_comp.abscisse, 6 ,"dx1 = dx0 +5");
    t.equal(c_comp.ordonnee, 6, "dy1 = dy0 +4");
    t.equal(comp.type, c_comp.type, "same type of form");
    t.equal(comp.id, c_comp.id, "different id");
    t.end();
});