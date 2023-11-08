import { PropTypes } from 'prop-types';
import { React } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Loader } from '../../../../components/Loader';
import { useQuery } from '../../../../hooks/useQuery';
import { CrewDataDisplay } from './components/CrewDataDisplay';
import styles from './styles.module.scss';

export const PeopleInfo = ({ name }) => {
  const params = useParams();

  let endpoint;

  if (params.mediaType === 'movie') {
    endpoint = 'credits';
  } else if (params.mediaType === 'tv') {
    endpoint = 'aggregate_credits';
  }

  const { loading, data } = useQuery({
    url: `/${params.mediaType}/${params.id}/${endpoint}`,
    params: '&language=en-US',
  });

  if (data?.cast.length > 0) {
    for (let i = 0; i < data.cast.length - 1; i++) {
      for (let j = i + 1; j < data.cast.length; j++) {
        if (data.cast[i].id === data.cast[j].id) {
          data.cast[i].character = `${data.cast[i].character}, ${data.cast[j].character}`;
          data.cast.splice(j, 1);
          break;
        }
      }
    }
  }

  if (data?.crew.length) {
    for (let i = 0; i < data.crew.length - 1; i++) {
      for (let j = i + 1; j < data.crew.length; j++) {
        if (
          data.crew[i].id === data.crew[j].id &&
          data.crew[i].department === data.crew[j].department
        ) {
          data.crew[i].job = `${data.crew[i].job}, ${data.crew[j].job}`;
          data.crew.splice(j, 1);
          break;
        }
      }
    }
  }

  const departments = [...new Set(data?.crew.map(item => item.department))];
  departments.sort((a, b) => a.localeCompare(b));

  return (
    <div className={styles['people-info']}>
      {loading ? (
        <Loader />
      ) : (
        <section>
          <div className={styles.cast}>
            <h2>
              {params.mediaType === 'movie' ? 'Cast' : 'Series Cast'}{' '}
              <span>{data?.cast.length}</span>
            </h2>
            {data?.cast.length > 0 ? (
              data.cast.map(item => (
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
                    <p>
                      {params.mediaType === 'movie' ? item.character : item.roles[0].character}
                      {params.mediaType === 'tv' && (
                        <span>
                          {' '}
                          ({item.roles[0].episode_count}{' '}
                          {item.roles[0].episode_count > 1 ? 'Episodes' : 'Episode'})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>There are no cast records added to {name}.</p>
            )}
          </div>
          <div>
            <h2>
              {params.mediaType === 'movie' ? 'Crew' : 'Series Crew'}{' '}
              <span>{data?.crew.length}</span>
            </h2>
            {data?.crew.length > 0 ? (
              departments.map((department, index) => (
                <CrewDataDisplay key={index} department={department} data={data.crew} />
              ))
            ) : (
              <p>There are no crew records added to {name}.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

PeopleInfo.propTypes = {
  name: PropTypes.string.isRequired,
};
