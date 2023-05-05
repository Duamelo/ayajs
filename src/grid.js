class Grid {
  constructor(svg, cellW = 40, cellH = 40, subdivisionX = 2, subdivisionY = 2,
    bgColor = 'white', lineColor = 'gray', lineThicness = 0.2) {
    if (svg == undefined) {
      throw "missing parameter"
    }
    this.cellW = cellW;
    this.cellH = cellH;
    this.subdivisionX = subdivisionX;
    this.subdivisionY = subdivisionY;
    this.bgColor = bgColor;
    this.lineColor = lineColor;
    this.lineThicness = lineThicness;
      this.svg = svg;
      
    this.subpattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    this.subpattern.setAttribute("id", "subpatternId");
    this.subpattern.setAttribute("width", this.cellW / this.subdivisionX);
    this.subpattern.setAttribute("height", this.cellH / this.subdivisionY);
    this.subpattern.setAttribute("patternUnits", "userSpaceOnUse");
    
    this.subpatternRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.subpatternRect.setAttribute("width", "100%");
    this.subpatternRect.setAttribute("height", "100%");
    this.subpatternRect.setAttribute("height", "100%");
    this.subpatternRect.setAttribute("fill", this.bgColor);
    this.subpatternRect.setAttribute("stroke", this.lineColor);
    this.subpatternRect.setAttribute("stroke-width", this.lineThicness / 2);
    this.subpattern.append(this.subpatternRect );
    this.svg.append(this.subpattern);

    this.pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");

    this.pattern.setAttribute("id", "patternId");
    this.pattern.setAttribute("width", this.cellW);
    this.pattern.setAttribute("height", this.cellH);
    this.pattern.setAttribute("patternUnits", "userSpaceOnUse");
   
    this.patternrect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
   
    this.patternrect.setAttribute("width", "100%");
    this.patternrect.setAttribute("height", "100%");
    this.patternrect.setAttribute("fill", "url(#subpatternId)");
    this.patternrect.setAttribute("stroke", this.lineColor);
    this.patternrect.setAttribute("stroke-width", this.lineThicness);
    this.pattern.append(this.patternrect );
    this.svg.append(this.pattern);

    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");   
    this.rect.setAttribute("id", "gridRect");
    this.rect.setAttribute("fill", "url(#patternId)");
    this.rect.setAttribute("width", "100%");
    this.rect.setAttribute("height", "100%");
    this.svg.append(this.rect);

    this.subpattern.addEventListener("mousemove", ()=>{});
    this.subpattern.addEventListener("mouseup", ()=>{});
    this.subpatternRect.addEventListener("mousemove", ()=>{});
    this.subpatternRect.addEventListener("mouseup", ()=>{});
    this.pattern.addEventListener("mousemove", ()=>{});
    this.pattern.addEventListener("mouseup", ()=>{});

    this.patternrect.addEventListener("mousemove", ()=>{});
    this.patternrect.addEventListener("mouseup", ()=>{});
    this.rect.addEventListener("mousemove", ()=>{});
    this.rect.addEventListener("mouseup", ()=>{});
  }

  redraw(){
    this.subpattern.setAttribute("width", this.cellW / this.subdivisionX);
    this.subpattern.setAttribute("height", this.cellH / this.subdivisionY);

    this.subpatternRect.setAttribute("width", "100%");
    this.subpatternRect.setAttribute("height", "100%");
    this.subpatternRect.setAttribute("fill", this.bgColor);
    this.subpatternRect.setAttribute("stroke", this.lineColor);
    this.subpatternRect.setAttribute("stroke-width", this.lineThicness / 2);

    this.pattern.setAttribute("id", "patternId");
    this.pattern.setAttribute("width", this.cellW);
    this.pattern.setAttribute("height", this.cellH);

    this.patternrect.setAttribute("width", "100%");
    this.patternrect.setAttribute("height", "100%");
    this.patternrect.setAttribute("fill", "url(#subpatternId)");
    this.patternrect.setAttribute("stroke", this.lineColor);
    this.patternrect.setAttribute("stroke-width", this.lineThicness);

    this.rect.setAttribute("id", "gridRect");
    this.rect.setAttribute("fill", "url(#patternId)");
    this.rect.setAttribute("width", "100%");
    this.rect.setAttribute("height", "100%");
  }

    remove(){
	this.svg.removeChild(this.subpattern);
	this.svg.removeChild(this.pattern);
	this.svg.removeChild(this.rect);
    }
}
export {Grid};
