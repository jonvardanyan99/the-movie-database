import PropTypes from 'prop-types';
import { React } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export const LoaderSmall = ({
  color = 'black',
  size = 15,
  cssOverride = {},
  speedMultiplier = 0.5,
}) => {
  return (
    <ClipLoader
      color={color}
      size={size}
      cssOverride={cssOverride}
      speedMultiplier={speedMultiplier}
    />
  );
};

LoaderSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  cssOverride: PropTypes.shape({}),
  speedMultiplier: PropTypes.number,
};
