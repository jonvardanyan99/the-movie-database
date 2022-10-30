import { useState } from 'react';
import format from 'date-fns/format';

import { CategorySwitch } from '../../../../components/CategorySwitch';
import { MoviesList } from '../../../../components/MoviesList';
import { TMDB_API_KEY } from '../../../../configs';
import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

const categories = [
    'Movies',
    'TV',
];

export const FreeToWatch = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDataChange = category => {
        setLoading(true);

        let URL;
        let dateKey;

        if (category === categories[0]) {
            URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
            dateKey = 'release_date';
        } else if (category === categories[1]) {
            URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
            dateKey = 'first_air_date';
        }

        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const movies = data.results.map(result => ({
                    id: result.id,
                    name: result.title,
                    date: format(new Date(result[dateKey]), 'dd MMM y'),
                    photo: `https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`,
                    popularity: result.vote_average * 10,
                }))
                setMovies(movies);

                setLoading(false);
            })
    }

    return (
        <article className={styles['free-to-watch']}>
            <CategorySwitch title="Free To Watch" categories={categories} onChange={handleDataChange} />
            {loading ? <Loader cssOverride={{ marginTop: '20px' }} /> : <MoviesList movies={movies} />}
        </article>
    )
}