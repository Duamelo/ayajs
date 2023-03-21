var config =  {
    svg : {
        fill : "white",
    },
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
        fill : "black",
        type: "broke",
        ends : {
            start : { type : "triangle"},
            dest : { type : "triangle"},
	    h_dx: 10,
	    h_dy: 4,
	    v_dx: 5,
	    v_dy: 8
        },
        strokeWidth : "1pt",
        strokeDasharray : "4"
    },

    text : {
        fill : "black",
        fillOpacity : "100",
        stroke : "black",
        strokeWidth : "0.5pt",
        strokeOpacity : 100,
        strokeDasharray : 10.5,
        strokeDashoffset : 10.5,
    },

    linkcb: null
}

export {config};
