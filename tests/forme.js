var test = require("tape");
var  Forme = require("../src/abstraction/forme");

test("test form", (t)=>{
    var point_connexion = [
        {
            abscisse: 5,
            ordonnee: 6
        },
        {
            abscisse: 10,
            ordonnee: 14
        }
    ];

    var coordonnee = [
        {
            location: {
                abscisse: 142,
                ordonnee: 1258
            },
            text: "this is a text"
        }
    ];


    var form = new Forme(1, point_connexion, coordonnee );

    t.plan(1);
    t.equal(form instanceof Forme, true, "form should be an instance of Forme class");
    t.end();
})