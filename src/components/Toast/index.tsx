import React, { useState } from 'react';
import cn from 'classnames';
import useInterval from '../../hooks/Browser/useInterval';

type ToastProps = { onDismiss?: () => void };

const Toast: React.FC<ToastProps> = ({ children, onDismiss }) => {
  const [animationState, setAnimationState] = useState<'entry' | 'exit'>(
    'entry'
  );

  useInterval(() => {
    setAnimationState('exit');
  }, 3000);

  return (
    <div
      className={cn(
        'px-4 py-2 bg-gray-700 rounded-sm fixed right-10 bottom-10 md:min-w-toast',
        animationState === 'entry' && 'animate-toast-entry',
        animationState === 'exit' && 'animate-toast-exit'
      )}
      onAnimationEnd={() => {
        if (animationState === 'exit') {
          onDismiss?.();
        }
      }}
    >
      {children}
    </div>
  );
};

export default Toast;
