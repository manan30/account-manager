import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Loader from '../Loader';

function Button({ buttonText, onClickHandler, type, loading }) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn(
        'w-full rounded-lg p-2 text-gray-200 hover:shadow-lg bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300 focus:shadow-lg',
        loading && 'hover:shadow-none opacity-50 cursor-default'
      )}
      onClick={onClickHandler}
      disabled={loading}
    >
      {!loading ? (
        buttonText
      ) : (
        <div className='grid place-items-center'>
          <Loader />
        </div>
      )}
    </button>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool
};

Button.defaultProps = {
  type: 'button',
  loading: undefined
};

export default Button;
