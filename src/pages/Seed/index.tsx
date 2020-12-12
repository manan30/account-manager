import React from 'react';
import Toggle from '../../components/Toggle';
import Button from '../../components/Button';
import { useSeedDispatch, useSeedState } from '../../providers/SeedProvider';

const seedOptions = ['Everything', 'Creditors'];

const Seed = () => {
  const {
    delete: { creditors: deleteCreditors, everything: deleteEverything },
    insert: { creditors: insertCreditors, everything: insertEverything }
  } = useSeedState();
  const seedDispatch = useSeedDispatch();

  const handleClick = () => {
    if (
      !deleteCreditors &&
      !deleteEverything &&
      !insertCreditors &&
      !insertEverything
    ) {
      return;
    }
  };

  return (
    <div className='w-full flex justify-items-center items-center flex-col p-6'>
      <h1 className='text-indigo-600 font-bold text-5xl mt-8'>Seeder</h1>
      <div className='flex w-full min-h-c-8 mt-8 px-16'>
        <div className='w-1/2 p-4'>
          <h1 className='text-red-600 font-semibold text-3xl text-center mb-4'>
            Delete
          </h1>
          <div className='flex flex-col px-10'>
            {seedOptions.map((option) => {
              return (
                <div className='flex items-center mt-4' key={option}>
                  <h2 className='text-red-500 font-medium text-xl flex-auto'>
                    {option}
                  </h2>
                  <div>
                    <Toggle />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='w-1/2 p-4'>
          <h1 className='text-green-600 font-semibold text-3xl text-center mb-4'>
            Insert
          </h1>
          <div className='flex flex-col px-10'>
            {seedOptions.map((option) => {
              return (
                <div className='flex items-center mt-4' key={option}>
                  <h2 className='text-green-500 font-medium text-xl flex-auto'>
                    {option}
                  </h2>
                  <div>
                    <Toggle />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='w-1/4 mt-8'>
        <Button buttonText='Seed Data' onClickHandler={handleClick} />
      </div>
    </div>
  );
};

export default Seed;
