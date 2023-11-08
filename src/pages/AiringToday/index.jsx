import { React, useState } from 'react';

import { FilmsVerticalList } from '../../components/FilmsVerticalList';
import { useQuery } from '../../hooks/useQuery';
import styles from './styles.module.scss';

export const AiringToday = () => {
  const [pageNum, setPageNum] = useState(1);
  const { loading, data = {} } = useQuery({
    url: '/tv/airing_today',
    params: `&language=en-US&page=${pageNum}`,
  });

  const handlePageChange = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <div className={styles['airing-today']}>
      <FilmsVerticalList
        title="TV Shows Airing Today"
        loading={loading}
        data={data}
        handlePageChange={handlePageChange}
        mediaType="tv"
      />
    </div>
  );
};
