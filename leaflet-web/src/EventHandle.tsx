import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import {
  LeafletWebViewEvent,
  LeafletWebViewEventTags,
  IFlyto,
} from './types/model.types';
import type { LatLngLiteral, LeafletMouseEvent } from 'leaflet';

type Props = {
  flyto?: IFlyto;
  mapContainerHeight?: number;
  onMessage: (message: LeafletWebViewEvent) => void;
  onMapClick?: (pos: LatLngLiteral) => void;
};

const EventHandle = ({ flyto, mapContainerHeight, onMessage }: Props): null => {
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      const { latlng } = event;

      onMessage({
        tag: LeafletWebViewEventTags.onMapClicked,
        location: latlng,
      });
    },
    resize: () => {
      onMessage({
        tag: LeafletWebViewEventTags.onResize,
      });
    },
    unload: () => {
      onMessage({
        tag: LeafletWebViewEventTags.onUnload,
      });
    },
    zoom: () => {
      onMessage({
        tag: LeafletWebViewEventTags.onZoom,
      });
    },
    zoomlevelschange: () => {
      onMessage({
        tag: LeafletWebViewEventTags.onZoomLevelsChange,
      });
    },
    drag: () => {
      onMessage({
        tag: LeafletWebViewEventTags.drag,
      });
    },
  });

  useEffect(() => {
    if (mapContainerHeight && map) {
      map.invalidateSize();
    }
  }, [mapContainerHeight, map]);

  useEffect(() => {
    if (map && flyto?.latlng) {
      onMessage({
        tag: LeafletWebViewEventTags.DebugMessage,
        message: `Flying to ${JSON.stringify(flyto.latlng)}, ${flyto.zoom}`,
      });
      map.setView(flyto.latlng, flyto.zoom ?? map.getZoom());
    }
  }, [map, flyto]);
  return null;
};

export default EventHandle;
