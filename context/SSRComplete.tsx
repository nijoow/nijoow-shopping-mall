import React, { useEffect } from 'react';
import { useSsrComplectedState } from '../state/state';

const SSRComplete = ({ children }: any) => {
  const setSsrCompleted = useSsrComplectedState();
  useEffect(setSsrCompleted, [setSsrCompleted]);
  return <div>{children}</div>;
};

export default SSRComplete;
