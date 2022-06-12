import { events } from "./events";

function initSvg(id, width, height){

    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("id", id);

    svg.addEventListener("mousemove", events.mouseMoveCb);
    svg.addEventListener("mouseup", events.mouseUpCb);
    
    return svg;
}
export {initSvg};