var map = L.map('mapid').setView([39.961, -83], 15.5);

L.tileLayer('https://api.mapbox.com/styles/v1/kphillips1089/cjv716ej2fb9s1frvxmnar16b/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia3BoaWxsaXBzMTA4OSIsImEiOiJjamdzZzJnOHIwMXpuMzNtcXlobGs3eXRoIn0.TvtGU3tOrMURFzMy_N-xIw'
}).addTo(map);


// style for county data
function style(feature) {
    return {
        fillColor: "#6977A2",
        weight: 1,
        opacity: 0.2,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.2
    };
}


// generates a polygon from a dataset and sets its style
function geojsonGen(dataset, style) {
    return L.geoJson(dataset, {
        style: style
    }).addTo(map);
}


// generate polygon from geojson by passing it county data and style function
var buildings = geojsonGen(downtown, style)



// style for point data
function pointStyle(color, fillColor, op, wt) {
    return {
        color: color,
        fillColor: fillColor,
        opacity: op,
        weight: wt
    }
}


// allows for generation of points instead of default markers
function points(feature, latlng) {
    return new L.CircleMarker(latlng, {
        radius: 1,
        fillOpacity: 0.5
    });
}


// creates points and adds to amap
function pointsGen(dataset, pointStyle, points) {
    return L.geoJson(dataset, {
        style: pointStyle,
        pointToLayer: points
    }).addTo(map);
}


// generate all meter locations
pointsGen(meters450, pointStyle("#FF0000", "#E29090", 0.4, 1), points);
pointsGen(meters360, pointStyle("orange", "orange", 0.4, 1), points);
pointsGen(meters225, pointStyle("yellow", "#F3F3A8", 0.4, 1), points);
pointsGen(meters150, pointStyle("#2BFF00", "green", 0.4, 1), points);
pointsGen(meters100, pointStyle("#00DEFF", "00DEFF", 0.8, 1), points);
pointsGen(meters075, pointStyle("#A200FF", "purple", 0.4, 1), points);
pointsGen(meters50, pointStyle("white", "white", 0.8, 1), points);

// create a legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ['$4.50', '$3.60', '$2.25', '$1.50', '$1.00', '$0.75', '$0.50'],
        labels = ['cred.png', 'corange.png', 'cyellow.png', 'cgreen.png', 'cblue.png', 'cpurple.png', 'cwhite.png'];

    // loop through grades and add the label icons
    div.innerHTML += `Meter Rate <br>`;
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            `<img src=${labels[i]} height='10'></img> ${grades[i]} <br>`;
    }

    return div;
};

legend.addTo(map);