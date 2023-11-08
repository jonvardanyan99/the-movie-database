import PropTypes from 'prop-types';
import { React } from 'react';

import { DataDisplay } from './DataDisplay';
import styles from './styles.module.scss';

export const Department = ({ department, cast, crew }) => {
  const departmentData =
    department === 'Acting' ? cast : crew.filter(item => item.department === department);

  const dateValues = [
    ...new Set(
      departmentData?.map(item => {
        const date = item.release_date || item.first_air_date;
        const dateValue = date ? new Date(date).getFullYear() : 'planned';

        return dateValue;
      }),
    ),
  ];

  dateValues.sort((a, b) => {
    if (a === 'planned') return -1;
    if (b === 'planned') return 1;

    return b - a;
  });

  return (
    <div className={styles.department}>
      {dateValues.map(item => (
        <DataDisplay key={item} department={department} dateValue={item} data={departmentData} />
      ))}
    </div>
  );
};

Department.propTypes = {
  department: PropTypes.string.isRequired,
  cast: PropTypes.arrayOf(PropTypes.shape).isRequired,
  crew: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
