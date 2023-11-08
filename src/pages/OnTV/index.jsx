import { React, useState } from 'react';

import { FilmsVerticalList } from '../../components/FilmsVerticalList';
import { useQuery } from '../../hooks/useQuery';
import styles from './styles.module.scss';

export const OnTV = () => {
  const [pageNum, setPageNum] = useState(1);
  const { loading, data = {} } = useQuery({
    url: '/tv/on_the_air',
    params: `&language=en-US&page=${pageNum}`,
  });

  const handlePageChange = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <div className={styles['on-the-air']}>
      <FilmsVerticalList
        title="Currently Airing TV Shows"
        loading={loading}
        data={data}
        handlePageChange={handlePageChange}
        mediaType="tv"
      />
    </div>
  );
};
