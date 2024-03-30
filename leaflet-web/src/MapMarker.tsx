import { useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import type {
  LatLngExpression,
  Marker as MarkerType,
  PointExpression,
} from 'leaflet';
import type { MapMarker as MapMarkerType } from './types/model.types';
import { createDivIcon } from './utilities';
import NavToMarkerInCluster from './NavToMarkerInCluster';

const MapMarker = ({
  mapMarker,
  onClick,
}: {
  mapMarker: MapMarkerType;
  onClick: (markerId: string) => void;
}) => {
  const mapMarkerRef = useRef<MarkerType>(null);

  return (
    <>
      <Marker
        key={mapMarker.id}
        ref={mapMarkerRef}
        position={mapMarker.position as LatLngExpression}
        icon={createDivIcon(mapMarker)}
        eventHandlers={{
          click: () => {
            onClick(mapMarker.id);
          },
        }}
        zIndexOffset={mapMarker.zIndexOffset}
      >
        {mapMarker.popup && (
          <Popup
            className={mapMarker.popup.className}
            offset={
              mapMarker.popup.offset ??
              ([
                0,
                mapMarker.iconAnchor ? -mapMarker.iconAnchor[0] : 0,
              ] as PointExpression)
            }
            closeButton={false}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              onClick={() => onClick(mapMarker.popup?.id ?? '')}
            ></div>
            {mapMarker.popup.content}
          </Popup>
        )}
      </Marker>
      {mapMarker.popup?.defaultOpen ? (
        <NavToMarkerInCluster mapMarkerRef={mapMarkerRef} />
      ) : null}
    </>
  );
};

export default MapMarker;
