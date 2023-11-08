import PropTypes from 'prop-types';
import { React } from 'react';
import { Link } from 'react-router-dom';

import { Loader } from '../Loader';
import { Percentage } from '../Percentage';
import styles from './styles.module.scss';

export const FilmsHorizontalList = ({ loading, data }) => {
  return loading ? (
    <Loader cssOverride={{ marginTop: '20px' }} />
  ) : (
    <div className={styles['films-horizontal-list']}>
      {data?.map(item => (
        <Link key={item.id} to={`/${item.mediaType}/${item.id}`}>
          <div>
            <img src={item.photo} alt={item.name} />
            <div>
              <Percentage percent={item.popularity} className={styles['film-percentage']} />
              <h4>{item.name}</h4>
              {item.date && <p>{item.date}</p>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

FilmsHorizontalList.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
