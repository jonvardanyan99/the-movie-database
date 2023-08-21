import { Welcome } from './components/Welcome';
import { Popular } from './components/Popular';
import { FreeToWatch } from './components/FreeToWatch';
import { Trailers } from './components/Trailers';
import { Trending } from './components/Trending';
import { Join } from './components/Join';

import styles from './styles.module.scss';

export const Home = () => {
    return (
        <div className={styles.home}>
            <div>
                <Welcome />
                <Popular />
                <FreeToWatch />
                <Trailers />
                <Trending />
                <Join />
            </div>
        </div>
    );
};