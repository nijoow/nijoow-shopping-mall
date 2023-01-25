import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Mobile = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);

  return isMobile ? children : null;
};

const Desktop = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const [isDesktop, setIsDesktop] = useState(false);
  const desktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);

  return isDesktop ? children : null;
};

export { Mobile, Desktop };
