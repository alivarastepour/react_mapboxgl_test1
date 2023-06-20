import {
  CircleLayer,
  GeoJSONSource,
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

/**
 * A view port can change current view and zoom of the map.
 */
const DEFAULT_VIEW_PORT: ViewPort = {
  zoom: 13,
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

  return (
    <Map
      onClick={handleClick}
      token={process.env.REACT_APP_MAP_AUTH ?? ""}
      // style={"parsimap-streets-v11"}
      onViewPortChange={handleViewPortChange}
      {...DEFAULT_VIEW_PORT}
    >
      <GeoJSONSource id={"streets"} data={sourceData} />
      <LineLayer id="salam" source={"streets"} />
      <CircleLayer id={"point"} source={"streets"} />
      <Marker lngLat={[32.624691, 51.735869]} />
    </Map>
  );
};

export default MapWrapper;
