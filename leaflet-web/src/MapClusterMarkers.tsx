import { LayerGroup } from 'react-leaflet';
import { MarkerCluster, PointTuple, divIcon } from 'leaflet';
import type { MapClusterMarkersProps } from './types/model.types';
import MapMarker from './MapMarker';
import MarkerClusterGroup from './MarkerClusterGroup';

const spiderLegPolylineOptions = { weight: 2, color: '#E2231A', opacity: 1 };
const createClusterCustomIcon = function (
  cluster: MarkerCluster,
  icon: string,
  size: PointTuple = [24, 24],
  iconAnchor: PointTuple = [12, 12]
) {
  return divIcon({
    html: `<div class='cluster-container'><img src='${icon}' style="width:${
      size[0]
    }px;height:${
      size[1]
    }px;"></img><div class='cluster-count'>${cluster.getChildCount()}</div></div>`,
    className: 'custom-marker-cluster',
    iconSize: size,
    iconAnchor: iconAnchor,
  });
};
export const MapClusterMarkers = (props: MapClusterMarkersProps) => {
  return (
    <LayerGroup>
      <MarkerClusterGroup
        chunkedLoading
        showCoverageOnHover={false}
        zoomToBoundsOnClick
        maxClusterRadius={props.maxClusterRadius ?? 50}
        spiderLegPolylineOptions={spiderLegPolylineOptions}
        iconCreateFunction={(cluster: MarkerCluster) =>
          createClusterCustomIcon(
            cluster,
            props.clusterIcon,
            props.clusterIconSize,
            props.clusterIconAnchor
          )
        }
      >
        {props.mapMarkers.map((mapMarker) => {
          return (
            <MapMarker
              key={mapMarker.id}
              mapMarker={mapMarker}
              onClick={props.onClick}
            />
          );
        })}
      </MarkerClusterGroup>
    </LayerGroup>
  );
};
