import React from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';

function Home() {
  return (
    <>
      <Header />
      <div className='m-8 grid grid-cols-3 gap-6'>
        <Card className='shadow-lg' />
        <Card className='shadow-lg' />
      </div>
    </>
  );
}

export default Home;
