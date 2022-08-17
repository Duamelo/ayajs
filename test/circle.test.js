QUnit.module('Circle');


QUnit.test("creating circle object", assert => {
    var circle = aya.Circle(100, 200, 20);

    assert.ok(circle.uuid, "uuid must be no null");
    assert.equal(circle.type, "circle", "type of that form must be circle");
    assert.equal(circle.x, 100, "x value matches to the x parameter");
    assert.equal(circle.y, 200, "y value matches to the y parameter");
    assert.equal(circle.r, 20, "r value matches to the r parameter");
});

QUnit.test("check that circle is not yet drawn into the dom", assert => {
    var circle = aya.Circle(100, 200, 20);

    assert.equal(circle.type, "circle", "type of that form must be circle");
    assert.notOk(circle.c_svg, "the c_svg property must be different of empty string");
    assert.equal(circle.ccir_svg, "", "c_svg attribute representing the dom element is not yet defined");
});

QUnit.test("check that circle is well drawn into the dom", assert => {
    var circle = aya.Circle(100, 200, 20);
    
    circle.draw();

    assert.equal(circle.type, "circle", "type of that form must be circle");
    assert.ok(circle.c_svg, "the c_svg property must be different of empty string");
    assert.equal(circle.c_svg.nodeName, "circle", "svg element used is circle");
    assert.equal(circle.c_svg.attributes.length, 7, "the length of attributes property is 7");
    assert.equal(circle.c_svg.attributes[0].nodeValue, `${circle.uuid}`, "id must be that of the component");
    assert.equal(circle.c_svg.attributes[1].nodeValue, `${circle.x}`, "cx used must be that defined through x");
    assert.equal(circle.c_svg.attributes[2].nodeValue, `${circle.y}`, "cy used must be that defined through y");
    assert.equal(circle.c_svg.attributes[3].nodeValue, `${circle.r}`, "r used must be that defined through r");
    assert.equal(circle.c_svg.attributes[4].nodeValue, circle.config.form.fill, "fill used must be that defined in config file");
    assert.equal(circle.c_svg.attributes[5].nodeValue, circle.config.form.stroke, "stroke used must be that defined in config file");
    assert.equal(circle.c_svg.attributes[6].nodeValue, circle.config.form.strokeWidth, "stroke-width used must be that defined in config file");
    assert.equal(circle.c_svg.parentElement.children[`${circle.uuid}`], circle.c_svg, "the form is added to svg element");
});

QUnit.test("check that the box surrounding the circle shape is well drawn", assert => {

    var circle = aya.Circle(100, 100, 20);
    circle.draw();

    assert.equal(circle.type, "circle", "shape's type must be a circle");
    assert.equal(circle.type, "circle", "the  shape created must be a circle");
    assert.ok(circle.box, "the box property must be different of empty string");
    assert.equal(circle.box.nodeName, "path", "svg element used is path");
    assert.equal(circle.box.attributes[1].nodeValue, `${circle.uuid}`, "id must be that of circle form  ");
    assert.equal(circle.box.attributes[2].nodeValue, circle.config.box.fill, "fill used must be that defined in config file");
    assert.equal(circle.box.attributes[3].nodeValue, circle.config.box.stroke, "stroke used must be that defined in config file");
    assert.equal(circle.box.attributes[4].nodeValue, circle.config.box.strokeWidth, "stroke-width used must be that defined in config file");
    assert.equal(circle.box.attributes[5].nodeValue, circle.config.box.strokeDasharray, "stroke-dasharray used must be that defined in config file");
    // assert.equal(cp.form.c_svg.parentElement.children[`${cp.form.uuid}`], cp.form.c_svg, "the form is added to svg element");
});