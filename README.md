# Earthquake Visualization with Leaflet.js

This project visualizes real-time earthquake data using **Leaflet.js** and the **USGS GeoJSON Feed**. The map provides interactive features, including earthquake markers, tectonic plate boundaries, and multiple basemap options.

## 📌 Features
- **Real-time earthquake data** from [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- **Circle markers** where:
  - Size represents **magnitude**
  - Color represents **depth**
- **Popups** with earthquake details (location, magnitude, depth)
- **Tectonic Plate Boundaries**
- **Multiple Basemaps** (Satellite, Grayscale, Outdoors)
- **Legend** to explain earthquake depth
- **Layer Control** to toggle basemaps and overlays

---

## 📂 Part 1: Earthquake Visualization (Basic Map)

In **Leaflet Part 1**, we created a basic interactive map that displays earthquakes using **GeoJSON data**. The key components were:

- Fetching data from **USGS API**
- Creating a **Leaflet map**
- Adding **circle markers** to represent earthquakes
- Using **color and size** to visualize magnitude and depth
- Adding **popups** to display earthquake details
- Implementing a **legend**

---

## 📂 Part 2: Adding Tectonic Plates & Multiple Basemaps

In **Leaflet Part 2**, we enhanced the map with additional layers and controls:

- **Tectonic Plate Boundaries** from a GeoJSON dataset
- **New Basemaps:**
  - 🌍 **Esri Satellite** (real satellite imagery)
  - ⚫ **Grayscale** (muted tones for contrast)
  - 🏔 **Outdoors** (topographic map)
- **Layer Control** to toggle basemaps and overlays
- **Refinements** to marker styles and interactivity

---

## 🚀 How to Run the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/earthquake-visualization.git
   ```
2. Open `index.html` in your browser.

---

## 🛠 Technologies Used
- **Leaflet.js** (interactive mapping)
- **D3.js** (data fetching & visualization)
- **GeoJSON** (earthquake & tectonic plate data)
- **USGS API** (earthquake feed)

---

## 📜 Credits & Data Sources
- Earthquake data from **[USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)**
- Tectonic plates data from **[GitHub - Fraxen](https://github.com/fraxen/tectonicplates)**
- Basemaps from **OpenStreetMap, Esri, and OpenTopoMap**





