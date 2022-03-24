var test = require("tape");
var FactoryForm = require("../src/FactoryForm");




test("create a specific form", (t) => {
    var form = FactoryForm.createForm("circle");

    t.equal(form, 'circle');
    t.end();
})