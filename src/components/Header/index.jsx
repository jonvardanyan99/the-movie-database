import styles from './styles.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div>
                <ul>
                    <li className={styles.logo}>
                        <a href="">
                            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" />
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
                    <li className={styles.link}>
                        <a href="">More</a>
                    </li>
                </ul>
                <ul>
                    <li className={styles.plus}>
                        <a href="">
                            <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-371-plus-white-0bac34f16124808a12ea863b4d9cc6e599dee7c0a80658cfe9ead26939e64517.svg" />
                        </a>
                    </li>
                    <li className={styles.language}>
                        <a href="">EN</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">Login</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">Join TMDB</a>
                    </li>
                    <li className={styles.search}>
                        <a href="">
                            <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg" />
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
};
