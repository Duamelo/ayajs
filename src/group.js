import { _uuid } from "./entities/uuid";
import { FactoryForm } from "./factoryForm";
import { _Register } from "./register";


class Group
{
    constructor(children = []){
        this.uuid = _uuid.generate();
        this.children = children;
        this.g_svg = "";
    }


    draw(svgs){
        const svgns = "http://www.w3.org/2000/svg";
        this.g_svg = document.createElementNS(svgns, "g");
    
        this.g_svg.setAttributeNS(null, "id", this.uuid);

        this.children.map((chd) => {
            var child = FactoryForm.createForm(_uuid.generate(), chd.type, chd.props, chd.events);
            child.draw(this.g_svg);
        });

        svgs.appendChild(this.g_svg);
    }
}
export {Group};