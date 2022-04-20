var test = require('tape');
var uuid = require('../src/entities/uuid');


test("should generate a unique uuid", (t)=> {
    var id1 = new uuid().generate();
    var id2 = new uuid().generate();
    console.log(id1);
    console.log(id2);
    t.notEqual(id1, id2, "not matching");
    t.end();
});