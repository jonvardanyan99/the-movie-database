import PropTypes from 'prop-types';
import { React } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export const DataDisplay = ({ department, dateValue, data }) => {
  const dateValueData = data.filter(item => {
    const date = item.release_date || item.first_air_date;
    const filterDateValue = date ? new Date(date).getFullYear() : 'planned';

    return filterDateValue === dateValue;
  });

  if (dateValue === 'planned') {
    dateValueData.reverse();
  } else {
    dateValueData.sort((a, b) => {
      const dateA = new Date(a.release_date || a.first_air_date);
      const dateB = new Date(b.release_date || b.first_air_date);

      return dateB - dateA;
    });
  }

  return (
    <div className={styles['data-display']}>
      {dateValueData.map(item => (
        <div key={item.id}>
          <span className={dateValue === 'planned' ? styles.planned : ''}>
            {dateValue === 'planned'
              ? '—'
              : new Date(item.release_date || item.first_air_date).getFullYear()}
          </span>
          <h4 className={item.adult ? styles.adult : ''}>
            <Link to={`/${item.media_type}/${item.id}`}>{item.title || item.name}</Link>
            {department === 'Acting' ? (
              <>
                {item.episode_count || item.character ? (
                  <span>
                    {item.episode_count && (
                      <span className={styles['episode-count']}>
                        {item.episode_count > 1
                          ? ` (${item.episode_count} episodes)`
                          : ` (${item.episode_count} episode)`}
                      </span>
                    )}
                    {item.character && (
                      <>
                        {' as '}
                        <span className={styles['main-info']}>{item.character}</span>
                      </>
                    )}
                  </span>
                ) : null}
                {item.secondEpisodeCount || item.secondCharacter ? (
                  <span>
                    {item.secondEpisodeCount && (
                      <span className={styles['episode-count']}>
                        {item.secondEpisodeCount > 1
                          ? ` (${item.secondEpisodeCount} episodes)`
                          : ` (${item.secondEpisodeCount} episode)`}
                      </span>
                    )}
                    {item.secondCharacter && (
                      <>
                        {' as '}
                        <span className={styles['main-info']}>{item.secondCharacter}</span>
                      </>
                    )}
                  </span>
                ) : null}
              </>
            ) : (
              <>
                {item.episode_count || item.job ? (
                  <span>
                    {item.episode_count && (
                      <span className={styles['episode-count']}>
                        {item.episode_count > 1
                          ? ` (${item.episode_count} episodes)`
                          : ` (${item.episode_count} episode)`}
                      </span>
                    )}
                    {item.job && (
                      <>
                        {' ... '}
                        <span className={styles['main-info']}>{item.job}</span>
                      </>
                    )}
                  </span>
                ) : null}
                {item.secondEpisodeCount || item.secondJob ? (
                  <span>
                    {item.secondEpisodeCount && (
                      <span className={styles['episode-count']}>
                        {item.secondEpisodeCount > 1
                          ? ` (${item.secondEpisodeCount} episodes)`
                          : ` (${item.secondEpisodeCount} episode)`}
                      </span>
                    )}
                    {item.secondJob && (
                      <>
                        {' ... '}
                        <span className={styles['main-info']}>{item.secondJob}</span>
                      </>
                    )}
                  </span>
                ) : null}
              </>
            )}
          </h4>
        </div>
      ))}
    </div>
  );
};

DataDisplay.propTypes = {
  department: PropTypes.string.isRequired,
  dateValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
