import { useState } from 'react';

import { FilmsVerticalList } from '../../components/FilmsVerticalList';
import { useQuery } from '../../hooks/useQuery';

import styles from './styles.module.scss';

export const TopRatedMovies = () => {
    const [pageNum, setPageNum] = useState(1);
    const {loading, data = {}} = useQuery({ url: '/movie/top_rated', params: `&language=en-US&page=${pageNum}` });

    const handlePageChange = () => {
        setPageNum(pageNum + 1);
    };

    return (
        <div className={styles['top-rated']}>
            <FilmsVerticalList
                title='Top Rated Movies'
                loading={loading}
                data={data}
                handlePageChange={handlePageChange}
                mediaType='movie'
            />
        </div>
    );
};