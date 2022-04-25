import { Line } from "./entities/line.js";
import { _Register } from "./register.js";
import { _uuid } from "./entities/uuid.js";
import { Link } from "./entities/link.js";

function nativeEvents() {
  var id;
  var cp;
  var dx, dy;
  var state = "";
  var deltaX, deltaY;
  var line = "";
  var source;
  var lk;
  var prev_pos;
  var pos;

  return {
    mouseDownCb: function mousedowncb(e) {

      dx = e.offsetX;
      dy = e.offsetY;

      id = e.srcElement.id;

      cp = _Register.find(id);

      if (id != "svg")
        source =
          cp != undefined && cp.parent != undefined
            ? _Register.find(cp.parent)
            : cp;
      console.log(cp);
      console.log(source);
      lk = _Register.getAllLinksByComponent(cp);

      // un component n'a pas de propriété parent
      if (cp != undefined && cp.parent == undefined) state = "moving";
      else {
        if ((pos = source.form.vertex.indexOf(cp)) >= 0) {
          state = "resizing";
          dx = e.offsetX;
          dy = e.offsetY;
        } else {
          state = "drawing_link";
          id = _uuid.generate();
          if (cp != source) {
            line = new Line(id, cp.x, cp.y, []);
            line.draw(svg);
          }
        }
      }
    },
    mouseMoveCb: function movecb(e) {
      var pos;
        // var pos;
        if (state == "moving") {
            deltaX = e.offsetX - dx;
            deltaY = e.offsetY - dy;

      if (state == "moving") {
        deltaX = e.offsetX - dx;
        deltaY = e.offsetY - dy;

        dx = e.offsetX;
        dy = e.offsetY;

        lk.map(({ source, line }) => {
          if (cp == source) {
            cp.form.c_points.map((pnt) => {
              if (pnt.x == line.x && pnt.y == line.y) {
                line.x += deltaX;
                line.y += deltaY;
                line.redraw();
              }
            });
          } else {
            cp.form.c_points.map((pnt) => {
              if (pnt.x == line.dest_x && pnt.y == line.dest_y) {
                line.dest_x += deltaX;
                line.dest_y += deltaY;
                line.redraw();
              }
            });
          }
        });
        cp.form.shift(deltaX, deltaY);
        cp.form.redraw();
      } else if (state == "drawing_link") {
        source.form.vertex.map((v) => {
          if (v.x == line.x && v.y == line.y) {
            v.c_svg.classList.remove("vertex");
            v.c_svg.classList.add("vertex_hover");
          }
        });

        source.form.c_points.map((v) => {
          if (v.x == line.x && v.y == line.y) {
            v.c_svg.style.color = "gray";
            v.c_svg.classList.remove("vertex");
            v.c_svg.classList.add("vertex_hover");
          }
        });

        line.dest_x = e.clientX;
        line.dest_y = e.clientY;
        line.redraw();
      } else if (state == "resizing") {
        pos = source.form.vertex.indexOf(cp);
        if (source.type == "rectangle") {
          deltaX = e.offsetX - dx;
          deltaY = e.offsetY - dy;

          dx = e.offsetX;
          dy = e.offsetY;

          source.form.resize(pos, deltaX, deltaY);
          source.form.redraw();
        } else if (source.type == "triangle") {
          console.log("triangle is moving");

          if (prev_pos == 0 && pos == -1) {
            pos += 1;
          } else if (prev_pos == 1 && pos == -1) {
            pos += 2;
          } else if (prev_pos == 2 && pos == -1) {
            pos += 3;
          }
          console.log(pos);
          console.log(prev_pos);
          dx = e.offsetX;
          dy = e.offsetY;

          source.form.resize(pos, dx, dy);
          source.form.redraw();
          prev_pos = pos;
            cp.form.shift(deltaX, deltaY);
            cp.form.redraw();
        }
        else if (state == "drawing_link") {
          source.form.vertex.map((v) => {

            if(v.x == line.x && v.y == line.y){
              v.c_svg.classList.remove("vertex");
              v.c_svg.classList.add("vertex_hover");
            }
          });
  
          source.form.c_points.map((v) => {
            if(v.x == line.x && v.y == line.y){
              v.c_svg.style.color = "gray";
              v.c_svg.classList.remove("vertex");
              v.c_svg.classList.add("vertex_hover");
            }
          });
  
            line.dest_x = e.clientX;
            line.dest_y = e.clientY;
            line.redraw();
        } 
        else if (state == "resizing") {
            // pos = source.form.vertex.indexOf(cp);

            deltaX = e.offsetX - dx;
            deltaY = e.offsetY - dy;

            dx = e.offsetX;
            dy = e.offsetY;

            // cp = source;
            source.form.resize(pos, deltaX, deltaY);
            // var links = _Register.getAllLinksByComponent(source);
            // links.map(({ source, line }) => {
            //   if (cp == source) {
            //       cp.form.c_points.map((pnt) => {
            //       if (pnt.x == line.x && pnt.y == line.y) {
            //           line.x += deltaX;
            //           line.y += deltaY;
            //           line.redraw();
            //       }
            //       });
            //   } else {
            //       cp.form.c_points.map((pnt) => {
            //       if (pnt.x == line.dest_x && pnt.y == line.dest_y) {
            //           line.dest_x += deltaX;
            //           line.dest_y += deltaY;
            //           line.redraw();
            //       }
            //       });
            //   }
            //   });
            source.form.redraw();
        }
      }
    },
  },
  mouseUpCb: function mouseupcb(e) {
    var destination;
    if (state == "drawing_link") {
      id = e.srcElement.id;
      var pnt = _Register.find(id);

      if (pnt != undefined && pnt.parent != undefined) {
        destination = _Register.find(pnt.parent);

        line.dest_x = pnt.x;
        line.dest_y = pnt.y;

        // for automatic redrawing
        line.redraw();
        new Link(source, destination, line);
      } else if (id == "svg" || pnt.parent == undefined) {
        var ref = document.getElementById(line.uuid);
        ref.remove();
      }
    }
    state = "";
  },
  mouseOverCb: function mouseovercb(e) {
    id = e.srcElement.id;

    cp = _Register.find(id);

    if (cp.parent == undefined) {
      cp.form.vertex.map((v) => {
        v.c_svg.classList.remove("vertex");
        v.c_svg.classList.add("vertex_hover");
      });

      cp.form.c_points.map((v) => {
        v.c_svg.style.color = "gray";
        v.c_svg.classList.remove("vertex");
        v.c_svg.classList.add("vertex_hover");
      });
    }
  },
  mouseLeaveCb: function mouseleavecb(e) {
    // id = e.srcElement.id;
    // cp = _Register.find(id);
    // if (cp.parent == undefined) {
    //   cp.form.vertex.map((v) => {
    //     v.c_svg.classList.add("vertex");
    //     v.c_svg.classList.remove("vertex_hover");
    //   });
    //   cp.form.c_points.map((v) => {
    //     v.c_svg.classList.add("vertex");
    //     v.c_svg.classList.remove("vertex_hover");
    //   });
    // }
  }
}
}
var events = nativeEvents();

export { events };
