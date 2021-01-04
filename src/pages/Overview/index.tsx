import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{`Account Manager - Overview`}</title>
        <meta name='title' content={`Account Manager - Overview`} />
        <meta property='og:title' content={`Account Manager - Overview`} />
        <meta property='twitter:title' content={`Account Manager - Overview`} />
      </Helmet>
      <div className='m-8 grid grid-cols-3 gap-6'></div>
    </>
  );
};

export default Home;
