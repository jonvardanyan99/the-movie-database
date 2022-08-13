import { Welcome } from './components/Welcome';
import { Popular } from './components/Popular';
import { FreeToWatch } from './components/FreeToWatch';
import { Trailers } from './components/Trailers';
import { Trending } from './components/Trending';
import { Join } from './components/Join';
import { LeaderBoard } from './components/LeaderBoard';

import styles from './styles.module.scss';


export const Home = () => {
    return (
        <section className={styles.home}>
            <div>
                <Welcome />
                <Popular />
                <FreeToWatch />
                <Trailers />
                <Trending />
                <Join />
                <LeaderBoard />
            </div>
        </section>
    )
}