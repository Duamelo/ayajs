import { _Register } from "./register.js";
import { _uuid } from "./entities/uuid.js";
import { Link } from "./entities/link.js";
import { Component } from "./component.js";


class Events {

  static setup = (svg, id_svg, config)=>{
    var id;
    var cp;
    var point;
    var dx, dy;
    var state = "";
    var deltaX, deltaY;
    var line = "";
    var source;
    var lk;
    var pos;
    var svg = svg;
    var id_svg = id_svg
    var config = config;
    var id_store = [];
  
    return {
      mouseDownCb: function mousedowncb(e) {
  
        dx = e.offsetX;
        dy = e.offsetY;
  
        id = e.srcElement.id;
  
        cp = _Register.find(id);
  
        // Only the points have the ref property to refer to form that instantiates them.
        // In source we have the component instance created.
        if (id != this.id_svg)
          source = cp != undefined && cp.ref != undefined ? _Register.find(cp.ref) : cp;
  
        if(cp == undefined)
          return;
        if(cp.shape != undefined)
          lk = _Register.findAllLink(cp);

        // The displacement of the form is triggered when the mousedown is done on the form, and neither on the point nor the svg.
        if ((cp != undefined && cp.ref == undefined) )
            state = "moving";
        else {
          // Resizing is triggered when the mousedown takes place on one of the summits.
          if (  (source.shape.vertex != undefined) && (pos = source.shape.vertex.indexOf(cp)) >= 0) {
            state = "resizing";
            dx = e.offsetX;
            dy = e.offsetY;
            
            // component determination 
            point = cp;
            cp = _Register.find(cp.ref);
            if(cp.type != 'line')
              lk = _Register.findAllLink(cp);

          }
          else {
            /**
             * If the mousedown was not done on the svg, neither on a top nor on the form, then it was certainly done on a connection point.
             * In this case, we start tracing a link.
             */
            state = "drawing_link";

            id = _uuid.generate();
            if (cp != source)
              line = new Component("line", {x: cp.x, y: cp.y}, svg, source.shape.nativeEvent, config);
          }
        }
      },
      mouseMoveCb: function movecb(e) {

        if (state == "moving") {

          deltaX = e.offsetX - dx;
          deltaY = e.offsetY - dy;
  
          dx = e.offsetX;
          dy = e.offsetY;

          // Ensure cp is a component
          var src, dest;
          if(cp.shape != undefined){
            lk.map((link) => {
              cp.shape.c_points.map( (point) => {
                if(point == link.source)
                  src = point;
                else if(point == link.destination)
                  dest = point;
              });
              if(dest) {

                link.line.dest_x = dest.x;
                link.line.dest_y = dest.y;

                link.redraw();
              }
              else{

                link.line.x = src.x;
                link.line.y = src.y;

                link.redraw();
              }
            });
            cp.shape.shift(deltaX, deltaY);
            cp.shape.redraw();
            lk.map((link) => {
              link.redraw();
            });
          }
        }
        else if (state == "drawing_link") {
          line.shape.dest_x = e.clientX;
          line.shape.dest_y = e.clientY;
          line.shape.redraw();
        }
        else if (state == "resizing") {
            deltaX = e.offsetX - dx;
            deltaY = e.offsetY - dy;
  
            dx = e.offsetX;
            dy = e.offsetY;
  
            source.shape.resize(pos, deltaX, deltaY);
            source.shape.redraw();
  
            lk.map((link ) => {
              link.redraw();
            });
        }
      },
      mouseUpCb: function mouseupcb(e) {
        if (state == "drawing_link") {
          id = e.srcElement.id;
          var pnt = _Register.find(id);

          if (pnt && !pnt.grid && pnt.x == line.x){
            var ref = document.getElementById(line.shape.uuid);
            ref.remove();
            return;
          }          
          if (pnt && pnt.ref) {
            line.shape.dest_x = pnt.x;
            line.shape.dest_y = pnt.y;
  
            var link = new Link(cp, pnt, line.shape, svg, config);
            link.redraw();
          }
          else{
            var ref = document.getElementById(line.shape.uuid);
            line.shape.children.map(({child}) => {
              var rf = document.getElementById(child.uuid);
              rf.remove();
            });
            line.shape.vertex.map((point) => {
              var rf = document.getElementById(point.uuid);
              rf.remove();
            })
            ref.remove();
          }
        }
        state = "";
      },
      mouseOverCb: function mouseovercb(e){

        id = e.srcElement.id;

        id_store.push(id);
  
        var local_cp = _Register.find(id);

        if(local_cp == undefined)
          return;
        if(local_cp.shape.type == "line"){
          local_cp.shape.c_svg.setAttribute("class", "move");
          local_cp.shape.vertex.map((vt) =>{
            vt.c_svg.setAttribute("class", "default");
          });
        }
        else {
          if(local_cp.shape != undefined){
            local_cp.shape.c_svg.setAttribute("class", "move");
            local_cp.shape.c_points.map( (point) => {
              point.c_svg.setAttribute("class", "show_point");
            });
            local_cp.shape.vertex.map( (vertex, index) => {
              vertex.c_svg.setAttribute("class", "show_point");
              if(index == 0)
                vertex.c_svg.setAttribute("class", "resize_left_top");
              else if(index == 1)
                vertex.c_svg.setAttribute("class", "resize_right_top");
              else if(index == 2)
                vertex.c_svg.setAttribute("class", "resize_right_bottom");
              else if(index == 3)
                vertex.c_svg.setAttribute("class", "resize_left_bottom");
            });
          }
        }
      },
      mouseLeaveCb: function mouseleavecb(e){
          var components = _Register.findAllComponents();

          components.map( async (component) => {
            setTimeout(()=> {
              component.shape.c_points.map( (point) => {
                point.c_svg.setAttribute("class", "hidden_point");
              });
              component.shape.vertex.map( (vertex) => {
                vertex.c_svg.setAttribute("class", "hidden_point");
              });
            }, 5000);
          })
      }
    }
  }
}
export { Events };