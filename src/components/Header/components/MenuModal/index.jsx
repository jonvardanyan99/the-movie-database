import PropTypes from 'prop-types';

import { Modal } from '../../../Modal';
import closeIcon from '../../../../assets/icons/close.png';

import styles from './styles.module.scss';

export const MenuModal = ({ visible, onClose }) => {
    return (
        <Modal className={styles.modal} visible={visible}>
            <div className={styles.menu}>
                <img src={closeIcon} onClick={onClose} alt="close" />
                <ul>
                    <li className={styles.logo}>
                        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="logo" />
                    </li>
                    <li className={styles.search}>
                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg" alt="search" />
                    </li>
                </ul>
                <ul>
                    <li className={styles.link}>
                        <a href="">Movies</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">TV Shows</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">People</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">Login</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">Join TMDB</a>
                    </li>
                </ul>
            </div>
        </Modal>
    );
};

MenuModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};