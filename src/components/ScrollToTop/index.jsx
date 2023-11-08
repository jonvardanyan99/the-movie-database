import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = props => {
  const location = useLocation();

  useEffect(() => {
    global.scrollTo(0, 0);
  }, [location]);

  return props.children;
};
