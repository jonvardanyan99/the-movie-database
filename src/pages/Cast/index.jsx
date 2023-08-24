import { useParams } from 'react-router-dom';

import { useQuery } from '../../hooks/useQuery';

import { Overview } from './components/Overview';
import { PeopleInfo } from './components/PeopleInfo';

export const Cast = () => {
    const params = useParams();

    const {loading, data} = useQuery({ url: `/${params.mediaType}/${params.id}`, params: '&language=en-US&page=1' });

    return (
        <div>
            <Overview
                loading={loading}
                name={data?.title || data?.name || ''}
                date={data?.release_date || data?.first_air_date || ''}
                posterPath={data?.poster_path || ''}
            />
            <PeopleInfo
                name={data?.title || data?.name || ''}
            />
        </div>
    );
};