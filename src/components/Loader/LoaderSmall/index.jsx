import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';

export const LoaderSmall = ({
    color = 'black',
    size = 15,
    cssOverride = {},
    speedMultiplier = 0.5,
}) => {
    return <ClipLoader
                color={color}
                size={size}
                cssOverride={cssOverride}
                speedMultiplier={speedMultiplier}
            />
};

LoaderSmall.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    cssOverride: PropTypes.object,
    speedMultiplier: PropTypes.number,
};