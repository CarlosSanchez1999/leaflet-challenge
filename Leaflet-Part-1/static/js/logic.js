// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map
let street = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  layers: [basemap]
});

// Then add the 'basemap' tile layer to the map.
basemap.addTo(map);

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
let earthquakes = new L.LayerGroup();


let baseMaps = {
  "Basemap": basemap,
  "Street View": street
};

let overlayMaps = {
  "Earthquakes": earthquakes,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

// Function to determine marker size based on magnitude
function getRadius(magnitude) {
  return magnitude * 4;
}

// Function to determine marker color based on depth
function getColor(depth) {
  return depth > 90 ? "#ff0000" :
         depth > 70 ? "#ff6600" :
         depth > 50 ? "#ff9900" :
         depth > 30 ? "#ffcc00" :
         depth > 10 ? "#ccff33" : "#66ff33";
}

// Function to return the style for each marker
function styleInfo(feature) {
  return {
      radius: getRadius(feature.properties.mag),
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };
}

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
  L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function (feature, layer) {
          layer.bindPopup(`<b>Location:</b> ${feature.properties.place}<br>
                           <b>Magnitude:</b> ${feature.properties.mag}<br>
                           <b>Depth:</b> ${feature.geometry.coordinates[2]} km`);
      }
  }).addTo(earthquakes);
  earthquakes.addTo(map);
});

// Create a legend control object.
let legend = L.control({position: "bottomright"});
legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend"),
      depths = [-10, 10, 30, 50, 70, 90],
      colors = ["#66ff33", "#ccff33", "#ffcc00", "#ff9900", "#ff6600", "#ff0000"];
  
  div.innerHTML += "<strong>Depth (km)</strong><br>";
  for (let i = 0; i < depths.length; i++) {
      div.innerHTML += `<i style="background: ${colors[i]}; width: 18px; height: 18px; display: inline-block;"></i> 
                        ${depths[i]}${depths[i + 1] ? "&ndash;" + depths[i + 1] + " km<br>" : "+ km"}`;
  }
  return div;
};
legend.addTo(map);


