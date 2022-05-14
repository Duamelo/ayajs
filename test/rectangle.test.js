import test from "tape";
import {Rectangle} from "../src/entities/rectangle.js";
import {_uuid} from "../src/entities/uuid.js";


test("uuid exist", (t) => {
    var rc = new Rectangle(_uuid.generate());

    t.notEqual(rc.uuid, undefined);
    t.end();
});


test("class rectangle instanciation without parameters", (t) =>{
    var rc = new Rectangle(_uuid.generate());

    t.equal(rc.x, 0);
    t.equal(rc.y, 0);
    t.equal(rc.width, 10);
    t.equal(rc.height, 10);
    t.equal(rc.events.length, 0);
    t.end();
});

test("class rectangle instanciation with parameters", (t) => {
    var rc = new Rectangle(_uuid.generate(), 14, 19, 50, 30, [{ev: null, cb: null}]);

    t.equal(rc.x, 14);
    t.equal(rc.y, 19);
    t.equal(rc.width, 50);
    t.equal(rc.height, 30);
    t.equal(rc.events.length, 1);
    t.end();
});

test("rect exist", (t) => {
    var rc = new Rectangle(_uuid.generate(), 14, 19, 50, 30, [{ev: null, cb: null}]);

    t.equal(rc.rect, "");
    t.end();
});

test("draw a connection point", (t) => {
    var rc = new Rectangle(_uuid.generate(), 14, 19, 50, 30, [{ev: null, cb: null}]);

  
    t.equal(rc.c_points.length, 8)
    t.end();
});



test("check the coordinates of the connection points", (t) => {
    var rc = new Rectangle(_uuid.generate(), 0, 0, 40, 40, [{ev: null, cb: null}]);

    t.equal(rc.c_points[0].x, 0);
    t.equal(rc.c_points[0].y, 0);
    t.equal(rc.c_points[0].r, 5);
    t.equal(rc.c_points[0].uuid, rc.uuid);

    t.equal(rc.c_points[1].x, 20);
    t.equal(rc.c_points[1].y, 0);
    t.equal(rc.c_points[1].r, 5);
    t.equal(rc.c_points[1].uuid, rc.uuid);

    t.equal(rc.c_points[2].x, 40);
    t.equal(rc.c_points[2].y, 0);
    t.equal(rc.c_points[2].r, 5);
    t.equal(rc.c_points[2].uuid, rc.uuid);

    t.equal(rc.c_points[3].x, 40);
    t.equal(rc.c_points[3].y, 20);
    t.equal(rc.c_points[3].r, 5);
    t.equal(rc.c_points[3].uuid, rc.uuid);

    t.equal(rc.c_points[4].x, 40);
    t.equal(rc.c_points[4].y, 40);
    t.equal(rc.c_points[4].r, 5);
    t.equal(rc.c_points[4].uuid, rc.uuid);

    t.equal(rc.c_points[5].x, 20);
    t.equal(rc.c_points[5].y, 40);
    t.equal(rc.c_points[5].r, 5);
    t.equal(rc.c_points[5].uuid, rc.uuid);

    t.equal(rc.c_points[6].x, 0);
    t.equal(rc.c_points[6].y, 40);
    t.equal(rc.c_points[6].r, 5);
    t.equal(rc.c_points[6].uuid, rc.uuid);

    t.equal(rc.c_points[7].x, 0);
    t.equal(rc.c_points[7].y, 20);
    t.equal(rc.c_points[7].r, 5);

    t.equal(rc.c_points[7].uuid, rc.uuid);
    
    t.end();
});
