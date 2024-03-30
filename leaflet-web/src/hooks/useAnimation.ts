import { useEffect, useRef, useState } from 'react';
import { EasingType } from '../enums/EasingType';
import { useAnimationTimer } from './useAnimationTimer';

// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
const easing = {
  [EasingType.LINEAR]: (n: number) => n,
  [EasingType.ELASTIC]: (n: number) =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  [EasingType.IN_EXPO]: (n: number) => Math.pow(2, 10 * (n - 1)),
  [EasingType.OUT_QUART]: (n: number) => 1 - Math.pow(1 - n, 4),
};

const lerp = (start: number, end: number, amt: number) => {
  return (1 - amt) * start + amt * end;
};
// Hook
export function useAnimation(
  easingName: EasingType = EasingType.LINEAR,
  delay = 0,
  toValue = 0
) {
  const startValue = useRef<number>(0);
  const curVal = useRef<number>(0);
  const [duration, setDuration] = useState(0);
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay, toValue);
  // Amount of specified duration elapsed on a scale from 0 - 1
  useEffect(() => {
    if (toValue) {
      const cur = curVal.current || 0;
      startValue.current = cur;
      setDuration(2 * Math.abs(toValue - cur));
    }
  }, [toValue]);

  useEffect(() => {
    const n = Math.min(1, elapsed / duration);
    curVal.current = Math.max(
      1,
      lerp(startValue.current, toValue, easing[easingName](n))
    );
  }, [elapsed]);
  // Return altered value based on our specified easing function

  return curVal.current;
}
