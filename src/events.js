import { _Register } from "./register.js";
import { _uuid } from "./uuid.js";
import { Line } from "./entities/line.js";
import { Link } from "./entities/link.js";

class Events {
  static source = null;
  static line = null;
  static current_vertex;
  static current_cpoint;
  static state = null;
  static dx = null;
  static dy = null;

  static mousedowncb(e) {  
    var id, cp = null;
    id = e.srcElement.id;

    Events.dx = e.offsetX;
    Events.dy = e.offsetY;

    cp = _Register.find(id);

    // Only the points have the ref property to refer to the shape that instantiates them.
    // In source we have the component instance created.
    if (cp)
      Events.source = cp != undefined && cp.ref != undefined ? _Register.find(cp.ref) : cp;

    if(cp == undefined)
      return;
    // The displacement of the shape is triggered
    // when the mousedown is done on the shape, and neither on the point nor the svg.
    if ((cp != undefined && cp.ref == undefined))
      Events.state = "moving";
    else {
      // Resizing is triggered when the mousedown takes place on one of the summits.
      if ((Events.source.shape.vertex != undefined) && (Events.current_vertex = Events.source.shape.vertex.indexOf(cp)) >= 0) {
        Events.state = "resizing";
      }
      else{
        /**
         * If the mousedown was not done on the svg, neither on a top nor on the shape,
         * then it was certainly done on a connection point.
         * In this case, we start tracing a link.
         */

          Events.state = "drawing_link";
          Events.current_cpoint = {x: cp.x, y: cp.y};
          Events.line = new Line(
              _uuid.generate(),
              Events.current_cpoint.x,
              Events.current_cpoint.y,
              Events.current_cpoint.x,
              Events.current_cpoint.y,
              );

          Events.line.draw();
          Events.line.makeHiddenVertex();
      }
    }
    return Events.state;
  }

  static mousemovecb(e) {
    var deltaX = e.offsetX - Events.dx;
    var deltaY = e.offsetY - Events.dy;

    Events.dx = e.offsetX;
    Events.dy = e.offsetY;
    var lk;

    if (Events.state == "moving") {
      var src, dest;
      lk = _Register.findAllLink(Events.source);
      // Ensure Events.source is a component
      if(Events.source.shape != undefined){
        lk.map((link) => {
          Events.source.shape.c_points.map( (point) => {
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
        Events.source.shape.shift(deltaX, deltaY);
        Events.source.shape.redraw();
        lk.map((link) => {
          link.redraw();
        });
      }
    }
    else if (Events.state == "drawing_link") {
      Events.line.dest_x = e.clientX;
      Events.line.dest_y = e.clientY;
      Events.line.redraw();
    }
    else if (Events.state == "resizing") {
      lk = _Register.findAllLink(Events.source);
      Events.source.shape.resize(Events.current_vertex, deltaX, deltaY);
      Events.source.shape.redraw();

      lk.map((link ) => {
        link.shape.redraw();
      });
    }
  }

  static mouseupcb(e) {
      var id = e.srcElement.id;
      if (Events.state == "drawing_link") {
	  var pnt = _Register.find(id);

	  if (pnt && pnt.ref == Events.source.uuid){
        var ref = document.getElementById(Events.line.uuid);
        ref.remove();
        return;
      }
	if (pnt && pnt.ref) {
            Events.line.dest_x = pnt.x;
            Events.line.dest_y = pnt.y;
            var destination = _Register.find(pnt.ref);
	    new Link(
		Events.source.uuid,
		destination.uuid,
		{});
            Events.line.removeFromDOM();
            Events.line = null;
            Events.source = null;
	}
	else{
          var ref = document.getElementById(Events.line.uuid);
          Events.line.children.map(({child}) => {
              var rf = document.getElementById(child.uuid);
              rf.remove();
          });
          Events.line.vertex.map((point) => {
              var rf = document.getElementById(point.uuid);
              rf.remove();
          })
          ref.remove();
      }
    }
      Events.state = "";
  }
  static mouseovercb(e){
    var id = e.srcElement.id;

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
  }
  static mouseleavecb(e){
    var components = _Register.findAllComponents();
    components.map( async (component) => {
      component.shape.c_points.map( (point) => {
        point.c_svg.setAttribute("class", "hidden_point");
      });
      component.shape.vertex.map( (vertex) => {
        vertex.c_svg.setAttribute("class", "hidden_point");
      });
    })
  }
}
export { Events };
