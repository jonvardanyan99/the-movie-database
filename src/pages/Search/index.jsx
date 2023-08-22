import { useParams } from 'react-router-dom';
import format from 'date-fns/format';

import { useQuery } from '../../hooks/useQuery';
import { Loader } from '../../components/Loader';
import { LoaderSmall } from '../../components/Loader/LoaderSmall';

import styles from './styles.module.scss';

export const Search = () => {
    const params = useParams();
    const {loading: movieLoading, data: movie} = useQuery({ url: '/search/movie', params: `&language=en-US&query=${params.name}&page=1&include_adult=false` });
    const {loading: tvLoading, data: tv} = useQuery({ url: '/search/tv', params: `&language=en-US&query=${params.name}&page=1&include_adult=false` });
    const {loading: personLoading, data: person} = useQuery({ url: '/search/person', params: `&language=en-US&query=${params.name}&page=1&include_adult=false` });

    return (
        <div className={styles.search}>
            <section>
                <div>
                    <div>Search Results</div>
                    <ul>
                        <li>
                            <span>Movies</span>
                            {movieLoading ? <LoaderSmall /> :
                            <span className={styles['total-results']}>{movie?.total_results.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })}</span>}
                        </li>
                        <li>
                            <span>TV Shows</span>
                            {tvLoading ? <LoaderSmall /> :
                            <span className={styles['total-results']}>{tv?.total_results.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })}</span>}
                        </li>
                        <li>
                            <span>People</span>
                            {personLoading ? <LoaderSmall /> :
                            <span className={styles['total-results']}>{person?.total_results.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })}</span>}
                        </li>
                    </ul>
                </div>       
                <p>
                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-636-circle-info-06837a451a09552349b182d84ae84f26308efee8f7e8ddca255bd5dbc4a66ea4.svg" alt="info" />
                    Tip: You can use the 'y:' filter to narrow your results by year. Example: 'star wars y:1977'.
                </p>
            </section>
            <section>
                {movieLoading ? <Loader cssOverride={{ marginTop: '20px' }} /> : (
                    movie?.results.length > 0 ? (
                        movie.results.map(item => (
                            <div key={item.id}>
                                {item.poster_path ?
                                <img src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path}`} alt={item.title} /> :
                                <div className={styles['no-image']}>
                                    <img src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt={item.title} />
                                </div>}
                                <div>
                                    <h2>{item.title}</h2>
                                    {item.release_date && <p>{format(new Date(item.release_date), 'LLLL d, y')}</p>}
                                    {item.overview && <p className={styles.overview}>{item.overview.length > 225 ? `${item.overview.slice(0, 225)}...` : item.overview}</p>}
                                </div>
                            </div>
                        ))
                    ) : <p>There are no movies that matched your query.</p>
                )}
            </section>
        </div>
    );
};