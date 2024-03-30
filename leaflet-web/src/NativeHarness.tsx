import { useEffect, useState } from 'react';
import type { LeafletMapProps } from './types/Leaflet.types';
import {
  LeafletWebViewEvent,
  LeafletWebViewEventTags,
} from './types/model.types';
import { MapComponent } from './MapComponent';
import './styles/index.css';

const sendMessage = (message: LeafletWebViewEvent) => {
  // @ts-ignore
  window.ReactNativeWebView?.postMessage(JSON.stringify(message));
};

const sendDebugMessage = (message: string) => {
  sendMessage({ tag: LeafletWebViewEventTags.DebugMessage, message });
};

interface Props extends Partial<LeafletMapProps> {}

const initialNativeHarnessState: Props = {
  mapCenterPosition: { lat: 1.358479, lng: 103.815201 },
  mapLayers: [
    {
      baseLayer: true,
      url: 'https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png',
      id: 'onemapbase',
      zIndex: 1,
    },
  ],
  mapClusterMarkers: undefined,
  mapMarkers: [],
  mapShapes: [],
  maxZoom: 18,
  minZoom: 11,
  zoom: 13,
  zones: undefined,
  flyto: undefined,
  userLocation: undefined,
};

export const NativeHarness = () => {
  const [state, setState] = useState<Props>(initialNativeHarnessState);

  useEffect(() => {
    const handleNativeMessage = (event: MessageEvent) => {
      try {
        const eventData = event.data as LeafletMapProps;
        if (Object.keys(eventData).length === 0) {
          return;
        }
        setState((state) => ({ ...state, ...eventData }));
      } catch (error) {
        sendDebugMessage(JSON.stringify(error));
      }
    };
    if (window) {
      window.addEventListener('message', handleNativeMessage);
      sendMessage({
        tag: LeafletWebViewEventTags.MapComponentMounted,
        version: '0.1',
      });
    } else {
      sendMessage({
        tag: LeafletWebViewEventTags.Error,
        error: 'Unable to add window / document event listeners',
      });
    }
    return () => {
      if (window) {
        window.removeEventListener('message', handleNativeMessage);
      }
    };
  }, []);

  // If we haven't received the first message from the parent,
  // dont render yet since some options can't be changed after the first render.
  if (
    state.mapCenterPosition == null ||
    state.mapLayers == null ||
    state.mapLayers.length === 0
  ) {
    return null;
  }
  return (
    <MapComponent
      mapCenterPosition={state.mapCenterPosition}
      mapLayers={state.mapLayers}
      mapClusterMarkers={state.mapClusterMarkers}
      mapMarkers={state.mapMarkers}
      mapOptions={state.mapOptions}
      mapShapes={state.mapShapes}
      maxZoom={state.maxZoom}
      minZoom={state.minZoom}
      zoom={state.zoom}
      zones={state.zones}
      selectedZone={state.selectedZone}
      onMessage={(webViewLeafletEvent: LeafletWebViewEvent) => {
        sendMessage(webViewLeafletEvent);
      }}
      flyto={state.flyto}
      userLocation={state.userLocation}
    />
  );
};
