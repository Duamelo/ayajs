QUnit.module("Rectangle");


QUnit.test("Default creation of a rectangle", assert => {
    var r = new Rectangle();

    assert.equal(r.x, 100, "set x");
    assert.equal(r.y, 100, "set y");
    assert.equal(r.width, 200, "set width");
    assert.equal(r.height, 300, "set height");
});


QUnit.test("Throws an exception when x attribute isn't a number", assert => {
    assert.throws(
	()=>{
	    new Rectangle(null);
	},
	"x attribute must be a number"
    );
});

QUnit.test("Throws an exception when y attribute isn't a number", assert => {
    assert.throws(
	()=>{
	    new Rectangle(1, null);
	},
	"y attribute must be a number"
    );
});

QUnit.test("Throws an exception when width attribute isn't a number", assert => {
    assert.throws(
	()=>{
	    new Rectangle(1, 2, null);
	},
	"width attribute must be a number"
    );
});
