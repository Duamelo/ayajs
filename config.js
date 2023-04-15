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
        fill : "black",
        strokeWidth : "1pt",
        strokeDasharray : "4"
    },
    link: {
	type: "broke",
        end_start : "triangle",
        end_dest : "triangle",
    },
    text : {
        fill : "black",
        fontfamily: "helvetica",
        fontsize: 15,
        fillOpacity : "100",
        stroke : "black",
        strokeWidth : "0.5pt",
        strokeOpacity : 100,
        strokeDasharray : 10.5,
        strokeDashoffset : 10.5,
    },
    ends : {
        tri: {
            h: 10,
            base: 10,
        },
        circle: {
            r: 10
        },
        lozenge: {

        },
	minspace: 10
    },
    linkcb: null
}

export {config};
