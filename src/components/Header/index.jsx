import { useState } from 'react';

import menuIcon from '../../assets/icons/menu.png';

import { MenuModal } from './components/MenuModal';
import styles from './styles.module.scss';

export const Header = () => {
    const [menuModalVisible, setMenuModalVisible] = useState(false);

    const openMenuModal = () => {
        setMenuModalVisible(true);
    };

    const closeMenuModal = () => {
        setMenuModalVisible(false);
    };

    return (
        <header className={styles.header}>
            <div>
                <ul>
                    <li className={styles.logo}>
                        <a href="">
                            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="logo" />
                        </a>
                    </li>
                    <li className={styles.link}>
                        <a href="">Movies</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">TV Shows</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">People</a>
                    </li>
                </ul>
                <ul>
                    <li className={styles.link}>
                        <a href="">Login</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">Join TMDB</a>
                    </li>
                    <li className={styles.search}>
                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg" alt="search" />
                    </li>
                    <li className={styles.menu} onClick={openMenuModal}>
                        <img src={menuIcon} alt="menu" />
                    </li>
                </ul>
            </div>
            <MenuModal visible={menuModalVisible} onClose={closeMenuModal} />
        </header>
    );
};
