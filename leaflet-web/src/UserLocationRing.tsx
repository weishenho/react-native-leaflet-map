import { Circle } from 'react-leaflet';
import { useAnimation } from './hooks/useAnimation';
import { EasingType } from './enums/EasingType';
import type { IUserLocationRing } from './types/model.types';

const UserLocationRing = ({
  center,
  accuracy,
  circleColor,
}: IUserLocationRing) => {
  const animation1 = useAnimation(EasingType.OUT_QUART, 0, accuracy);

  return (
    <Circle
      key="user-acc-ring"
      color={circleColor}
      center={center}
      radius={animation1}
    />
  );
};

export default UserLocationRing;
