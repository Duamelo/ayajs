QUnit.module('Component');

// Rectangle Component Test

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

QUnit.test("check that the rectangle component is correctly drawn in the dom", assert => {
    var props = {
        x: 100,
        y: 100,
        width: 300,
        height: 200
    };

    var cp = aya.Component("rectangle", props);

    assert.equal(cp.type, "rectangle", "component's type must be a rectangle");
    assert.equal(cp.form.type, "rectangle", "the  shape created must be a rectangle");
    assert.ok(cp.form.c_svg, "the c_svg property must be different of empty string");
    assert.equal(cp.form.c_svg.nodeName, "rect", "svg element used is rect");
    assert.equal(cp.form.c_svg.attributes.length, 8, "the length of attributes property is 8");
    assert.equal(cp.form.c_svg.attributes[0].nodeValue, `${cp.uuid}`, "id must be that of the component");
    assert.equal(cp.form.c_svg.attributes[1].nodeValue, `${cp.form.x}`, "x used must be that defined");
    assert.equal(cp.form.c_svg.attributes[2].nodeValue, `${cp.form.y}`, "y used must be that defined");
    assert.equal(cp.form.c_svg.attributes[3].nodeValue, `${cp.form.width}`, "width used must be that defined");
    assert.equal(cp.form.c_svg.attributes[4].nodeValue, `${cp.form.height}`, "height used must be that defined");
    assert.equal(cp.form.c_svg.attributes[5].nodeValue, cp.form.config.form.fill, "fill used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[6].nodeValue, cp.form.config.form.stroke, "stroke used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[7].nodeValue, cp.form.config.form.strokeWidth, "stroke-width used must be that defined in config file");
    assert.equal(cp.form.c_svg.parentElement.children[`${cp.form.uuid}`], cp.form.c_svg, "the form is added to svg element");
});


// Circle Component Test


QUnit.test("creating a circle component", assert =>{
    var props = {
        x: 100,
        y: 100,
        r: 10,
    };

    var cp = aya.Component("circle", props);

    assert.ok(cp.uuid, "id must be defined");
    assert.equal(cp.type, "circle", "component's type must be a circle");
    assert.equal(cp.form.type, "circle", "the  shape created must be a circle");
});


QUnit.test("check that the circle component is correctly drawn in the dom", assert => {
    var props = {
        x: 100,
        y: 100,
        r: 10,
    };

    var cp = aya.Component("circle", props);

    assert.equal(cp.type, "circle", "component's type must be a circle");
    assert.equal(cp.form.type, "circle", "the  shape created must be a circle");
    assert.ok(cp.form.c_svg, "the c_svg property must be different of empty string");
    assert.equal(cp.form.c_svg.nodeName, "circle", "svg element used is circle");
    assert.equal(cp.form.c_svg.attributes.length, 7, "the length of attributes property is 7");
    assert.equal(cp.form.c_svg.attributes[0].nodeValue, `${cp.uuid}`, "id must be that of the component");
    assert.equal(cp.form.c_svg.attributes[1].nodeValue, `${cp.form.x}`, "cx used must be that defined through x");
    assert.equal(cp.form.c_svg.attributes[2].nodeValue, `${cp.form.y}`, "cy used must be that defined through y");
    assert.equal(cp.form.c_svg.attributes[3].nodeValue, `${cp.form.r}`, "r used must be that defined through r");
    assert.equal(cp.form.c_svg.attributes[4].nodeValue, cp.form.config.form.fill, "fill used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[5].nodeValue, cp.form.config.form.stroke, "stroke used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[6].nodeValue, cp.form.config.form.strokeWidth, "stroke-width used must be that defined in config file");
    assert.equal(cp.form.c_svg.parentElement.children[`${cp.form.uuid}`], cp.form.c_svg, "the form is added to svg element");

});

