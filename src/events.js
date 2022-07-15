import { Line } from "./entities/line.js";
import { _Register } from "./register.js";
import { _uuid } from "./entities/uuid.js";
import { Link } from "./entities/link.js";


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
        console.log(cp);
  
        // Only the points have the ref property to refer to form that instantiates them.
        // In source we have the component instance created.
        if (id != this.id_svg)
          source = cp != undefined && cp.ref != undefined ? _Register.find(cp.ref) : cp;
  
        if(cp == undefined)
          return;
        if(cp.form != undefined)
          lk = _Register.findAllLink(cp);
        console.log("lk");
        console.log(lk);


        // The displacement of the form is triggered when the mousedown is done on the form, and neither on the point nor the svg.
        if ((cp != undefined && cp.ref == undefined) )
            state = "moving";
        else {
          // Resizing is triggered when the mousedown takes place on one of the summits.
          if (  (source.form.vertex != undefined) && (pos = source.form.vertex.indexOf(cp)) >= 0) {
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
            console.log("state = drawing_link");

            id = _uuid.generate();
            if (cp != source) {
              line = new Line( id_svg, svg, null, config, id, cp.x, cp.y);
              line.draw();
            }
          }
        }
      },
      mouseMoveCb: function movecb(e) {

        if (state == "moving") {

          console.log("state = moving");
  
          deltaX = e.offsetX - dx;
          deltaY = e.offsetY - dy;
  
          dx = e.offsetX;
          dy = e.offsetY;

          // Ensure cp is a component
          var src, sink;
          if(cp.form != undefined){
            lk.map((link) => {
              cp.form.c_points.map( (point) => {
                if(point == link.source)
                  src = point;
                else if(point == link.destination)
                  sink = point;
              });
              if(sink) {
                console.log("dest");
                console.log(sink);
                link.line.dest_x += deltaX;
                link.line.dest_y += deltaY;

                link.redraw();
              }
              else{
                link.line.x += deltaX;
                link.line.y += deltaY;

                link.redraw();
              }
            });
            cp.form.shift(deltaX, deltaY);
            cp.form.redraw();
            lk.map( (link) => {
              link.redraw();
            });
          }
        }
        else if (state == "drawing_link") {
          line.dest_x = e.clientX;
          line.dest_y = e.clientY;
          line.redraw();
        }
        else if (state == "resizing") {
            deltaX = e.offsetX - dx;
            deltaY = e.offsetY - dy;
  
            dx = e.offsetX;
            dy = e.offsetY;
  
            source.form.resize(pos, deltaX, deltaY);
            source.form.redraw();
  
            lk.map( (link ) => {
              link.redraw();
            });
        }
      },
      mouseUpCb: function mouseupcb(e) {
        if (state == "drawing_link") {
          id = e.srcElement.id;
          var pnt = _Register.find(id);
          
          if (pnt != undefined && pnt.ref != undefined) {
            line.dest_x = pnt.x;
            line.dest_y = pnt.y;
  
            var link = new Link(cp, pnt, line);
            link.redraw();
          }
          else if (id == id_svg || pnt.ref == undefined) {
            var ref = document.getElementById(line.uuid);
            line.children.map( ({child}) => {
              var rf = document.getElementById(child.uuid);
              rf.remove();
            });
            line.vertex.map( (point) => {
              var rf = document.getElementById(point.uuid);
              rf.remove();
            })
            ref.remove();
          }
        }
        // else if(state == "resizing" && source.type == 'line'){
        //   console.log("mouseup");
        //   id = e.srcElement.id;

        //   var pnt = _Register.find(id);

        //   if(pnt.ref){/* this is a form's connection point*/
        //     var cp = _Register.find(pnt.ref);
        //     console.log("pnt.ref != undefined");

        //     if(point.x == source.form.x){
        //       console.log("source.form.x == point.x");
        //       source.form.x = pnt.x;
        //       source.form.y = pnt.y;
        //     }
        //     else if(point.x == source.form.dest_x){
        //       console.log("source.form.dest_x == point.x");
        //       source.form.dest_x = pnt.x;
        //       source.form.dest_y = pnt.y;
        //     }
        //     new Link(point, pnt, source.form).redraw();
        //   }
        // }
        state = "";
      },
      mouseOverCb: function mouseovercb(e){

        id = e.srcElement.id;

        id_store.push(id);
  
        var local_cp = _Register.find(id);

        if(local_cp == undefined)
          return;
        if(local_cp.form.type == "line"){
          local_cp.form.c_svg.setAttribute("class", "move");
          local_cp.form.vertex.map((vt) =>{
            vt.c_svg.setAttribute("class", "default");
          });
        }
        else {
          if(local_cp.form != undefined){
            local_cp.form.c_svg.setAttribute("class", "move");
            local_cp.form.c_points.map( (point) => {
              point.c_svg.setAttribute("class", "show_point");
            });
            local_cp.form.vertex.map( (vertex, index) => {
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
              component.form.c_points.map( (point) => {
                point.c_svg.setAttribute("class", "hidden_point");
              });
              component.form.vertex.map( (vertex) => {
                vertex.c_svg.setAttribute("class", "hidden_point");
              });
            }, 5000);
          })
      }
    }
  }
}
export { Events };