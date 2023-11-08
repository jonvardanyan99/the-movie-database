import { PropTypes } from 'prop-types';
import { React } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Loader } from '../../../../components/Loader';
import styles from './styles.module.scss';

export const Overview = ({ loading, name, date, posterPath }) => {
  const params = useParams();

  return (
    <div className={styles.overview}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {posterPath && (
            <Link to={`/${params.mediaType}/${params.id}`}>
              <img
                src={`https://www.themoviedb.org/t/p/w58_and_h87_face${posterPath}`}
                alt={name}
              />
            </Link>
          )}
          <div>
            <h2>
              <Link to={`/${params.mediaType}/${params.id}`}>{name}</Link>
              {date && <span> ({new Date(date).getFullYear()})</span>}
            </h2>
            <Link to={`/${params.mediaType}/${params.id}`}>
              <p>← Back to main</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

Overview.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
};
