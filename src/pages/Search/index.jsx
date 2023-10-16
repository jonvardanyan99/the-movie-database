import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useQuery } from '../../hooks/useQuery';
import { LoaderSmall } from '../../components/Loader/LoaderSmall';
import { Pagination } from '../../components/Pagination';

import { SearchDataDisplay } from './components/SearchDataDisplay';
import styles from './styles.module.scss';

export const Search = () => {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('query');
    const pageParam = searchParams.get('page');
    const [currentPage, setCurrentPage] = useState(1);

    const {loading: movieLoading, data: movie} = useQuery({ url: '/search/movie', params: `&language=en-US&query=${queryParam}&page=${currentPage}&include_adult=false` });
    const {loading: tvLoading, data: tv} = useQuery({ url: '/search/tv', params: `&language=en-US&query=${queryParam}&page=${currentPage}&include_adult=false` });
    const {loading: personLoading, data: person} = useQuery({ url: '/search/person', params: `&language=en-US&query=${queryParam}&page=${currentPage}&include_adult=false` });

    useEffect(() => {
        if (pageParam) {
            setCurrentPage(+pageParam);
        };
    }, [pageParam]);
    
    const handlePageParamChange = page => {
        setSearchParams({ query: queryParam, page }, { replace: true });
    };

    let loading;
    let data;
    let totalPages;

    if (params.category === 'movie') {
        loading = movieLoading;
        data = movie;
        totalPages = movie?.total_pages;
    } else if (params.category === 'tv') {
        loading = tvLoading;
        data = tv;
        totalPages = tv?.total_pages;
    } else if (params.category === 'person') {
        loading = personLoading;
        data = person;
        totalPages = person?.total_pages;
    };

    const search = `?query=${queryParam}&page=1`;

    return (
        <div className={styles.search}>
            <section>
                <div>
                    <div>Search Results</div>
                    <ul>
                        <Link to={{ pathname: '/search/movie', search }} className={params.category === 'movie' ? styles.active : ''}>
                            <li>
                                <span>Movies</span>
                                {movieLoading ? <LoaderSmall /> :
                                <span className={styles['total-results']}>{movie?.total_results.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })}</span>}
                            </li>
                        </Link>
                        <Link to={{ pathname: '/search/tv', search }} className={params.category === 'tv' ? styles.active : ''}>
                            <li>
                                <span>TV Shows</span>
                                {tvLoading ? <LoaderSmall /> :
                                <span className={styles['total-results']}>{tv?.total_results.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })}</span>}
                            </li>
                        </Link>
                        <Link to={{ pathname: '/search/person', search }} className={params.category === 'person' ? styles.active : ''}>
                            <li>
                                <span>People</span>
                                {personLoading ? <LoaderSmall /> :
                                <span className={styles['total-results']}>{person?.total_results.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })}</span>}
                            </li>
                        </Link>
                    </ul>
                </div>
                <p>
                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-636-circle-info-06837a451a09552349b182d84ae84f26308efee8f7e8ddca255bd5dbc4a66ea4.svg" alt="info" />
                    Tip: You can use the 'y:' filter to narrow your results by year. Example: 'star wars y:1977'.
                </p>
            </section>
            <div>
                <SearchDataDisplay
                    loading={loading || false}
                    data={data || {}}
                />
                {loading ? null :
                <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageParamChange}
                    totalPages={totalPages || 0}
                />}
            </div>
        </div>
    );
};