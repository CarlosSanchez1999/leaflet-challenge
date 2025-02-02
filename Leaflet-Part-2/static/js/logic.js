// Create different tile layers
let satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: "&copy; Esri, DigitalGlobe, GeoEye, Earthstar Geographics"
});

let grayscale = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
});

let outdoors = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
});

// Create the map object with default settings
let map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  layers: [satellite]
});

// Create layer groups for overlays
let earthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();

// Define base maps
let baseMaps = {
  "Satellite": satellite,
  "Grayscale": grayscale,
  "Outdoors": outdoors
};

// Define overlay layers
let overlayMaps = {
  "Tectonic Plates": tectonicPlates,
  "Earthquakes": earthquakes
};

// Add layer control to the map
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

// Fetch Earthquake data
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

// Fetch Tectonic Plate data
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
  L.geoJson(plate_data, {
      color: "orange",
      weight: 2
  }).addTo(tectonicPlates);
  tectonicPlates.addTo(map);
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

