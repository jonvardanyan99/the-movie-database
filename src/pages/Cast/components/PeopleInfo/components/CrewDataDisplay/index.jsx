import { React } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export const CrewDataDisplay = ({ department, data }) => {
  return (
    <div className={styles['crew-data-display']}>
      <h4>{department}</h4>
      {data
        .filter(item => item.department === department)
        .map(item => (
          <div key={item.id}>
            <Link to={`/person/${item.id}`}>
              {item.profile_path ? (
                <img
                  src={`https://www.themoviedb.org/t/p/w66_and_h66_face${item.profile_path}`}
                  alt={item.name}
                />
              ) : (
                <div className={styles['no-image']}>
                  <img
                    src={
                      item.gender === 1
                        ? 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg'
                        : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                    }
                    alt={item.name}
                  />
                </div>
              )}
            </Link>
            <div>
              <Link to={`/person/${item.id}`}>
                <h4>{item.name}</h4>
              </Link>
              <p>{item.job}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
