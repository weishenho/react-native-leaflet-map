import { LayerGroup } from 'react-leaflet';
import type { MapMarkersProps } from './types/model.types';
import MapMarker from './MapMarker';

const MapMarkers = (props: MapMarkersProps) => {
  return (
    <LayerGroup>
      {props.mapMarkers.map((mapMarker) => {
        return (
          <MapMarker
            key={mapMarker.id}
            mapMarker={mapMarker}
            onClick={props.onClick}
          />
        );
      })}
    </LayerGroup>
  );
};

export { MapMarkers };
