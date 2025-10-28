import { useEffect, useMemo, useRef } from 'react';

export function useDebounced<A extends unknown[]>(
  function_: (...args: A) => void,
  delay = 0
): (...args: A) => void {
  const timerIdReference = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (timerIdReference.current !== null) clearTimeout(timerIdReference.current);
    };
  }, []);
  return useMemo(
    () =>
      (...args: A): void => {
        if (!delay) {
          function_(...args);
          return;
        }
        if (timerIdReference.current !== null) clearTimeout(timerIdReference.current);
        timerIdReference.current = setTimeout(() => function_(...args), delay);
      },
    [function_, delay]
  );
}
