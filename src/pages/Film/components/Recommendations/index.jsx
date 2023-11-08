import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { React } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Loader } from '../../../../components/Loader';
import { LoaderSmall } from '../../../../components/Loader/LoaderSmall';
import { useQuery } from '../../../../hooks/useQuery';
import styles from './styles.module.scss';

export const Recommendations = ({ loading, name }) => {
  const params = useParams();
  const { loading: recommendationsLoading, data } = useQuery({
    url: `/${params.mediaType}/${params.id}/recommendations`,
    params: '',
  });

  const content =
    data?.results.length > 0 ? (
      data.results.map(result => {
        const filmName = result.title || result.name;
        const date = result.release_date || result.first_air_date;

        return (
          <div key={result.id}>
            <Link to={`/${result.media_type}/${result.id}`}>
              <div>
                {result.backdrop_path ? (
                  <img
                    src={`https://www.themoviedb.org/t/p/w250_and_h141_face${result.backdrop_path}`}
                    alt={filmName}
                  />
                ) : (
                  <div className={styles['no-image']}>
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                      alt={filmName}
                    />
                  </div>
                )}
                <div className={styles.date}>
                  <img
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-46-calendar-3e0931dfeba8f62c51e81dfa4364a6d836f3a03aaf739a51d0846902ee367645.svg"
                    alt="calendar"
                  />
                  {date && <span>{format(new Date(date), 'dd/MM/yyyy')}</span>}
                </div>
              </div>
            </Link>
            <div>
              <Link to={`/${result.media_type}/${result.id}`}>
                <h4>{filmName.length > 25 ? `${filmName.slice(0, 25)}...` : filmName}</h4>
              </Link>
              <span>{Math.round(result.vote_average * 10)}%</span>
            </div>
          </div>
        );
      })
    ) : (
      <p>
        We don't have enough data to suggest any movies based on{' '}
        {loading ? <LoaderSmall cssOverride={{ marginLeft: '5px' }} /> : name}. You can help by
        rating movies you've seen.
      </p>
    );

  return (
    <div className={styles.recommendations}>
      <h2>Recommendations</h2>
      <section style={{ display: recommendationsLoading ? 'unset' : 'flex' }}>
        {recommendationsLoading ? <Loader /> : content}
      </section>
    </div>
  );
};

Recommendations.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
