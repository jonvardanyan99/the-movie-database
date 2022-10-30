import { useState } from 'react';
import format from 'date-fns/format';

import { CategorySwitch } from '../../../../components/CategorySwitch';
import { MoviesList } from '../../../../components/MoviesList';
import { TMDB_API_KEY } from '../../../../configs';
import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

const categories = [
    'Today',
    'Last Week',
];

export const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDataChange = category => {
        if (category === categories[0]) {
            setLoading(true);

            fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
                .then(response => response.json())
                .then(data => {
                    const movies = data.results.map(result => ({
                        id: result.id,
                        name: result.title,
                        date: format(new Date(result.release_date), 'dd MMM y'),
                        photo: `https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`,
                        popularity: result.vote_average * 10,
                    }))
                    setMovies(movies);

                    setLoading(false);
                })
        } else if (category === categories[1]) {
            setLoading(true);

            fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
                .then(response => response.json())
                .then(data => {
                    const movies = data.results.map(result => ({
                        id: result.id,
                        name: result.title,
                        date: format(new Date(result.release_date), 'dd MMM y'),
                        photo: `https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`,
                        popularity: result.vote_average * 10,
                    }))
                    setMovies(movies);

                    setLoading(false);
                })
        }
    }

    return (
        <article className={styles.trending}>
            <CategorySwitch title="Trending" categories={categories} onChange={handleDataChange} />
            {loading ? <Loader cssOverride={{ marginTop: '20px' }} /> : <MoviesList movies={movies} />}
            {loading ? null : <img src="https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg" alt="trending" />}
        </article>
    )
}