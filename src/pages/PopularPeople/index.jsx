import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useQuery } from '../../hooks/useQuery';
import { Pagination } from '../../components/Pagination';

import { PeopleDataDisplay } from './components/PeopleDataDisplay';
import styles from './styles.module.scss';

export const PopularPeople = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const {loading, data} = useQuery({ url: '/person/popular', params: `&language=en-US&page=${currentPage}` });

    const pageParam = searchParams.get('page');

    useEffect(() => {
        if (pageParam) {
            setCurrentPage(+pageParam);
        };
    }, [pageParam]);

    const handlePageParamChange = page => {
        setSearchParams({ page }, { replace: true });
    };

    return (
        <div className={styles['popular-people']}>
            <article>
                <h2>Popular People</h2>
                <PeopleDataDisplay loading={loading} data={data || {}} />
                {loading ? null :
                <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageParamChange}
                    totalPages={data?.total_pages || 0}
                />}
            </article>
        </div>
    );
};