import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Loader } from '../Loader';
import { Percentage } from '../Percentage';
import styles from './styles.module.scss';

export const FilmsVerticalList = ({ title, loading, data, handlePageChange, mediaType }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    if (data) {
      setFilms(prevValues => {
        const uniqueNewFilms =
          data.results?.filter(result => !prevValues.some(item => item.id === result.id)) || [];

        return [...prevValues, ...uniqueNewFilms];
      });
    }
  }, [data]);

  return (
    <div className={styles['films-vertical-list']}>
      <h2>{title}</h2>
      <section>
        {films.map(film => {
          const name = film.title || film.name;
          const date = film.release_date || film.first_air_date;

          return (
            <div key={film.id}>
              <Link to={`/${mediaType}/${film.id}`}>
                {film.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${film.poster_path}`}
                    alt={name}
                  />
                ) : (
                  <div className={styles['no-image']}>
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                      alt={name}
                    />
                  </div>
                )}
              </Link>
              <div>
                <Percentage
                  percent={film.vote_average * 10}
                  className={styles['movie-percentage']}
                />
                <Link to={`/${mediaType}/${film.id}`}>
                  <h4>{name}</h4>
                </Link>
                {date && <p>{format(new Date(date), 'dd MMM y')}</p>}
              </div>
            </div>
          );
        })}
      </section>
      {loading ? (
        <Loader cssOverride={{ marginTop: '30px' }} />
      ) : (
        <button type="button" onClick={handlePageChange}>
          Load More
        </button>
      )}
    </div>
  );
};

FilmsVerticalList.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
  handlePageChange: PropTypes.func.isRequired,
  mediaType: PropTypes.string.isRequired,
};
