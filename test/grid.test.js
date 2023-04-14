QUnit.module("Grid")
let createdElements = []
// let document = {
//   createElementNS(namespace,tagName){
//     createdElements.push({tagName});
//     return {
//       appendChild(child){},
//       setAttribute(name,value){
//         createdElements[createdElements.length - 1][name] = value;
//       }
//     }
//   }
// }
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// {
//   setAttribute(name,value){},
//   appendChild(child){}
// }

QUnit.test("Grid without svg throws an exception", assert => {
  assert.throws(
    function() {
      new Grid();
    },
    "missing parameter"
  );
});


QUnit.test("Grid without definition use default cell size values", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg);
  assert.equal(grid.cellW, 40, "Cell width");
  assert.equal(grid.cellH, 40, "Cell height");
});

QUnit.test("Grid without definition use default cell subdivisions values", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg);
  assert.equal(grid.subdivisionX, 2, "Cell Subdivision");
  assert.equal(grid.subdivisionY, 2, "Cell Subdivision");
});


QUnit.test("Grid without definition has white background", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg);
  assert.equal(grid.bgColor, 'white', "Background color");
});

QUnit.test("Grid without definition has gray lines", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg);
  assert.equal(grid.lineColor, 'gray', "Line Color");
});

QUnit.test("Grid without definition has default lines thicness", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg);
  assert.equal(grid.lineThicness, 0.5, "Line thicness");
});

QUnit.test("Grid use user cell definition when provided", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg, 50, 30);
  assert.equal(grid.cellW, 50, "Cell width");
  assert.equal(grid.cellH, 30, "Cell height");
});

QUnit.test("Grid can use subdivision provided by user", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg, 50, 30, 2, 6);
  assert.equal(grid.subdivisionX, 2, "Cell Subdivision");
  assert.equal(grid.subdivisionY, 6, "Cell Subdivision");
});

QUnit.test("Grid uses passed background color", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg, 40, 20, 4, 6, 'blue', 'red');
  assert.equal(grid.bgColor, 'blue', "Background Color");
});

QUnit.test("Grid uses given lines color", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg, 40, 20, 4, 6, 'gray', 'red');
  assert.equal(grid.lineColor, 'red', "Line Color");
});

QUnit.test("Grid uses given line thicness", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg, 40, 20, 4, 6, 'gray', 'red', 1);
  assert.equal(grid.lineThicness, 1, "Line thicness");
});

QUnit.test("Grid is filled with pattern", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  new Grid(svg, 40, 20, 4, 6, 'gray', 'red');
  let gridRect = svg.getElementById("gridRect");
  assert.equal(gridRect.getAttribute("fill"), "url(#patternId)", "cell fill");
})

QUnit.test("Grid rect is proportional to pattern sizeis filled with pattern", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  new Grid(svg, 40, 20, 4, 6, 'gray', 'red');
  let gridRect = svg.getElementById("gridRect");
  assert.equal(gridRect.getAttribute("width"), "100%", "cell width");
  assert.equal(gridRect.getAttribute("height"), "100%", "cell height");
  assert.equal(gridRect.getAttribute("fill"), "url(#patternId)", "cell fill");
})

QUnit.test("Grid Cell pattern is filled with pattern", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg);
  let pattern = svg.getElementById("patternId");
  let rect = pattern.querySelector("rect");
  assert.ok(pattern, "pattern")
  assert.equal(pattern.getAttribute("width"), grid.cellW, "cell width");
  assert.equal(pattern.getAttribute("height"), grid.cellH, "cell height");
  assert.equal(pattern.getAttribute("patternUnits"), "userSpaceOnUse", "cell pattern units");
  assert.equal(rect.getAttribute("fill"), "url(#subpatternId)", "cell fill");
  // assert.equal(pattern.id,"patternId");
});

QUnit.test("Grid pattern contain rect with the given border color, and thicness", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg, 40, 20, 4, 6, 'white', 'red', 0.2);
  let pattern = svg.getElementById("patternId");
  let rect = pattern.querySelector("rect");
  assert.equal(rect.getAttribute("width"), "100%", "rect fill cell horizontaly");
  assert.equal(rect.getAttribute("height"), "100%", "rect fill cell verticaly");
  assert.equal(rect.getAttribute("stroke"), grid.lineColor, "rect color");
  assert.equal(rect.getAttribute("stroke-width"), grid.lineThicness, "rect thicness");
})


QUnit.test("Grid also create sub pattern when required", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg);
  let pattern = svg.getElementById("subpatternId");
  assert.ok(pattern, "pattern")
  assert.equal(pattern.getAttribute("patternUnits"), "userSpaceOnUse", "cell pattern units");
  assert.equal(pattern.getAttribute("width"), grid.cellW / grid.subdivisionX, "sub cell width");
  assert.equal(pattern.getAttribute("height"), grid.cellH / grid.subdivisionY, "sub cell height");
  // assert.equal(pattern.id,"patternId");
});

QUnit.test("subpattern contain rect with the given border color,background color, and thicness", assert => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let grid = new Grid(svg, 40, 20, 4, 6, 'white', 'red', 0.2);
  let pattern = svg.getElementById("subpatternId");
  let rect = pattern.querySelector("rect");
  assert.equal(rect.getAttribute("width"), "100%", "rect fill cell horizontaly");
  assert.equal(rect.getAttribute("height"), "100%", "rect fill cell verticaly");
  assert.equal(rect.getAttribute("fill"), grid.bgColor, "rect color");
  assert.equal(rect.getAttribute("stroke"), grid.lineColor, "rect color");
  assert.equal(rect.getAttribute("stroke-width"), grid.lineThicness / 2, "rect thicness");
})