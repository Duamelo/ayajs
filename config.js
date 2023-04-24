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
