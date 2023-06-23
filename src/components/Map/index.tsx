import {
  CircleLayer,
  FillLayer,
  GeoJSONSource,
  HeatmapLayer,
  Layer,
  LineLayer,
  Map,
  Marker,
  ViewPort,
} from "@parsimap/react-mapbox-gl";
import mapboxgl from "mapbox-gl";

/**
 * A geoJSON source as a sample data which has a LineString feature.
 */
const sourceData: mapboxgl.GeoJSONSourceRaw["data"] = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [51.683498, 32.636231],
          [51.667222, 32.642592],
          [51.669108, 32.657357],
          [51.677378, 32.658079],
        ],
      },
      properties: {},
    },
  ],
};

const polygonSource: mapboxgl.GeoJSONSourceRaw["data"] = {
  type: "Polygon",
  coordinates: [
    [
      [51.683498, 32.636231],
      [51.667222, 32.642592],
      [51.669108, 32.657357],
      [51.677378, 32.658079],
    ],
  ],
};

/**
 * A view port can change current view and zoom of the map.
 */
const DEFAULT_VIEW_PORT: ViewPort = {
  zoom: 12,
  lat: 32.636193,
  lng: 51.693572,
};

const MapWrapper = () => {
  function handleClick(event: mapboxgl.MapMouseEvent) {
    console.log("current lng:", event.lngLat.lng);
    console.log("current lat:", event.lngLat.lat);
  }

  function handleViewPortChange(viewPort: ViewPort) {
    // Doing something with updated viewPort
  }

  const onMapLoad = (event: mapboxgl.MapboxEvent) => {
    const map = event.target;

    new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat([51.693572, 32.636193])
      .setHTML(`<div className="prompt">hello</div>`)
      .addTo(map);
  };

  return (
    <Map
      onLoad={onMapLoad}
      onClick={handleClick}
      token={process.env.REACT_APP_MAP_AUTH ?? ""}
      mapStyle={"satellite-raster"}
      onViewPortChange={handleViewPortChange}
      {...DEFAULT_VIEW_PORT}
    >
      <GeoJSONSource id={"streets"} data={sourceData} />
      <CircleLayer
        id={"point"}
        source={"streets"}
        paint={{ "circle-color": "#000", "circle-radius": 10 }}
      />
      <Marker lngLat={[51.390275, 35.807988]} color="#1e1e1e" />
      <FillLayer
        id="poly-layer"
        source={{ type: "geojson", data: polygonSource }}
        paint={{ "fill-color": "#fff", "fill-opacity": 0.3 }}
      />
    </Map>
  );
};

export default MapWrapper;
