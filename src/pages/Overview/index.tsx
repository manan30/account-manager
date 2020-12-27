import React from 'react';
import Modal from '../../components/Modal';

const Home = () => {
  return (
    <>
      <div className='m-8 grid grid-cols-3 gap-6'></div>
      <Modal isOpen={true}>ABCD</Modal>
    </>
  );
};

export default Home;
