import { Marker } from 'react-leaflet';
import UserLocationRing from './UserLocationRing';
import type { IUserLocation } from './types/model.types';
import { createDivIcon } from './utilities';

const UserLocation = ({
  position,
  accuracy,
  circleColor,
  ...rest
}: IUserLocation) => {
  return (
    <>
      {accuracy ? (
        <UserLocationRing
          center={position}
          accuracy={accuracy}
          circleColor={circleColor}
        />
      ) : null}

      <Marker
        key="user-location-marker"
        position={position}
        icon={createDivIcon({
          ...rest,
          position,
          id: 'user-location-icon',
        })}
      />
    </>
  );
};

export default UserLocation;
