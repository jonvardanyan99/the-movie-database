import { useState } from 'react';

import { FilmsVerticalList } from '../../components/FilmsVerticalList';
import { useQuery } from '../../hooks/useQuery';

import styles from './styles.module.scss';

export const TVs = () => {
    const [pageNum, setPageNum] = useState(1);
    const {loading, data = {}} = useQuery({ url: '/tv/popular', params: `&language=en-US&page=${pageNum}` });

    const handlePageChange = () => {
        setPageNum(pageNum + 1);
    };

    return (
        <div className={styles.tvs}>
            <FilmsVerticalList
                title='Popular TV Shows'
                loading={loading}
                data={data}
                handlePageChange={handlePageChange}
                mediaType='tv'
            />
        </div>
    );
};