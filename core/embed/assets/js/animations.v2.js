// Select all buttons within a div with the class name "line_info"
const btns = document.querySelectorAll("div.line_info button")

// Get the SVG element with the ID "metromap_map"
const svg = document.getElementById("metromap_map")

// Get the div with the class name "line_info"
const line_info = document.querySelector("div.line_info")

// Add a click event listener to each button
btns.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
        button = ev.target
        if (button.dataset.line == undefined) {
            button = ev.target.parentNode
        }
        line = button.dataset.line
        // Check if the button is active
        if (btn.classList.contains("active")) {
            // If the button is active, unfocus the line

            // Get all lines that are currently focused
            const activebtns = document.querySelectorAll("div.line_info button.active")

            // If there are no more focused lines, focus all lines
            if (activebtns.length <= 1) {
                svg.classList.remove("focus")
                line_info.classList.remove("focus")
                const unions = document.querySelectorAll(`svg#metromap_map g.unions g.linea${line}`)
                unions.forEach((union) => {
                    union.classList.remove("focus")
                })
            } else {
                // If there are other lines in focus, check the unions
                const actives = []
                activebtns.forEach((temp) => {
                    actives.push("linea" + temp.dataset.line)
                })
                const unions = document.querySelectorAll(`svg#metromap_map g.unions g.linea${line}`)
                unions.forEach((union) => {
                    let classArray = Array.from(union.classList);
                    let commonClasses = actives.filter(cls => classArray.includes(cls));
                    if (commonClasses.length <= 1) {
                        union.classList.remove("focus")
                    }
                })

            }
            // Unfocus the line's segments and stations
            document.querySelector(`svg#metromap_map g.linea${line}segments`).classList.remove("focus")
            document.querySelector(`svg#metromap_map g.linea${line}stations`).classList.remove("focus")
            // Remove the "active" class from the button
            btn.classList.remove("active")
        } else {
            // If the button is not active, focus the line

            // Focus the entire map
            svg.classList.add("focus")
            line_info.classList.add("focus")
            // Focus the line's segments and stations
            document.querySelector(`svg#metromap_map g.linea${line}segments`).classList.add("focus")
            document.querySelector(`svg#metromap_map g.linea${line}stations`).classList.add("focus")
            // Focus the unions that have the same class as the line button
            const unions = document.querySelectorAll(`svg#metromap_map g.unions g.linea${line}`)
            unions.forEach((union) => {
                union.classList.add("focus")
            })
            // Add the "active" class to the button
            btn.classList.add("active")
        }

    })
})

// Pan and zoom functionality

const pz = panzoom(svg, {
    minZoom: 1,
    maxZoom: 5,
    bounds: true,
    boundsPadding: 1,
    autocenter: true,
    zoomDoubleClickSpeed: 1
})

pz.on('zoom', function (e) {
    if (e.getTransform().scale > 1) {
        svg.classList.add("zoomed")
        document.querySelector(".line_info").classList.add("zoomed")
        document.querySelector("#bmc").classList.add("zoomed")
    } else {
        svg.classList.remove("zoomed")
        document.querySelector(".line_info").classList.remove("zoomed")
        document.querySelector("#bmc").classList.remove("zoomed")
    }
});