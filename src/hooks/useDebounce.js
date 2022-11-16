import { useCallback, useRef } from 'react';

export const useDebounce = (callback, delay, counter, count) => {
  const timer = useRef(null);
  return useCallback((...args) => {
    if (counter) counter(count);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, count, counter, delay]);
};