QUnit.test("check that the box surrounding the circle shape is well drawn", assert => {

    var props = {
        x: 100,
        y: 100,
        r: 10,
    };

    var cp = aya.Component("circle", props);

    assert.equal(cp.type, "circle", "component's type must be a circle");
    assert.equal(cp.form.type, "circle", "the  shape created must be a circle");
    assert.ok(cp.form.box, "the box property must be different of empty string");
    assert.equal(cp.form.box.nodeName, "path", "svg element used is path");
    assert.equal(cp.form.box.attributes[1].nodeValue, `${cp.uuid}`, "id must be that of the component and circle form");
    assert.equal(cp.form.box.attributes[2].nodeValue, cp.form.config.box.fill, "fill used must be that defined in config file");
    assert.equal(cp.form.box.attributes[3].nodeValue, cp.form.config.box.stroke, "stroke used must be that defined in config file");
    assert.equal(cp.form.box.attributes[4].nodeValue, cp.form.config.box.strokeWidth, "stroke-width used must be that defined in config file");
    assert.equal(cp.form.box.attributes[5].nodeValue, cp.form.config.box.strokeDasharray, "stroke-dasharray used must be that defined in config file");
    // assert.equal(cp.form.c_svg.parentElement.children[`${cp.form.uuid}`], cp.form.c_svg, "the form is added to svg element");
});



// Lozenge Component Test


QUnit.test("creating a lozenge component", assert =>{
    var props = {
        x: 100,
        y: 100,
        width: 300,
        height: 200
    };

    var cp = aya.Component("lozenge", props);

    assert.ok(cp.uuid, "id must be defined");
    assert.equal(cp.type, "lozenge", "component's type must be a lozenge");
    assert.equal(cp.form.type, "lozenge", "the  shape created must be a lozenge");
});

QUnit.test("check that the lozenge component is correctly drawn in the dom", assert => {
    var props = {
        x: 100,
        y: 100,
        width: 300,
        height: 200
    };

    var cp = aya.Component("lozenge", props);

    assert.equal(cp.type, "lozenge", "component's type must be a lozenge");
    assert.equal(cp.form.type, "lozenge", "the  shape created must be a lozenge");
    assert.ok(cp.form.c_svg, "the c_svg property must be different of empty string");
    assert.equal(cp.form.c_svg.nodeName, "path", "svg element used is path");
    assert.equal(cp.form.c_svg.attributes.length, 5, "the length of attributes property is 5");
    assert.equal(cp.form.c_svg.attributes[0].nodeValue, `${cp.uuid}`, "id must be that of the component");
    assert.equal(cp.form.c_svg.attributes[1].nodeValue, "M 100 100  L 250 200  L 100 300  L -50 200Z", "values inside d attribute used must be that defined through props");
    assert.equal(cp.form.c_svg.attributes[2].nodeValue, cp.form.config.form.fill, "fill used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[3].nodeValue, cp.form.config.form.stroke, "stroke used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[4].nodeValue, cp.form.config.form.strokeWidth, "stroke-width used must be that defined in config file");
    assert.equal(cp.form.c_svg.parentElement.children[`${cp.form.uuid}`], cp.form.c_svg, "the form is added to svg element");
});

QUnit.test("check that the box surrounding the lozenge shape is well drawn", assert => {

    var props = {
        x: 100,
        y: 100,
        width: 300,
        height: 200
    };

    var cp = aya.Component("lozenge", props);

    assert.equal(cp.type, "lozenge", "component's type must be a lozenge");
    assert.equal(cp.form.type, "lozenge", "the  shape created must be a lozenge");
    assert.ok(cp.form.box, "the box property must be different of empty string");
    assert.equal(cp.form.box.nodeName, "path", "svg element used is path");
    assert.equal(cp.form.box.attributes[1].nodeValue, `${cp.uuid}`, "id must be that of the component and lozenge form");
    assert.equal(cp.form.box.attributes[2].nodeValue, cp.form.config.box.fill, "fill used must be that defined in config file");
    assert.equal(cp.form.box.attributes[3].nodeValue, cp.form.config.box.stroke, "stroke used must be that defined in config file");
    assert.equal(cp.form.box.attributes[4].nodeValue, cp.form.config.box.strokeWidth, "stroke-width used must be that defined in config file");
    assert.equal(cp.form.box.attributes[5].nodeValue, cp.form.config.box.strokeDasharray, "stroke-dasharray used must be that defined in config file");
});



