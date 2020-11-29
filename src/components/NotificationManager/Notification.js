import React from 'react';

function Notification({ id, children, theme }) {
  return (
    <div className='w-notification-width rounded p-2 mb-4 bg-indigo-600 text-indigo-100'>
      {children}
    </div>
  );
}

export default Notification;
