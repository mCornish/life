import React from 'react';
import PropTypes from 'prop-types';
import './MatrixCell.scss';

export default function MatrixCell({
  borderWidth,

  isAlive = false,
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      className={`cell ${isAlive ? 'is-alive' : undefined}`}
      style={{
        borderWidth: `${borderWidth}em`,
      }}
      aria-label={isAlive ? 'Make cell dead' : 'Make cell alive'}
    ></button>
  );
}

MatrixCell.propTypes = {
  borderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  
  isAlive: PropTypes.bool,
  onClick: PropTypes.func,
};
