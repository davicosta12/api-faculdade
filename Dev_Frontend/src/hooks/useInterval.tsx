import React from 'react';
import { useUnmountEffect } from './useUnmountEffect';

export const useInterval = (fn: any, delay = 0, when = true) => {
  const timeout = React.useRef(null);
  const savedCallback = React.useRef(null);

  const clear = React.useCallback(() => clearInterval(timeout.current || 0), [timeout.current]);

  React.useEffect(() => {
    savedCallback.current = fn;
  });

  React.useEffect(() => {
    function callback() {
      const _savedCallback = savedCallback as any
      _savedCallback.current && _savedCallback.current();
    }

    if (when) {
      timeout.current = setInterval(callback, delay) as any;
      return clear;
    } else {
      clear();
    }
  }, [delay, when]);

  useUnmountEffect(() => {
    clear();
  });

  return [clear];
};
