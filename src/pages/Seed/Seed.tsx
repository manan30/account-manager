import React, { useState } from 'react';
import Toggle from '../../components/Toggle';
import Button from '../../components/Button';
import { useSeedDispatch, useSeedState } from '../../providers/SeedProvider';
import { SeedActionType } from '../../reducers/SeedReducer/seedReducer.interface';
import {
  seedCreditors,
  seedEverything,
  seedSpending,
  seedTransactions
} from '../../services/seed/seed';
import { useNotificationDispatchContext } from '../../providers/NotificationProvider';
import { ADD_NOTIFICATION } from '../../reducers/NotificationReducer/notificationReducer.interface';
import { NOTIFICATION_THEME_SUCCESS } from '../../utils/Constants/ThemeConstants';

const Seed = () => {
  const { seedOptions } = useSeedState();
  const seedDispatch = useSeedDispatch();
  const notificationDispatch = useNotificationDispatchContext();

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      if (
        !seedOptions.everything &&
        !seedOptions.creditors &&
        !seedOptions.transactions &&
        !seedOptions.spending
      ) {
        return;
      }

      if (seedOptions.everything) {
        await seedEverything();
        notificationDispatch({
          type: ADD_NOTIFICATION,
          payload: {
            content: 'Firestore seeded with everything',
            theme: NOTIFICATION_THEME_SUCCESS
          }
        });
      }

      if (seedOptions.creditors) {
        await seedCreditors();
        notificationDispatch({
          type: ADD_NOTIFICATION,
          payload: {
            content: 'Firestore seeded with creditors',
            theme: NOTIFICATION_THEME_SUCCESS
          }
        });
      }

      if (seedOptions.transactions) {
        await seedTransactions();
        notificationDispatch({
          type: ADD_NOTIFICATION,
          payload: {
            content: 'Firestore seeded with transactions',
            theme: NOTIFICATION_THEME_SUCCESS
          }
        });
      }

      if (seedOptions.spending) {
        await seedSpending();
        notificationDispatch({
          type: ADD_NOTIFICATION,
          payload: {
            content: 'Firestore seeded with spending',
            theme: NOTIFICATION_THEME_SUCCESS
          }
        });
      }

      seedDispatch({ type: 'RESET' });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex justify-items-center items-center flex-col p-6'>
      <h1 className='text-indigo-600 font-bold text-5xl mt-8'>Seeder</h1>
      <div className='flex w-1/2 min-h-c-8 mt-8 px-16 flex-col'>
        {Object.entries(seedOptions).map(([key, value]) => {
          return (
            <div className='flex items-center mt-4' key={key}>
              <h2 className='text-indigo-400 font-medium text-xl flex-auto'>
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
      <div className='w-1/4 mt-8'>
        <Button onClickHandler={handleClick} loading={loading}>
          Seed Data
        </Button>
      </div>
    </div>
  );
};

export default Seed;
