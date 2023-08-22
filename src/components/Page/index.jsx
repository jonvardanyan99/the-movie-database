import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export const Page = ({ children }) => {
    return (
        <div className={styles.page}>
            {children}
        </div>
    );
};

Page.propTypes = {
    children: PropTypes.object.isRequired,
};