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
      <div className='grid grid-cols-3 gap-6 m-8'>Overview page</div>
    </>
  );
};

export default Home;
