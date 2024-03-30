import type {
  MapMarker as MapMarkerType,
  MapMarkerAnimation,
} from './types/model.types';
import type { PointTuple } from 'leaflet';
import { DivIcon, divIcon } from 'leaflet';

export interface MapMarkersProps {
  mapMarkers: Array<MapMarkerType>;
  onClick: (markerId: string) => void;
  maxClusterRadius?: number;
}

export const createDivIcon = (mapMarker: MapMarkerType): DivIcon => {
  return divIcon({
    className: 'clearMarkerContainer',
    html: mapMarker.animation
      ? getAnimatedHTMLString(
          mapMarker.icon || '📍',
          mapMarker.animation || null,
          mapMarker.size || [24, 24]
        )
      : getUnanimatedHTMLString(mapMarker.icon, mapMarker.size),
    iconAnchor: mapMarker.iconAnchor || [12, 24],
    iconSize: mapMarker.size,
  });
};

/*
  Get the HTML string containing the icon div, and animation parameters
  */
export const getAnimatedHTMLString = (
  icon: string,
  animation: MapMarkerAnimation,
  size: PointTuple = [24, 24]
) => {
  return `<div class='animationContainer' style="
animation-name: ${animation.type ? animation.type : 'bounce'};
animation-duration: ${animation.duration ? animation.duration : 1}s ;
animation-delay: ${animation.delay ? animation.delay : 0}s;
animation-direction: ${animation.direction ? animation.direction : 'normal'};
animation-iteration-count: ${
    animation.iterationCount ? animation.iterationCount : 'infinite'
  };
width:${size[0]}px;height:${size[1]}px;">
${getIconFromEmojiOrImageOrSVG(icon, size)}
</div>`;
};

const getUnanimatedHTMLString = (
  icon: string,
  size: PointTuple = [24, 24]
): string => {
  return `<div class='unanimatedIconContainer'>${getIconFromEmojiOrImageOrSVG(
    icon,
    size
  )}</div>`;
};

const getIconFromEmojiOrImageOrSVG = (icon: string, size: PointTuple) => {
  if (icon.includes('svg') || icon.includes('SVG')) {
    const fontSize = Math.max(size[0], size[1]);
    return ` <div style='font-size: ${fontSize}px'>${icon}</div>`;
  } else if (icon.includes('.png') || icon.includes('base64')) {
    return `<img src="${icon}" style="width:${size[0]}px;height:${size[1]}px;">`;
  } else {
    const fontSize = Math.max(size[0], size[1]);
    return `<div style='font-size: ${Math.max(fontSize)}px'>${icon}</div>`;
  }
};
