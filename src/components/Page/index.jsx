import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

export const Page = ({ children }) => {
    const location = useLocation();

    let isSearchPathname;

    if (location.pathname === '/search/movie' || location.pathname === '/search/tv' || location.pathname === '/search/person') {
        isSearchPathname = true;
    } else {
        isSearchPathname = false;
    };

    return (
        <div style={{ marginTop: isSearchPathname ? '109px' : undefined }} className={styles.page}>
            {children}
        </div>
    );
};

Page.propTypes = {
    children: PropTypes.object.isRequired,
};