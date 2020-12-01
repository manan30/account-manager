import React from 'react';
import PropTypes from 'prop-types';

function Loader({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 38 38'
      xmlns='http://www.w3.org/2000/svg'
      stroke='#fff'
      className='animate-spin'
    >
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(1 1)' strokeWidth='2'>
          <circle strokeOpacity='.5' cx='18' cy='18' r='18' />
          <path d='M36 18c0-9.94-8.06-18-18-18' />
        </g>
      </g>
    </svg>
  );
}

Loader.propTypes = {
  size: PropTypes.number
};

Loader.defaultProps = {
  size: 24
};

export default Loader;
