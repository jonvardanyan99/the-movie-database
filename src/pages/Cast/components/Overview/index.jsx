import { useParams, Link } from 'react-router-dom';

import { useQuery } from '../../../../hooks/useQuery';
import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

export const Overview = () => {
    const params = useParams();
    const {loading, data} = useQuery({ url: `/${params.mediaType}/${params.id}`, params: '&language=en-US&page=1' });

    const name = data?.title || data?.name;
    const date = data?.release_date || data?.first_air_date;

    return (
        <div className={styles.overview}>
            {loading ? <Loader /> : (
                <>
                    {data?.poster_path && (
                        <Link to={`/${params.mediaType}/${params.id}`}>
                            <img src={`https://www.themoviedb.org/t/p/w58_and_h87_face${data?.poster_path}`} alt={name} />
                        </Link>
                    )}
                    <div>
                        <h2>
                            <Link to={`/${params.mediaType}/${params.id}`}>
                                {name}
                            </Link>
                            {date && <span>({new Date(date).getFullYear()})</span>}
                        </h2>
                        <Link to={`/${params.mediaType}/${params.id}`}>
                            <p>← Back to main</p>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};