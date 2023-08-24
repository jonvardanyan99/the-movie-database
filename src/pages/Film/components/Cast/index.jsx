import { useParams, Link } from 'react-router-dom';

import { useQuery } from '../../../../hooks/useQuery';
import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

export const Cast = () => {
    const params = useParams();

    let endpoint;

    if (params.mediaType === 'movie') {
        endpoint = 'credits';
    } else if (params.mediaType === 'tv') {
        endpoint = 'aggregate_credits';
    };

    const {loading, data} = useQuery({ url: `/${params.mediaType}/${params.id}/${endpoint}`, params: '&language=en-US' });

    return (
        <div className={styles.cast}>
            <h2>{params.mediaType === 'movie' ? 'Top Billed Cast' : 'Series Cast'}</h2>
            {loading ? <Loader /> : (
                data?.cast.length > 0 ? (
                    <>
                        <section>
                        {
                            data.cast.slice(0, 9).map(item => (
                                <div key={item.id} className={styles['cast-member']}>
                                    <Link to={`/person/${item.id}`}>
                                        {item.profile_path ?
                                        <img
                                            src={`https://www.themoviedb.org/t/p/w138_and_h175_face${item.profile_path}`}
                                            alt={item.name}
                                        /> :
                                        <div>
                                            <img
                                                src={item.gender === 1 ?
                                                'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg' :
                                                'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}
                                                alt={item.name}
                                            />
                                        </div>}
                                    </Link>
                                    <div>
                                        <Link to={`/person/${item.id}`}>
                                            <h4>{item.name}</h4>
                                        </Link>
                                        <p>{params.mediaType === 'movie' ? item.character : item.roles[0].character}</p>
                                        {params.mediaType === 'tv' &&
                                        <p>{item.roles[0].episode_count} {item.roles[0].episode_count > 1 ? 'Episodes' : 'Episode'}</p>}
                                    </div>
                                </div>
                            ))
                        }
                        {data.cast.length + data.crew.length > 9 && (
                            <div className={styles['view-more']}>
                                <Link to={`/${params.mediaType}/${params.id}/cast`}>
                                    <div>
                                        <span>View More</span>
                                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-830-arrow-thin-right-5c2f4e65afc985448cd9042f9d64426f1e002fbd3c2546053d190fa27f77600f.svg" alt="arrow right" />
                                    </div>
                                </Link>
                            </div>
                        )}
                        </section>
                        <Link to={`/${params.mediaType}/${params.id}/cast`}>
                            <p>Full Cast & Crew</p>
                        </Link>
                    </>
                ) :
                <p>We don't have any cast added to this movie. You can help by adding some!</p>
            )}
        </div>
    );
};