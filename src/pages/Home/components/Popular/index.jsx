import { useState, useCallback } from 'react';
import format from 'date-fns/format';

import { CategorySwitch } from '../../../../components/CategorySwitch';
import { FilmsHorizontalList } from '../../../../components/FilmsHorizontalList';
import { useQuery } from '../../../../hooks/useQuery';

import styles from './styles.module.scss';

const categories = [
    'Streaming',
    'On TV',
];

export const Popular = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    let URL;
    let nameKey;
    let dateKey;
    let mediaType;

    if (activeCategory === categories[0]) {
        URL = '/movie/popular';
        nameKey = 'title';
        dateKey = 'release_date';
        mediaType = 'movie';
    } else if (activeCategory === categories[1]) {
        URL = '/tv/popular';
        nameKey = 'name';
        dateKey = 'first_air_date';
        mediaType = 'tv';
    };

    const {loading, data} = useQuery({ url: URL, params: '&language=en-US&page=1' });

    const films = data?.results.map(result => ({
        id: result.id,
        name: result[nameKey],
        date: result[dateKey] ? format(new Date(result[dateKey]), 'dd MMM y') : null,
        photo: `https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`,
        popularity: result.vote_average * 10,
        mediaType: mediaType,
    })) || [];

    const handleDataChange = useCallback(category => {
        setActiveCategory(category); 
    }, []);

    return (
        <div className={styles.popular}>
            <CategorySwitch title="What's Popular" categories={categories} onChange={handleDataChange} />
            <FilmsHorizontalList
                loading={loading}
                data={films}
            />
        </div>
    );
};