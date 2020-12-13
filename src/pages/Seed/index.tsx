import React, { useState } from 'react';
import Toggle from '../../components/Toggle';
import Button from '../../components/Button';
import { useSeedDispatch, useSeedState } from '../../providers/SeedProvider';
import { SeedActionType } from '../../reducers/SeedReducer/seedReducer.interface';
import { deleteEverything } from '../../services/seed/seed';

const Seed = () => {
  const { seedOptions } = useSeedState();
  const seedDispatch = useSeedDispatch();

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      if (!seedOptions.everything && !seedOptions.creditors) {
        return;
      }

      if (seedOptions.everything) {
        await deleteEverything();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex justify-items-center items-center flex-col p-6'>
      <h1 className='text-indigo-600 font-bold text-5xl mt-8'>Seeder</h1>
      <div className='flex w-full min-h-c-8 mt-8 px-16'>
        <div className='p-4'>
          <div className='flex flex-col px-10'>
            {Object.entries(seedOptions).map(([key, value]) => {
              return (
                <div className='flex items-center mt-4' key={key}>
                  <h2 className='text-green-500 font-medium text-xl flex-auto'>
                    Seed {key[0].toUpperCase() + key.slice(1)}
                  </h2>
                  <div>
                    <Toggle
                      value={value}
                      handleToggle={(state) => {
                        seedDispatch({
                          type: `ADD_${key.toUpperCase()}` as SeedActionType,
                          payload: { status: state }
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='w-1/4 mt-8'>
        <Button
          buttonText='Seed Data'
          onClickHandler={handleClick}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Seed;
