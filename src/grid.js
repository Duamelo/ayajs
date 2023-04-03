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

    const subpattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    subpattern.setAttribute("id", "subpatternId");
    subpattern.setAttribute("width", this.cellW / this.subdivisionX);
    subpattern.setAttribute("height", this.cellH / this.subdivisionY);
    subpattern.setAttribute("patternUnits", "userSpaceOnUse");
    const subpatternRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    subpatternRect.setAttribute("width", "100%");
    subpatternRect.setAttribute("height", "100%");
    subpatternRect.setAttribute("height", "100%");
    subpatternRect.setAttribute("fill", this.bgColor);
    subpatternRect.setAttribute("stroke", this.lineColor);
    subpatternRect.setAttribute("stroke-width", this.lineThicness / 2);
    subpattern.append(subpatternRect );
    svg.append(subpattern);

    const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    pattern.setAttribute("id", "patternId");
    pattern.setAttribute("width", this.cellW);
    pattern.setAttribute("height", this.cellH);
    pattern.setAttribute("patternUnits", "userSpaceOnUse");
    const patternrect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    patternrect.setAttribute("width", "100%");
    patternrect.setAttribute("height", "100%");
    patternrect.setAttribute("fill", "url(#subpatternId)");
    patternrect.setAttribute("stroke", this.lineColor);
    patternrect.setAttribute("stroke-width", this.lineThicness);
    pattern.append(patternrect );
    svg.append(pattern);

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("id", "gridRect");
    rect.setAttribute("fill", "url(#patternId)");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    svg.append(rect);

    console.log(svg)
  }
}










// const SVGNS = "http://www.w3.org/2000/svg"

// function createRect(fill, stroke, strokeWidth) {
//   const rect = document.createElementNS(SVGNS, "rect");
//   rect.setAttribute("width", "100%");
//   rect.setAttribute("height", "100%");
//   rect.setAttribute("fill", fill);
//   rect.setAttribute("stroke", stroke);
//   rect.setAttribute("stroke-width", strokeWidth);
//   return rect;
// };

// function createCellPattern(id, side, fill, stroke, strokeWidth) {
//   const pattern = document.createElementNS(SVGNS, "pattern");
//   pattern.setAttribute("id", id);
//   pattern.setAttribute("width", side);
//   pattern.setAttribute("height", side);
//   pattern.appendChild(createRect(fill, stroke, strokeWidth))
//   return pattern;
// };
// function createGridPattern(id, cellPatternId, side, stroke, strokeWidth) {
//   const pattern = document.createElementNS(SVGNS, "pattern");
//   pattern.setAttribute("id", id);
//   pattern.setAttribute("width", side);
//   pattern.setAttribute("height", side);
//   pattern.appendChild(createRect("url(#" + cellPatternId + ")", stroke, strokeWidth))
//   return pattern;
// };

// function createGridElements(cellPatternId, gridPatternId, height, width, cellSide, subcellCount, thickness, bgColor, borderColor) {
//   const cellPattern = createCellPattern(cellPatternId, cellSide / subcellCount, bgColor, borderColor, thickness / 2);
//   const gridPattern = createGridPattern(gridPatternId, cellPatternId, cellSide, borderColor, thickness);
//   const grid = document.createElementNS(SVGNS, "rect");
//   grid.setAttribute("height", height);
//   grid.setAttribute("width", width);
//   grid.setAttribute("fill", "url(#" + gridPatternId + ")");

//   return [cellPattern, gridPattern, grid];
// }
