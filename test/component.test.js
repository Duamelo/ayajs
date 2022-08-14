QUnit.module('Component');

QUnit.test("creating a rectangle component", assert =>{
    var props = {
        x: 100,
        y: 100,
        width: 300,
        height: 200
    };

    var cp = aya.Component("rectangle", props);

    assert.ok(cp.uuid, "id must be defined");
    assert.equal(cp.type, "rectangle", "component's type must be a rectangle");
    assert.equal(cp.form.type, "rectangle", "the  shape created must be a rectangle");
});