var test = require("tape");
const Link = require("../src/entities/link");
const uuid = require("../src/maths/uuid");
const Register = require("../src/register");

// retour de l'instanciation de line dans link
/**
 * HUB Component class
 */
class _Comp
{
    /**
     * 
     * @param {string} type 
     * @param {array} events 
     * @param {object} params 
     */
    constructor( type, events = [],  params = {})
    {
        this.uuid = uuid.generate();
    }
}

global.Comp = _Comp;



test("Link with only source parameter", (t) => {

    var cp = new Comp();
    var lk = new Link(cp);

    t.equal(lk.source, cp);
    t.equal(lk.destination, undefined);
    t.end();

});


test("source and destination should be there", (t) => {
    var cp1 = new Comp();
    var cp2 = new Comp();

    var lk = new Link(cp1, cp2);

    t.equal(lk.source, cp1);
    t.equal(lk.destination, cp2);
    t.end();
});


test("should have a unique id", (t) => {
    var cp1 = new Comp();
    var cp2 = new Comp();

    var lk = new Link(cp1, cp2);

    t.notEqual(lk.uuid, undefined);
    t.end();
});




test("register link between two components", (t) => {
    var cp1 = new Comp();
    var cp2 = new Comp();

    var lk = new Link(cp1, cp2);

    t.equal(Register.find(lk.uuid), lk);
    t.end();
});



test("flip line when drawn", (t) => {
    var cp1 = new Comp();
    var cp2 = new Comp();

    var link = {};
    
    var lk = new Link(cp1, cp2, link);

    t.equal(lk.link, link);
    t.end();
});


test("delete a link", (t) => {
    var cp1 = new Comp();
    var cp2 = new Comp();

    var lk = new Link(cp1, cp2);

    Register.clear(lk.uuid);

    t.equal(Register.find(lk.uuid), undefined);
    t.end();
});


test("return the list of links in which a component participates", (t) => {
    var cp1 = new Comp();
    var cp2 = new Comp();
    var cp3 = new Comp();
    var cp4 = new Comp();
    var cp5 = new Comp();
    var cp6 = new Comp();

    var lk = new Link(cp1, cp2);
    var lk = new Link(cp1, cp3);
    var lk = new Link(cp1, cp4);
    var lk = new Link(cp1, cp5);
    var lk = new Link(cp1, cp6);

    var rs = Register.getAllLinksByComponent(cp1);

    t.equal(rs.length, 5);
    t.end();
});
    