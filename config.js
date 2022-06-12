var config =  {
    svg : {
        fill : "white",
    },
    form : {
        stroke : "black",
        fill : "white",
        strokeOpacity : "1",
        strokeWidth : "1.5pt",
        fillOpacity : "1"
    },
  
    box : {
        stroke : "black",
        strokeWidth : "1px",
        fill : "none",
        strokeDasharray : "4"
    },

    point : {
        fill  : "black",
        strokeWidth : "1pt",
        radius : 3,
    },

    line : {
        fill : "black",
        ends : {
            left : { type : "lozenge", props : {x : 0 , y : 0 , width : 10, height : 10}},
            right : { type : "triangle", props : {x1 : 0 , y1 : 0 , x2 : 10, y2 : 5, x3 : 0, y3 : 10}}
        }
    },

    text : {
        fill : "blue",
        fillOpacity : "100",
        stroke : "black",
        strokeWidth : "0.5pt",
        strokeOpacity : 100,
        strokeDasharray : 10.5,
        strokeDashoffset : 10.5,
    }
}

export {config};