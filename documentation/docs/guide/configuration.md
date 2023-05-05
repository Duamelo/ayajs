# Configuration

<p>
    Without any configuration, the aya svg is squared on 1343 times 1343.
    You can change the size of the svg when calling the Init() constructor by passing the width and height of the svg.
</p>

## modifying the size of the svg

```js
    var aya = aya.Init(500, 500);
```
##  removing the default grid from the svg

```js
  aya.grid.remove();
```

## config file

<p>
    For a better flexibility of usage, aya has a configuration file allowing to specify the parameters for each form.
    This file looks like this:
</p>

```js
var config =  {
    svg : null,

    form : {
        stroke : "black",
        fill : "white",
        strokeOpacity : "1",
        strokeWidth : "1px",
        fillOpacity : "1",
        limitWidth: 20,
        limitHeight: 20
    },

    arc : {
        stroke : "black",
        fill : "white",
        strokeOpacity : "1",
        strokeWidth : "1px",
        fillOpacity : "1",
        limitWidth: 20,
        limitHeight: 20
    },

    box : {
        stroke : "indigo",
        strokeWidth : "2px",
        fill : "none",
        strokeDasharray : "4"
    },

    point : {
        fill  : "black",
        strokeWidth : "1pt",
        radius : 3,
    },

    line : {
        stroke: "black",
        fill : "white",
        strokeWidth : "1px",
        strokeDasharray : "4",
        strokelinejoin: "round"
    },
    link: {
	    type: "broke",
        end_start : "cirle",
        end_dest : "triangle",
    },
    text : {
        fill : "black",
        fontfamily: "sans-serif",
        fontstyle: "normal", // normal || italic || oblic
        fontsize: "medium", // smaller || value in em unit
        fontweight: "normal", // normal || bold || bolder || lighter
        size: 100,
        textanchor: "middle",  //start || middle || end 
    },
    ends : {
        tri: {
            h: 8,
            base: 8,
            fill: "black",
            stroke: "black",
            strokeWidth: "1px"
        },
        circle: {
            r: 3.5,
            fill: "white",
            stroke: "black",
            strokeWidth: "1px"
        },
        lozenge: {

        },
	minspace: 10
    },
    linkcb: null
}

export {config};
```

<p>
    If you want to change the basic configurations, as changing the ends of the line component, 
you can do it by accessing the config property of the Init class in this way:
</p>

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="application/javascript"  src="path_to/build/aya.js"></script>
    <title>aya demo</title>
</head>
<body>
    <script>
        var aya = new aya.Init();

       aya.config.link.end_start = "";
       aya.config.link.end_dest = "";

       var line = aya.Component("line", {x: 100, y: 100, dest_x: 500, dest_y: 200});
      
       document.body.append(aya.svg);
    </script>
</body>
</html>
```

