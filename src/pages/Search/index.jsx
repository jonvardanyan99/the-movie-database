import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

import { useQuery } from '../../hooks/useQuery';
import { LoaderSmall } from '../../components/Loader/LoaderSmall';
import { Pagination } from '../../components/Pagination';

import { SearchDataDisplay } from './components/SearchDataDisplay';
import styles from './styles.module.scss';

export const Search = () => {
    const params = useParams();
    const [movieCurrPage, setMovieCurrPage] = useState(1);
    const [tvCurrPage, setTvCurrPage] = useState(1);
    const [personCurrPage, setPersonCurrPage] = useState(1);

    const {loading: movieLoading, data: movie} = useQuery({ url: '/search/movie', params: `&language=en-US&query=${params.name}&page=${movieCurrPage}&include_adult=false` });
    const {loading: tvLoading, data: tv} = useQuery({ url: '/search/tv', params: `&language=en-US&query=${params.name}&page=${tvCurrPage}&include_adult=false` });
    const {loading: personLoading, data: person} = useQuery({ url: '/search/person', params: `&language=en-US&query=${params.name}&page=${personCurrPage}&include_adult=false` });

    let loading;
    let data;
    let currPage;
    let onPageChange;
    let totalPages;

    if (params.category === 'movie') {
        loading = movieLoading;
        data = movie;
        currPage = movieCurrPage;
        onPageChange = setMovieCurrPage;
        totalPages = movie?.total_pages;
    } else if (params.category === 'tv') {
        loading = tvLoading;
        data = tv;
        currPage = tvCurrPage;
        onPageChange = setTvCurrPage;
        totalPages = tv?.total_pages;
    } else if (params.category === 'person') {
        loading = personLoading;
        data = person;
        currPage = personCurrPage;
        onPageChange = setPersonCurrPage;
        totalPages = person?.total_pages;
    };

    return (
        <div className={styles.search}>
            <section>
                <div>
                    <div>Search Results</div>
                    <ul>
                        <Link to={`movie/${params.name}`}>
                            <li>
                                <span>Movies</span>
                                {movieLoading ? <LoaderSmall /> :
                                <span className={styles['total-results']}>{movie?.total_results.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })}</span>}
                            </li>
                        </Link>
                        <Link to={`tv/${params.name}`}>
                            <li>
                                <span>TV Shows</span>
                                {tvLoading ? <LoaderSmall /> :
                                <span className={styles['total-results']}>{tv?.total_results.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })}</span>}
                            </li>
                        </Link>
                        <Link to={`person/${params.name}`}>
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
                    loading={loading}
                    data={data}
                />
                <Pagination
                    currPage={currPage}
                    onPageChange={onPageChange}
                    totalPages={totalPages || 0}
                />
            </div>
        </div>
    );
};