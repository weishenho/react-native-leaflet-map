import { RefObject, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { type Marker as MarkerType } from 'leaflet';

type Props = {
  mapMarkerRef: RefObject<MarkerType<any>>;
};

const NavToMarkerInCluster = ({ mapMarkerRef }: Props): null => {
  const map = useMap();

  useEffect(() => {
    if (map && mapMarkerRef.current) {
      setTimeout(() => {
        //@ts-ignore
        if (mapMarkerRef.current?._icon) {
          mapMarkerRef.current?.openPopup();
        } else {
          //@ts-ignore
          for (let layerID of Object.keys(map._layers)) {
            //@ts-ignore
            const layer = map._layers[layerID];
            // find the cluster layer
            if (layer._spiderfied !== undefined) {
              // zoom and open cluster with the marker
              layer.zoomToShowLayer(mapMarkerRef.current);
              break;
            }
          }

          // wait for zoom/load animation to end then open popup
          setTimeout(() => {
            mapMarkerRef.current?.openPopup();
          }, 500);
        }
      }, 500);
    }
  }, [map, mapMarkerRef]);

  return null;
};

export default NavToMarkerInCluster;
