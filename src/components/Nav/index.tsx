import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import cn from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';
// import { useGlobalState } from '../../providers/GlobalStateProvider';
import { useWindowSize } from '../../hooks/Device/useWindowSize';
import Mobile from './Mobile';

const Nav = () => {
  // const { pathname } = useLocation();
  // const { user } = useGlobalState();
  const windowSize = useWindowSize();

  const isMobile = windowSize.width && windowSize.width < 768;

  const [, setScrolled] = useState(false);

  useEffect(() => {
    const mainElement = document.querySelector('main');

    const scrollHandler = () => {
      if (mainElement && mainElement?.scrollTop > 50) {
        setScrolled(true);
        return;
      }
      setScrolled(false);
    };

    mainElement?.addEventListener('scroll', scrollHandler);

    return () => mainElement?.removeEventListener('scroll', scrollHandler);
  }, []);

  // const renderLinks = () => {
  //   return links
  //     .map((link) => {
  //       return link.linkText !== 'Profile' ||
  //         (link.linkText === 'Profile' && user) ? (
  //         <Link
  //           key={link.linkText}
  //           to={link.to}
  //           className={cn(
  //             'text-base',
  //             'hover:opacity-100',
  //             pathname !== link.to && 'opacity-50'
  //           )}
  //         >
  //           <li>{link.linkText}</li>
  //         </Link>
  //       ) : null;
  //     })
  //     .filter(Boolean);
  // };

  return isMobile ? <Mobile /> : null;
};

export default Nav;
