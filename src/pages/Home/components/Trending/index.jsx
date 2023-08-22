import { useState, useCallback } from 'react';
import format from 'date-fns/format';

import { CategorySwitch } from '../../../../components/CategorySwitch';
import { FilmsHorizontalList } from '../../../../components/FilmsHorizontalList';
import { useQuery } from '../../../../hooks/useQuery';

import styles from './styles.module.scss';

const categories = [
    'Today',
    'Last Week',
];

export const Trending = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    let URL;

    if (activeCategory === categories[0]) {
        URL = '/trending/movie/day';
    } else if (activeCategory === categories[1]) {
        URL = '/trending/movie/week';
    };

    const {loading, data} = useQuery({ url: URL, params: '&language=en-US&page=1' });

    const films = data?.results.map(result => ({
        id: result.id,
        name: result.title,
        date: result.release_date ? format(new Date(result.release_date), 'dd MMM y') : null,
        photo: `https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`,
        popularity: result.vote_average * 10,
        mediaType: result.media_type,
    })) || [];

    const handleDataChange = useCallback(category => {
        setActiveCategory(category); 
    }, []);

    return (
        <div
            className={styles.trending}
            style={{
                backgroundImage: loading ? '' : 'url(https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg)',
            }}
        >
            <CategorySwitch title="Trending" categories={categories} onChange={handleDataChange} />
            <FilmsHorizontalList
                loading={loading}
                data={films}
            />
        </div>
    );
};