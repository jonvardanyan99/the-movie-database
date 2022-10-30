import { useState } from 'react';
import format from 'date-fns/format';

import { CategorySwitch } from '../../../../components/CategorySwitch';
import { MoviesList } from '../../../../components/MoviesList';
import { TMDB_API_KEY } from '../../../../configs';
import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

const categories = [
    'Streaming',
    'On TV',
];

export const Popular = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDataChange = category => {
        if (category === categories[0]) {
            setLoading(true);

            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
                .then(response => response.json())
                .then(data => {
                    const movies = data.results.map(result => ({
                        id: result.id,
                        name: result.title,
                        date: format(new Date(result.release_date), 'dd MMM y'),
                        photo: `https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`,
                        popularity: result.vote_average * 10,
                    }));
                    setMovies(movies);
                    
                    setLoading(false);
                });
        } else if (category === categories[1]) {
            setLoading(true);

            fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
                .then(response => response.json())
                .then(data => {
                    const movies = data.results.map(result => ({
                        id: result.id,
                        name: result.name,
                        date: format(new Date(result.first_air_date), 'dd MMM y'),
                        photo: `https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`,
                        popularity: result.vote_average * 10,
                    }));
                    setMovies(movies);

                    setLoading(false);
                });
        }
    }

    return (
        <article className={styles.popular}>
            <CategorySwitch title="What's Popular" categories={categories} onChange={handleDataChange} />
            {loading ? <Loader cssOverride={{ marginTop: '20px' }} /> : <MoviesList movies={movies} />}
        </article>
    )
}