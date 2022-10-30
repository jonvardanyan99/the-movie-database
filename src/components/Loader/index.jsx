import BeatLoader from 'react-spinners/BeatLoader';
import PropTypes from 'prop-types';

export const Loader = ({
    color = '#1ed5a9',
    size = 30,
    cssOverride = {},
    speedMultiplier,
}) => {
    const css = { display: 'flex', justifyContent: 'center', ...cssOverride };

    return <BeatLoader 
                color={color} 
                size={size}
                cssOverride={css} 
                speedMultiplier={speedMultiplier} 
            />
};

Loader.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    cssOverride: PropTypes.object,
    speedMultiplier: PropTypes.number,
}