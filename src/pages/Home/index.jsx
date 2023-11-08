import { React } from 'react';

import { FreeToWatch } from './components/FreeToWatch';
import { Join } from './components/Join';
import { Popular } from './components/Popular';
import { Trailers } from './components/Trailers';
import { Trending } from './components/Trending';
import { Welcome } from './components/Welcome';
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
