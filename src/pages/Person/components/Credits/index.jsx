import PropTypes from 'prop-types';
import { React, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../../../../components/Loader';
import { LoaderSmall } from '../../../../components/Loader/LoaderSmall';
import { useQuery } from '../../../../hooks/useQuery';
import { Department } from './components/Department';
import styles from './styles.module.scss';

export const Credits = ({ loading, name, knownForDepartment }) => {
  const params = useParams();
  const [mediaTypeVisible, setMediaTypeVisible] = useState(false);
  const [departmentTypeVisible, setDepartmentTypeVisible] = useState(false);
  const [mediaType, setMediaType] = useState('all');
  const [departmentType, setDepartmentType] = useState('all');
  const mediaTypeRef = useRef();
  const departmentTypeRef = useRef();

  const { loading: creditsLoading, data } = useQuery({
    url: `/person/${params.id}/combined_credits`,
    params: '&language=en-US',
  });

  if (data?.cast.length > 0) {
    for (let i = 0; i <= data.cast.length - 2; i++) {
      for (let j = i + 1; j <= data.cast.length - 1; j++) {
        if (data.cast[i].id === data.cast[j].id) {
          if ('episode_count' in data.cast[i] && 'episode_count' in data.cast[j]) {
            data.cast[i].secondEpisodeCount = data.cast[j].episode_count;
          }

          if ('character' in data.cast[i] && 'character' in data.cast[j]) {
            data.cast[i].secondCharacter = data.cast[j].character;
          }

          data.cast.splice(j, 1);
          break;
        }
      }
    }
  }

  if (data?.crew.length > 0) {
    for (let i = 0; i <= data.crew.length - 2; i++) {
      let k = 1;

      for (let j = i + 1; j <= data.crew.length - 1; j++) {
        if (data.crew[i].id === data.crew[j].id) {
          data.crew[j].id += k;
          k++;
        }
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (mediaTypeRef.current && !mediaTypeRef.current.contains(event.target)) {
        setMediaTypeVisible(false);
      }
    };

    global.addEventListener('click', handleClickOutside);

    return () => global.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (departmentTypeRef.current && !departmentTypeRef.current.contains(event.target)) {
        setDepartmentTypeVisible(false);
      }
    };

    global.addEventListener('click', handleClickOutside);

    return () => global.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMediaType = () => {
    setMediaTypeVisible(!mediaTypeVisible);
    setDepartmentTypeVisible(false);
  };

  const toggleDepartmentType = () => {
    setDepartmentTypeVisible(!departmentTypeVisible);
    setMediaTypeVisible(false);
  };

  const handleMediaTypeChange = newMediaType => {
    setMediaType(newMediaType);
    setDepartmentType('all');
  };

  const handleDepartmentTypeChange = newDepartmentType => {
    setDepartmentType(newDepartmentType);
    setMediaType('all');
  };

  const handleClearTypes = () => {
    setMediaType('all');
    setDepartmentType('all');
  };

  let noResults = false;

  if (data?.cast.length === 0 && data?.crew.length === 0) {
    noResults = true;
  }

  const movieCount = new Set();
  const tvCount = new Set();

  data?.cast.forEach(item => {
    const movieTitle = item.title;
    const tvName = item.name;

    if (movieTitle) {
      movieCount.add(movieTitle);
    }

    if (tvName) {
      tvCount.add(tvName);
    }
  });

  data?.crew.forEach(item => {
    const movieTitle = item.title;
    const tvName = item.name;

    if (movieTitle) {
      movieCount.add(movieTitle);
    }

    if (tvName) {
      tvCount.add(tvName);
    }
  });

  const castData =
    mediaType === 'all' ? data?.cast : data.cast.filter(item => item.media_type === mediaType);
  const crewData =
    mediaType === 'all' ? data?.crew : data.crew.filter(item => item.media_type === mediaType);

  const crewDepartments = [...new Set(crewData?.map(item => item.department))];

  let departmentsArray = crewDepartments.map(department => {
    const departmentCount = crewData.filter(item => item.department === department).length;

    return [department, departmentCount];
  });

  if (data?.cast.length > 0) {
    departmentsArray.push(['Acting', castData?.length]);
  }

  departmentsArray.sort(([, lengthA], [, lengthB]) => lengthB - lengthA);

  departmentsArray.sort(([departmentA], [departmentB]) => {
    if (departmentA === knownForDepartment) return -1;
    if (departmentB === knownForDepartment) return 1;

    return 0;
  });

  if (departmentType !== 'all') {
    departmentsArray = [departmentsArray.find(item => item[0] === departmentType)];
  }

  const crewDepartmentsList = [...new Set(data?.crew.map(item => item.department))];

  const departmentsList = crewDepartmentsList.map(department => {
    const departmentCount = data?.crew.filter(item => item.department === department).length;

    return [department, departmentCount];
  });

  if (data?.cast.length > 0) {
    departmentsList.push(['Acting', castData?.length]);
  }

  departmentsList.sort(([, lengthA], [, lengthB]) => lengthB - lengthA);

  return (
    <div className={styles.credits}>
      {!noResults &&
        (creditsLoading ? (
          <Loader />
        ) : (
          <>
            <div className={styles['filter-buttons']}>
              {mediaType !== 'all' || departmentType !== 'all' ? (
                <button type="button" className={styles.clear} onClick={handleClearTypes}>
                  Clear
                </button>
              ) : null}
              <div className={styles['media-type']}>
                <button
                  type="button"
                  className={mediaTypeVisible ? styles.active : ''}
                  ref={mediaTypeRef}
                  onClick={e => {
                    e.stopPropagation();

                    toggleMediaType();
                  }}
                >
                  All
                </button>
                {mediaTypeVisible && (
                  <div>
                    <button type="button" onClick={() => handleMediaTypeChange('movie')}>
                      Movies <span>{movieCount.size}</span>
                    </button>
                    <button type="button" onClick={() => handleMediaTypeChange('tv')}>
                      TV Shows <span>{tvCount.size}</span>
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.department}>
                <button
                  type="button"
                  className={departmentTypeVisible ? styles.active : ''}
                  ref={departmentTypeRef}
                  onClick={e => {
                    e.stopPropagation();

                    toggleDepartmentType();
                  }}
                >
                  Department
                </button>
                {departmentTypeVisible && (
                  <div>
                    {departmentsList.map((item, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => handleDepartmentTypeChange(item[0])}
                      >
                        {item[0]} <span>{item[1]}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {departmentsArray.map(department => (
              <div key={department[0]} className={styles['department-container']}>
                <h3>{department[0]}</h3>
                <Department department={department[0]} cast={castData} crew={crewData} />
              </div>
            ))}
          </>
        ))}
      {noResults && <p>{loading ? <LoaderSmall /> : name} doesn't have any credits.</p>}
    </div>
  );
};

Credits.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  knownForDepartment: PropTypes.string.isRequired,
};
