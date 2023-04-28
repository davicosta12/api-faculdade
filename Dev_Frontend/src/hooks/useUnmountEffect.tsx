import React from 'react';

export const useUnmountEffect = (fn: any) => React.useEffect(() => fn, []);