import { Line } from "./entities/line.js";
import { _Register } from "./register.js";
import { _uuid } from "./entities/uuid.js";
import { Link } from "./entities/link.js";
import { Point } from "./entities/point.js";
import { Circle } from "./entities/circle.js";


function nativeEvents() {
  var id;
  var cp;
  var dx, dy;
  var state = "";
  var deltaX, deltaY;
  var line = "";
  var source;
  var lk;
  var pos;

  return {
    mouseDownCb: function mousedowncb(e) {
      dx = e.offsetX;
      dy = e.offsetY;

      id = e.srcElement.id;

      cp = _Register.find(id);

      if (id != "svg")

        source = cp != undefined && cp.ref != undefined ? _Register.find(cp.ref) : cp;

      if(cp.form != undefined)
        lk = _Register.getAllLinksByComponent(cp);

      // une forme différente de Point n'a pas de propriété ref
      if ((cp != undefined && cp.ref == undefined) ) 
          state = "moving";
      else {
        if (  (source.form.vertex != undefined) && (pos = source.form.vertex.indexOf(cp)) >= 0) {
          state = "resizing";
          dx = e.offsetX;
          dy = e.offsetY;
        } 
        else {
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
      if (state == "moving") {
        deltaX = e.offsetX - dx;
        deltaY = e.offsetY - dy;

        dx = e.offsetX;
        dy = e.offsetY;

        if(cp.form != undefined){
          lk.map(({ source, line }) => {
            if (cp == source) {
              cp.form.c_points.map((pnt) => {
                if (pnt.x == line.x && pnt.y == line.y) {
                  line.x += deltaX;
                  line.y += deltaY;
                  line.redraw();
                }
              });
            } 
            else {
              cp.form.c_points.map((pnt) => {
                if (pnt.x == line.dest_x && pnt.y == line.dest_y) {
                  line.dest_x += deltaX;
                  line.dest_y += deltaY;
                  line.redraw();
                }
              });
            }
          });
        }
        if(cp.form != undefined && cp.form.children.length > 0){
          cp.form.children.map( (child) => {
            console.log("children resizing");
            if(child instanceof Line){
              child.shift(deltaX, deltaY);
              child.dest_x += deltaX;
              child.dest_y += deltaY;
              child.redraw();
            }
            else if(child instanceof Circle){
              child.shift(deltaX, deltaY);
              child.redraw();
            }
          });
          
          if(cp.type == "rectangle" || cp.type == "triangle" || cp.type == "losange") {
            if(cp.type == "losange")
              cp.form.redrawLineConnector();
            cp.form.shift(deltaX, deltaY);
            cp.form.redraw();
          }
          else if(source.type == "circle") {
            cp.form.x += deltaX;
            cp.form.y += deltaY;
            
            cp.form.drawVertex();
            cp.form.drawConnector();
            cp.form.redrawLineConnector();
            cp.form.redraw();
          }
          cp.form.shift(deltaX, deltaY);
          cp.form.redraw();
        }
        // il s'agit d'une form pas d'une instance de la classe Component ou de Point
        if(cp.form  == undefined && cp.ref == undefined){

          if(cp instanceof Line){
            cp.shift(deltaX, deltaY);

            cp.dest_x += deltaX;
            cp.dest_y += deltaY;

            cp.redraw();
          }
          else {
            cp.shift(deltaX, deltaY);
            cp.redraw();
          }
        }
        
      } 
      else if (state == "drawing_link") {
        console.log(state);
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
      } 
      else if (state == "resizing") {
        if (source.type == "rectangle") {
          deltaX = e.offsetX - dx;
          deltaY = e.offsetY - dy;

          dx = e.offsetX;
          dy = e.offsetY;

          source.form.resize(pos, deltaX, deltaY);
          source.form.redraw();
        } 
        else if (source.type == "triangle") {
          console.log("triangle is moving");

          if (prev_pos == 0 && pos == -1) {
            pos += 1;
          } else if (prev_pos == 1 && pos == -1) {
            pos += 2;
          } else if (prev_pos == 2 && pos == -1) {
            pos += 3;
          }
          // console.log(pos);
          // console.log(prev_pos);
          dx = e.offsetX;
          dy = e.offsetY;

          source.form.resize(pos, dx, dy);
          source.form.redraw();
          prev_pos = pos;
        } 
        else if (source.type == "circle") {
          console.log(pos);
          console.log(`circle is  ${state}`);
          //console.log(source.form);
          deltaX = e.offsetX - dx;
          dx = e.offsetX;
          source.form.resize(pos,deltaX);
          source.form.redrawLineConnector();
          source.form.redraw();
        }
        else if (source.type == "losange") {
          //console.log(pos);
          deltaX = e.offsetX - dx;
          deltaY = e.offsetY - dy;
          dx = e.offsetX;
          dy = e.offsetY;
          if(pos == 0 || pos == 2) {
            source.form.resize(pos,deltaY);
          } 
          else if(pos == 1 || pos == 3){
            source.form.resize(pos,deltaX);
          }
          source.form.redrawLineConnector();
          source.form.redraw();
        }
      }
    },
    mouseUpCb: function mouseupcb(e) {
      var destination;
      if (state == "drawing_link") {
        id = e.srcElement.id;
        var pnt = _Register.find(id);

        if (pnt != undefined && pnt.ref != undefined) {
          destination = _Register.find(pnt.ref);

          line.dest_x = pnt.x;
          line.dest_y = pnt.y;

          // for automatic redrawing
          line.redraw();
          new Link(source, destination, line);
        }
        else if (id == "svg" || pnt.ref == undefined) {
          var ref = document.getElementById(line.uuid);
          ref.remove();
        }
      }
      state = "";
    },
    mouseOverCb: function mouseovercb(e) {
      id = e.srcElement.id;

      cp = _Register.find(id);

      if (cp instanceof Point) {
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
