import { CategorySwitch } from '../../../../components/CategorySwitch';
import { MoviesList } from '../../../../components/MoviesList';

import styles from './styles.module.scss';

const categories = [
    'Today',
    'Last Week',
];

const movies = [
    {
        id: 1,
        name: 'Lucifer',
        date: '25 Jan 2016',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/ekZobS8isE6mA53RAiGDG93hBxL.jpg',
    },
    {
        id: 2,
        name: 'The Valet',
        date: '11 May 2022',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/q7FmdJHKMLIC4XgWfcFRIu2iVdL.jpg',
    },
    {
        id: 3,
        name: 'The Takedown',
        date: '06 May 2022',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/h5hVeCfYSb8gIO0F41gqidtb0AI.jpg',
    },
    {
        id: 4,
        name: 'Encanto',
        date: '24 Nov 2021',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    },
    {
        id: 5,
        name: 'Grey"s Anatomy',
        date: '27 Mar 2005',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/zPIug5giU8oug6Xes5K1sTfQJxY.jpg',
    },
    {
        id: 6,
        name: 'The Flash',
        date: '07 Oct 2014',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg',
    },
    {
        id: 7,
        name: 'Silverton Siege',
        date: '27 Apr 2022',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/5HruMN0vvl84AqD7sCDXFNO4RhP.jpg',
    },
    {
        id: 8,
        name: 'Moon Knight',
        date: '30 Mar 2022',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/vKDUmKO6F9bSKKyHhg7YGbgcEeF.jpg',
    },
    {
        id: 9,
        name: 'The Contractor',
        date: '10 Mar 2022',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/rJPGPZ5soaG27MK90oKpioSiJE2.jpg',
    },
    {
        id: 10,
        name: 'SPY x FAMILY',
        date: '09 Apr 2022',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/nShEY0JnMOsvdhEnmYvL9mowIKz.jpg',
    },
    {
        id: 11,
        name: 'Doctor Strange',
        date: '25 Oct 2016',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
    },
    {
        id: 12,
        name: 'Doctor Strange',
        date: '25 Oct 2016',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
    },
    {
        id: 13,
        name: 'Doctor Strange',
        date: '25 Oct 2016',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
    },
    {
        id: 14,
        name: 'Doctor Strange',
        date: '25 Oct 2016',
        photo: 'https://www.themoviedb.org/t/p/w220_and_h330_face/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
    },
];

export const Trending = () => {
    return (
        <article className={styles.trending}>
            <CategorySwitch title="Trending" categories={categories} />
            <MoviesList movies={movies} />
            <img src="https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg" />
        </article>
    )
}