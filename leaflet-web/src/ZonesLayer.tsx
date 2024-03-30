import React from 'react'
import { useState, useEffect } from 'react';
import type { LeafletZone, ZoneProps } from './types/model.types';
import { GeoJSON, LatLngBounds } from 'leaflet';
import area from '@turf/area';
import { polygon } from '@turf/helpers';
import { Polygon, Polyline, Tooltip, useMap } from 'react-leaflet';

export const ZonesLayer = ({
  data,
  color,
  opacity,
  fillColor,
  fillOpacity,
  icon,
  iconSize,
  shouldFlyTo,
  flyToMaxZoom,
  flyToUseCurrentZoom,
  selectedZone,
  borderColor,
  borderWidth,
}: ZoneProps) => {
  const [zones, setZones] = useState<LeafletZone[]>([]);

  const map = useMap();
  useEffect(() => {
    const result: LeafletZone[] = data.map((e) => {
      const coords = GeoJSON.coordsToLatLngs(e.geoJsonCoords, 2);

      const biggestAreaPolgyon = { index: 0, area: 0 };
      if (coords.length > 1) {
        e.geoJsonCoords.forEach((coord, index) => {
          const curArea = area(polygon(coord));
          if (curArea > biggestAreaPolgyon.area) {
            biggestAreaPolgyon.index = index;
            biggestAreaPolgyon.area = curArea;
          }
        });
        const [c] = coords.splice(biggestAreaPolgyon.index, 1);
        coords.unshift(c);
      }

      const d = {
        zone: e.zone,
        coordinates: coords,
      };
      return d;
    });
    setZones(result);
  }, [data, map]);

  useEffect(() => {
    if (selectedZone) {
      const zone = zones.find((z) => z.zone === selectedZone);
      if (zone?.coordinates && shouldFlyTo) {
        const flyToBoundsOptions = () => {
          if (flyToMaxZoom) {
            return { maxZoom: flyToMaxZoom };
          } else if (flyToUseCurrentZoom) {
            return { maxZoom: map.getZoom() };
          }
          return undefined;
        };
        map.flyToBounds(
          new LatLngBounds(zone?.coordinates),
          flyToBoundsOptions()
        );
      }
    }
  }, [selectedZone]);

  return (
    <>
      {zones.map((e, i) => {
        const isSelected = selectedZone === e.zone;
        const key = `zone-${e.zone}-${isSelected}`;

        if (isSelected) {
          return (
            <Polygon
              key={key}
              positions={e.coordinates}
              color={color}
              opacity={opacity}
              fillColor={fillColor}
              fillOpacity={fillOpacity}
            >
              {icon && iconSize ? (
                <Tooltip
                  permanent
                  direction="center"
                  className="zone-title"
                  offset={[0, -(iconSize[1] / 2)]}
                >
                  <div className="container">
                    <img
                      src={icon}
                      width={iconSize[0]}
                      height={iconSize[1]}
                      alt="selected-location-icon"
                    />
                    <div>{selectedZone}</div>
                  </div>
                </Tooltip>
              ) : (
                <Tooltip permanent direction="center" className="zone-title">
                  {e.zone}
                </Tooltip>
              )}
            </Polygon>
          );
        }
        return (
          <Polyline
            key={key}
            positions={e.coordinates}
            color={borderColor}
            weight={borderWidth}
          />
        );
      })}
    </>
  );
};
