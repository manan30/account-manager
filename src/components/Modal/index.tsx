import React, { useEffect, useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import { MdClose } from 'react-icons/md';

type ModalProps = {
  isOpen: boolean;
  modalTitle?: string;
  children: React.ReactNode;
  confirmButtonText?: string;
  shouldCloseOnEscape?: boolean;
  onConfirmClickHandler?: () => void;
  onCloseClickHandler: () => void;
};

type AnimationTypes = 'Enter' | 'Exit';

const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  modalTitle,
  confirmButtonText = 'Confirm',
  children,
  shouldCloseOnEscape = false,
  onCloseClickHandler,
  onConfirmClickHandler
}) => {
  const [animationType, setAnimationType] = useState<AnimationTypes>();
  const [confirmButtonClicked, setConfirmButtonClicked] = useState<
    boolean | undefined
  >(false);

  useEffect(() => {
    if (shouldCloseOnEscape) {
      const escapeKeyHandler = (e: KeyboardEvent) => {
        if (e.code === 'Escape') onCloseClickHandler();
      };
      window.addEventListener('keyup', escapeKeyHandler);
      return () => window.removeEventListener('keyup', escapeKeyHandler);
    }
  }, [shouldCloseOnEscape, onCloseClickHandler]);

  useLayoutEffect(() => {
    if (isOpen) {
      setAnimationType('Enter');
      setConfirmButtonClicked(false);
    }
  }, [isOpen]);

  const animationEndHandler = () => {
    if (animationType === 'Exit') {
      confirmButtonClicked && onConfirmClickHandler
        ? onConfirmClickHandler()
        : onCloseClickHandler();
    }
  };

  const buttonClickHandler = (confirmButtonClick: boolean) => {
    setAnimationType('Exit');
    setConfirmButtonClicked(confirmButtonClick);
  };

  return isOpen ? (
    <div
      className={'fixed z-10 inset-0 overflow-y-auto grid place-items-center'}
    >
      <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
      </div>
      <div
        className={cn(
          'bg-white rounded-lg text-left overflow-hidden overflow-y-auto shadow-xl transform transition-all w-full max-w-lg min-h-c-8 max-h-table',
          animationType === 'Enter'
            ? 'animate-modal-entry'
            : 'animate-modal-exit'
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
        onAnimationEnd={() => animationEndHandler()}
      >
        <div className='bg-white p-4'>
          <div className='flex items-center mb-3'>
            <div className='text-xl text-indigo-600 tracking-wide font-bold'>
              {modalTitle}
            </div>
            <button
              className='ml-auto p-1 mr-1 rounded-full hover:bg-gray-200'
              onClick={() => buttonClickHandler(false)}
            >
              <MdClose className='text-gray-500' size={20} />
            </button>
          </div>
          {children}
          {onConfirmClickHandler && (
            <div className='bg-gray-100 -mx-4 px-4 py-3 -mb-4 mt-3 flex justify-items-end flex-row-reverse items-center'>
              <button
                type='button'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={() => buttonClickHandler(true)}
              >
                {confirmButtonText || 'Confirm'}
              </button>
              <button
                type='button'
                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={() => buttonClickHandler(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
