import React, { useEffect } from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useNotificationDispatchContext } from '../../contexts/NotificationContext';
import { ADD_NOTIFICATION } from '../../utils/Constants/ActionTypes/NotificationReducerActionTypes';

function Home() {
  const dispatch = useNotificationDispatchContext();

  useEffect(() => {
    dispatch({
      type: ADD_NOTIFICATION,
      payload: { content: 'Test Notification' }
    });
  }, [dispatch]);

  return (
    <>
      {/* s<Header /> */}
      <div className='m-8 grid grid-cols-3 gap-6'>
        <Card className='shadow-lg' />
        <Card className='shadow-lg' />
      </div>
    </>
  );
}

export default Home;
