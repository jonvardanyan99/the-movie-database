import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { React } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Loader } from '../../../../components/Loader';
import styles from './styles.module.scss';

export const SearchDataDisplay = ({ loading, data }) => {
  const params = useParams();

  let noResultWord;

  if (data.results?.length === 0) {
    if (params.category === 'movie') {
      noResultWord = 'movies';
    } else if (params.category === 'tv') {
      noResultWord = 'TV shows';
    } else if (params.category === 'person') {
      noResultWord = 'people';
    }
  }

  if (Object.keys(data).length === 0) {
    noResultWord = 'films';
  }

  let content;

  if (data.results?.length > 0) {
    content = data.results.map(result => {
      const name = result.title || result.name;
      const date = result.release_date || result.first_air_date;

      return params.category !== 'person' ? (
        <div key={result.id} className={styles.film}>
          <Link to={`/${params.category}/${result.id}`}>
            {result.poster_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${result.poster_path}`}
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
            <Link to={`/${params.category}/${result.id}`}>
              <h2>{name}</h2>
            </Link>
            {date && <p>{format(new Date(date), 'LLLL d, y')}</p>}
            {result.overview && <p className={styles.overview}>{result.overview}</p>}
          </div>
        </div>
      ) : (
        <div key={result.id} className={styles.person}>
          <Link to={`/${params.category}/${result.id}`}>
            {result.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w90_and_h90_face${result.profile_path}`}
                alt={result.name}
              />
            ) : (
              <div className={styles['no-image']}>
                <img
                  src={
                    result.gender === 1
                      ? 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg'
                      : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                  }
                  alt={result.name}
                />
              </div>
            )}
          </Link>
          <div>
            <Link to={`/${params.category}/${result.id}`}>
              <h2>{result.name}</h2>
            </Link>
            <p>
              <span>{result.known_for_department}</span>
              {result.known_for.map((item, index, arr) => {
                const filmName = item.title || item.name;
                let text = `${filmName},`;

                if (index === arr.length - 1) {
                  text = filmName;
                }

                return (
                  <Link key={item.id} to={`/${item.media_type}/${item.id}`}>
                    {text}
                  </Link>
                );
              })}
            </p>
          </div>
        </div>
      );
    });
  } else {
    content = <p>There are no {noResultWord} that matched your query.</p>;
  }

  return (
    <div className={styles['search-data-display']}>
      {loading ? <Loader cssOverride={{ display: 'block', margin: '20px 0 0 20px' }} /> : content}
    </div>
  );
};

SearchDataDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
};
