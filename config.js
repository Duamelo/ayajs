var config =  {
    svg : {
        fill : "white",
    },
    form : {
        stroke : "black",
        fill : "white",
        strokeOpacity : "1",
        strokeWidth : "1.5pt",
        fillOpacity : "1",
        limitWidth: 20,
        limitHeight: 20
    },

    arc : {
        stroke : "black",
        fill : "white",
        strokeOpacity : "1",
        strokeWidth : "1.5pt",
        fillOpacity : "1",
        limitWidth: 20,
        limitHeight: 20
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
            start : { type : "triangle"},
            dest : { type : "triangle"}
        }
    },

    text : {
        fill : "black",
        fillOpacity : "100",
        stroke : "black",
        strokeWidth : "0.5pt",
        strokeOpacity : 100,
        strokeDasharray : 10.5,
        strokeDashoffset : 10.5,
    }
}

export {config};