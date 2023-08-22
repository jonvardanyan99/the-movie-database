import { useState } from 'react';

import { FilmsVerticalList } from '../../components/FilmsVerticalList';
import { useQuery } from '../../hooks/useQuery'; 

import styles from './styles.module.scss';

export const Movies = () => {
    const [pageNum, setPageNum] = useState(1);
    const {loading, data = {}} = useQuery({ url: '/movie/popular', params: `&language=en-US&page=${pageNum}` });

    const handlePageChange = () => {
        setPageNum(pageNum + 1);
    };

    return (
        <div className={styles.movies}>
            <FilmsVerticalList
                title='Popular Movies'
                loading={loading}
                data={data}
                handlePageChange={handlePageChange}
                mediaType='movie'
            />
        </div>
    )
};