import PropTypes from 'prop-types';
import { React, useEffect, useRef, useState } from 'react';

import { Loader } from '../../../../components/Loader';
import { LoaderSmall } from '../../../../components/Loader/LoaderSmall';
import { Department } from './components/Department';
import styles from './styles.module.scss';

export const Credits = ({
  loading,
  name,
  knownForDepartment,
  creditsLoading,
  creditsData,
  movieCount,
  tvCount,
}) => {
  const [mediaTypeVisible, setMediaTypeVisible] = useState(false);
  const [departmentTypeVisible, setDepartmentTypeVisible] = useState(false);
  const [mediaType, setMediaType] = useState('all');
  const [departmentType, setDepartmentType] = useState('all');
  const mediaTypeRef = useRef();
  const departmentTypeRef = useRef();

  if (creditsData.cast?.length > 0) {
    for (let i = 0; i <= creditsData.cast.length - 2; i++) {
      for (let j = i + 1; j <= creditsData.cast.length - 1; j++) {
        if (creditsData.cast[i].id === creditsData.cast[j].id) {
          if ('episode_count' in creditsData.cast[i] && 'episode_count' in creditsData.cast[j]) {
            creditsData.cast[i].secondEpisodeCount = creditsData.cast[j].episode_count;
          }

          if ('character' in creditsData.cast[i] && 'character' in creditsData.cast[j]) {
            creditsData.cast[i].secondCharacter = creditsData.cast[j].character;
          }

          creditsData.cast.splice(j, 1);
          break;
        }
      }
    }
  }

  if (creditsData.crew?.length > 0) {
    for (let i = 0; i <= creditsData.crew.length - 2; i++) {
      let k = 1;

      for (let j = i + 1; j <= creditsData.crew.length - 1; j++) {
        if (creditsData.crew[i].id === creditsData.crew[j].id) {
          creditsData.crew[j].id += k;
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

  if (creditsData.cast?.length === 0 && creditsData.crew?.length === 0) {
    noResults = true;
  }

  const castData =
    mediaType === 'all'
      ? creditsData.cast
      : creditsData.cast.filter(item => item.media_type === mediaType);
  const crewData =
    mediaType === 'all'
      ? creditsData.crew
      : creditsData.crew.filter(item => item.media_type === mediaType);

  const crewDepartments = [...new Set(crewData?.map(item => item.department))];

  let departmentsArray = crewDepartments.map(department => {
    const departmentCount = crewData.filter(item => item.department === department).length;

    return [department, departmentCount];
  });

  if (creditsData.cast?.length > 0) {
    departmentsArray.push(['Acting', castData.length]);
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

  const crewDepartmentsList = [...new Set(creditsData.crew?.map(item => item.department))];

  const departmentsList = crewDepartmentsList.map(department => {
    const departmentCount = creditsData.crew.filter(item => item.department === department).length;

    return [department, departmentCount];
  });

  if (creditsData.cast?.length > 0) {
    departmentsList.push(['Acting', castData.length]);
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
                      Movies <span>{movieCount}</span>
                    </button>
                    <button type="button" onClick={() => handleMediaTypeChange('tv')}>
                      TV Shows <span>{tvCount}</span>
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
  creditsLoading: PropTypes.bool.isRequired,
  creditsData: PropTypes.shape({}).isRequired,
  movieCount: PropTypes.number.isRequired,
  tvCount: PropTypes.number.isRequired,
};
