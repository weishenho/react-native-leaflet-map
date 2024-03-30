import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  TileLayerProps,
} from 'react-leaflet';
import Measure from 'react-measure';
import './styles/markers.css';
import { LeafletProps } from './types/Leaflet.types';
import { MapMarkers } from './MapMarkers';
import { MapShapes } from './MapShapes';
import type { MapLayer, MapLayersProps } from './types/model.types';
import { LeafletWebViewEventTags } from './types/model.types';
import EventHandle from './EventHandle';
import { ZonesLayer } from './ZonesLayer';
import UserLocation from './UserLocation';
import { MapClusterMarkers } from './MapClusterMarkers';

const { BaseLayer } = LayersControl;

const Layer = (props: MapLayer): JSX.Element => {
  return <TileLayer {...(props as TileLayerProps)} />;
};

const MapLayers = (props: MapLayersProps) => {
  const { mapLayers } = props;
  const Wrap = mapLayers.length > 1 ? LayersControl : React.Fragment;
  return (
    <Wrap>
      {mapLayers.map((layer: MapLayer, index: number): JSX.Element => {
        if (layer.baseLayerName && mapLayers.length > 1) {
          return (
            <BaseLayer
              key={`layer-${layer.baseLayerName}`}
              checked={layer.baseLayerIsChecked ?? false}
              name={layer.baseLayerName ?? `Layer.${index}`}
            >
              <Layer {...layer} />
            </BaseLayer>
          );
        } else {
          return (
            <Layer key={`layer-${layer.baseLayerName ?? 'base'}`} {...layer} />
          );
        }
      })}
    </Wrap>
  );
};

export const MapComponent = (props: LeafletProps) => {
  const {
    mapCenterPosition,
    mapLayers = [],
    mapClusterMarkers,
    mapMarkers = [],
    mapShapes = [],
    onMessage,
    zoom = 13,
    maxZoom = 20,
    minZoom = 11,
    mapOptions,
    zones,
    selectedZone,
    flyto,
    userLocation,
  } = props;

  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  return (
    <Measure
      bounds
      onResize={(contentRect) => {
        if (contentRect.bounds) {
          const { height, width } = contentRect.bounds;
          setDimensions({ height, width });
        }
      }}
    >
      {({ measureRef }) => (
        <div
          ref={measureRef}
          className="map-comp-container"
          style={{
            backgroundColor: props.backgroundColor,
          }}
        >
          {dimensions.height > 0 && (
            <MapContainer
              key={`map_container_key_${JSON.stringify(mapOptions)}`}
              {...mapOptions}
              zoomControl={false}
              attributionControl={false}
              whenReady={() => {
                onMessage({
                  tag: LeafletWebViewEventTags.MapReady,
                  version: '1.0.0',
                });
              }}
              center={mapCenterPosition as LatLngExpression}
              maxZoom={maxZoom}
              minZoom={minZoom}
              zoom={zoom}
              style={{
                height: dimensions.height,
              }}
            >
              <EventHandle
                onMessage={onMessage}
                flyto={flyto}
                mapContainerHeight={dimensions.height}
              />
              <MapLayers mapLayers={mapLayers} />
              {mapClusterMarkers ? (
                <MapClusterMarkers
                  onClick={(mapMarkerId) => {
                    onMessage({
                      tag: LeafletWebViewEventTags.onMapMarkerClicked,
                      mapMarkerId,
                    });
                  }}
                  {...mapClusterMarkers}
                />
              ) : null}
              <MapMarkers
                mapMarkers={mapMarkers}
                onClick={(mapMarkerId) => {
                  onMessage({
                    tag: LeafletWebViewEventTags.onMapMarkerClicked,
                    mapMarkerId,
                  });
                }}
              />
              {zones ? (
                <ZonesLayer {...zones} selectedZone={selectedZone} />
              ) : null}

              <MapShapes mapShapes={mapShapes} />
              {userLocation ? <UserLocation {...userLocation} /> : null}
            </MapContainer>
          )}
        </div>
      )}
    </Measure>
  );
};
