import { React } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Pagination } from '../../components/Pagination';
import { useQuery } from '../../hooks/useQuery';
import { PeopleDataDisplay } from './components/PeopleDataDisplay';
import styles from './styles.module.scss';

export const PopularPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');

  const { loading, data } = useQuery({
    url: '/person/popular',
    params: `&language=en-US&page=${pageParam}`,
  });

  const handlePageParamChange = page => {
    setSearchParams({ page });
  };

  return (
    <div className={styles['popular-people']}>
      <article>
        <h2>Popular People</h2>
        <PeopleDataDisplay loading={loading} data={data || {}} />
        {loading ? null : (
          <Pagination
            currentPage={+pageParam}
            onPageChange={handlePageParamChange}
            totalPages={500}
          />
        )}
      </article>
    </div>
  );
};
