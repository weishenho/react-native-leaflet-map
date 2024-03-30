import { useEffect, useState } from 'react';

export function useAnimationTimer(
  duration: number = 0,
  delay = 0,
  toValue = 0
) {
  const [elapsed, setTime] = useState(0);
  useEffect(
    () => {
      let animationFrame: number, timerStop: NodeJS.Timeout, start: number;
      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }
      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }
      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);
        // Start the loop
        start = Date.now();
        loop();
      }
      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);
      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay, toValue] // Only re-run effect if duration or delay changes
  );

  if (!duration) {
    return 1;
  }
  return elapsed;
}
