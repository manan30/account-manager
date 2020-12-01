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
        'w-full rounded-lg p-2 text-gray-200',
        !loading ? 'hover:shadow-lg bg-indigo-600' : 'bg-indigo-200'
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
