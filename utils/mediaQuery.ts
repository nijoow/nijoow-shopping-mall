import { useMediaQuery } from 'react-responsive';

const Mobile = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return isMobile ? children : null;
};
const Desktop = ({ children }: { children: JSX.Element }): JSX.Element | null => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? children : null;
};

export { Mobile, Desktop };
