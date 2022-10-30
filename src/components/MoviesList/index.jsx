import PropTypes from 'prop-types';

import { Percentage } from '../Percentage';

import styles from './styles.module.scss';

export const MoviesList = ({ movies }) => {
    return (
        <section className={styles['movies-list']}>
            {movies.map(movie => (
                <div key={movie.id}>
                    <img src={movie.photo} alt="movie" />
                    <div>
                        <Percentage percent={movie.popularity} />
                        <h2>{movie.name}</h2>
                        <p>{movie.date}</p>
                    </div>
                </div>
            ))}
        </section>
    )
};

MoviesList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
}