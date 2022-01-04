import React, { useState } from 'react';
import cn from 'classnames';
import useInterval from '../../hooks/Browser/useInterval';

type ToastProps = { onDismiss?: () => void; autoDismiss?: boolean };

const Toast: React.FC<ToastProps> = ({
  children,
  autoDismiss = true,
  onDismiss
}) => {
  const [animationState, setAnimationState] = useState<'entry' | 'exit'>(
    'entry'
  );

  useInterval(
    () => {
      setAnimationState('exit');
    },
    autoDismiss ? 3000 : null
  );

  return (
    <div
      className={cn(
        'px-4 py-2 bg-gray-700 rounded-sm fixed w-toast bottom-16 sm:w-auto md:right-10 md:bottom-10 md:min-w-toast mx-4',
        animationState === 'entry' && 'animate-toast-entry',
        animationState === 'exit' && 'animate-toast-exit'
      )}
      onAnimationEnd={() => {
        if (animationState === 'exit') {
          onDismiss?.();
        }
      }}
      style={{ animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
};

export default Toast;