// Triangle Component Test


QUnit.test("creating a triangle component", assert =>{
    var props = {
        x1: 50,
        y1: 75,
        x2: 70,
        y2: 35,
        x3: 90,
        y3: 45,
    };

    var cp = aya.Component("triangle", props);


    assert.ok(cp.uuid, "id must be defined");
    assert.equal(cp.type, "triangle", "component's type must be a triangle");
    assert.equal(cp.form.type, "triangle", "the  shape created must be a triangle");
});



QUnit.test("check that the triangle component is correctly drawn in the dom", assert => {
    var props = {
        x1: 50,
        y1: 75,
        x2: 70,
        y2: 35,
        x3: 90,
        y3: 45,
    };

    var cp = aya.Component("triangle", props);

    assert.equal(cp.type, "triangle", "component's type must be a triangle");
    assert.equal(cp.form.type, "triangle", "the  shape created must be a triangle");
    assert.ok(cp.form.c_svg, "the c_svg property must be different of empty string");
    assert.equal(cp.form.c_svg.nodeName, "path", "svg element used is path");
    assert.equal(cp.form.c_svg.attributes.length, 5, "the length of attributes property is 5");
    assert.equal(cp.form.c_svg.attributes[0].nodeValue, `${cp.uuid}`, "id must be that of the component");
    assert.equal(cp.form.c_svg.attributes[1].nodeValue, "M 50,75 L 70,35 L 90,45 Z", "values used inside path must be that defined through props");
    assert.equal(cp.form.c_svg.attributes[3].nodeValue, cp.form.config.form.stroke, "stroke used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[4].nodeValue, cp.form.config.form.strokeWidth, "stroke-width used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[2].nodeValue, cp.form.config.form.fill, "fill used must be that defined in config file");
    assert.equal(cp.form.c_svg.parentElement.children[`${cp.form.uuid}`], cp.form.c_svg, "the form is added to svg element");
});


// Line Component Test


QUnit.test("creating a line component", assert =>{
    var props = {
      x: 100,
      y: 200,
      dest_x: 400,
      dest_y: 600
    };

    var cp = aya.Component("line", props);

    assert.ok(cp.uuid, "id must be defined");
    assert.equal(cp.type, "line", "component's type must be a triangle");
    assert.equal(cp.form.type, "line", "the  shape created must be a triangle");
});


QUnit.test("check that the line component is correctly drawn in the dom", assert => {
    var props = {
      x: 100,
      y: 200,
      dest_x: 400,
      dest_y: 600
    };

    var cp = aya.Component("line", props);

    assert.equal(cp.type, "line", "component's type must be a line");
    assert.equal(cp.form.type, "line", "the  shape created must be a line");
    assert.ok(cp.form.c_svg, "the c_svg property must be different of empty string");
    assert.equal(cp.form.c_svg.nodeName, "path", "svg element used is path");
    assert.equal(cp.form.c_svg.attributes.length, 5, "the length of attributes property is 5");
    assert.equal(cp.form.c_svg.attributes[0].nodeValue, `${cp.uuid}`, "id must be that of the component");
    assert.equal(cp.form.c_svg.attributes[1].nodeValue, "M 100,200 400,600", "values used inside path must be that defined through props");
    assert.equal(cp.form.c_svg.attributes[2].nodeValue, cp.form.config.form.fill, "fill used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[3].nodeValue, cp.form.config.form.stroke, "stroke used must be that defined in config file");
    assert.equal(cp.form.c_svg.attributes[4].nodeValue, cp.form.config.form.strokeWidth, "stroke-width used must be that defined in config file");
    assert.equal(cp.form.c_svg.parentElement.children[`${cp.form.uuid}`], cp.form.c_svg, "the form is added to svg element");
});



