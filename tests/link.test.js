var test = require("tape");
const Link = require("../src/entities/link");

var draw_link = 0;


/**
 * HUB uuid class
 */
 class _uuid
 {
 
     constructor() {}
 
     generate()
     {
         return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
     }
 }
global.Uuid = _uuid;


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
        this.uuid = new Uuid().generate();
    }
}

global.Comp = _Comp;


class _BezierCurve
{
    constructor() {}

    draw(){
        draw_link++;
    }
}
global.BezierCurve = new _BezierCurve();



test("add a link between two components", (t) => {
    var cp1 = new Comp();
    var cp2 = new Comp();

    var lk = new Link();
    
    lk.add(cp1.uuid+cp2.uuid, cp1, cp2);

    var st = lk.find(cp1.uuid+cp2.uuid);

    t.equal(st.src, cp1);
    t.equal(st.dest, cp2);
    t.end();
});

test("add multiple links between two components", (t) => {
    var cp1 = new Comp();
    var cp2 = new Comp();

    var cp3 = new Comp();
    var cp4 = new Comp();

    var lk = new Link();


    lk.add(cp1.uuid+cp2.uuid, cp1, cp2);
    lk.add(cp3.uuid+cp4.uuid, cp3, cp4);

    var st = lk.find(cp1.uuid+cp2.uuid);
    var rs = lk.find(cp3.uuid+cp4.uuid);

    t.equal(st.src, cp1);
    t.equal(st.dest, cp2);

    t.equal(rs.src, cp3);
    t.equal(rs.dest, cp4);
    t.end();
});

test("draw link", (t) => {
    
    draw_link = 0;

    var cp1 = new Comp();
    var cp2 = new Comp();

    var lk = new Link();


    lk.add(cp1.uuid+cp2.uuid, cp1, cp2);

    lk.draw(lk.find(cp1.uuid+cp2.uuid));

    t.equal(draw_link, 1);
    t.end();
});


test("delete a link", (t) => {
    var cp1 = new Comp();
    var cp2 = new Comp();

    var lk = new Link();


    lk.add(cp1.uuid+cp2.uuid, cp1, cp2);

    var l = lk.find(cp1.uuid+cp2.uuid);
    t.equal(l.src, cp1);

    lk.destroy(cp1.uuid+cp2.uuid);

    var l = lk.find(cp1.uuid+cp2.uuid);
    
    t.equal(l, undefined);

    t.end();
});