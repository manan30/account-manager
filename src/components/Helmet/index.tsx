import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const Helmet = () => {
  const location = useLocation();

  const pathname =
    location.pathname !== '/'
      ? location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2)
      : '';

  return (
    <ReactHelmet>
      <title>{`Account Manager${' - ' + pathname}`}</title>
      <meta name='title' content={`Account Manager${' - ' + pathname}`} />
      <meta
        property='og:title'
        content={`Account Manager${' - ' + pathname}`}
      />
      <meta
        property='twitter:title'
        content={`Account Manager${' - ' + pathname}`}
      />
    </ReactHelmet>
  );
};

export default Helmet;
