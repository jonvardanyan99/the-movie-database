import { useState } from 'react';
import { Link } from 'react-router-dom';

import menuIcon from '../../assets/icons/menu.png';
import searchIcon from '../../assets/icons/search.png';
import closeIcon from '../../assets/icons/closeWhite.png';
import closeIconGrey from '../../assets/icons/closeGrey.png';
import { LoaderSmall } from '../Loader/LoaderSmall';
import { useQuery } from '../../hooks/useQuery';

import { MenuModal } from './components/MenuModal';
import styles from './styles.module.scss';

export const Header = () => {
    const [menuModalVisible, setMenuModalVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const {loading: movieLoading, data: movie} = useQuery({ url: '/search/movie', params: `&language=en-US&query=${inputValue}&page=1&include_adult=false` });
    const {loading: tvLoading, data: tv} = useQuery({ url: '/search/tv', params: `&language=en-US&query=${inputValue}&page=1&include_adult=false` });
    const {loading: personLoading, data: person} = useQuery({ url: '/search/person', params: `&language=en-US&query=${inputValue}&page=1&include_adult=false` });

    const openMenuModal = () => {
        setMenuModalVisible(true);
    };

    const closeMenuModal = () => {
        setMenuModalVisible(false);
    };

    const toggleSearching = () => {
        setSearchVisible(!searchVisible);
    };

    const handleChange = event => {
        setInputValue(event.target.value);
    };

    return (
        <header className={styles.header}>
            <div>
                <ul>
                    <li className={styles.logo}>
                        <Link to='/'>
                            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="logo" />
                        </Link>
                    </li>
                    <li className={styles.link}>
                        Movies
                        <ul>
                            <Link to='/movies'>
                                <li>Popular</li>
                            </Link>
                            <Link to='/movies/now-playing'>
                                <li>Now Playing</li>
                            </Link>
                            <Link to='/movies/upcoming'>
                                <li>Upcoming</li>
                            </Link>
                            <Link to='/movies/top-rated'>
                                <li>Top Rated</li>
                            </Link>
                        </ul>
                    </li>
                    <li className={styles.link}>
                        TV Shows
                        <ul>
                            <Link to='/tvs'>
                                <li>Popular</li>
                            </Link>
                            <Link to='/tvs/airing-today'>
                                <li>Airing Today</li>
                            </Link>
                            <Link to='/tvs/on-the-air'>
                                <li>On TV</li>
                            </Link>
                            <Link to='/tvs/top-rated'>
                                <li>Top Rated</li>
                            </Link>
                        </ul>
                    </li>
                    <li className={styles.link}>
                        People
                        <ul>
                            <Link to='/people'>
                                <li>Popular People</li>
                            </Link>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li className={styles.link}>
                        <a href="">Login</a>
                    </li>
                    <li className={styles.link}>
                        <a href="">Join TMDB</a>
                    </li>
                    <li className={styles.search} onClick={toggleSearching}>
                        {searchVisible ? 
                        <img src={closeIcon} alt="close" /> :
                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg" alt="search" />}
                    </li>
                    <li className={styles.menu} onClick={openMenuModal}>
                        <img src={menuIcon} alt="menu" />
                    </li>
                </ul>
            </div>
            {searchVisible &&
            <section>
                <div>
                    <label htmlFor="searchBar">
                        <img src={searchIcon} alt="search" />
                        <div>
                            <input id="searchBar" type="text" value={inputValue} placeholder="Search for a movie, tv show, person..." onChange={handleChange} autoFocus />
                            {(movieLoading || tvLoading || personLoading) ? <LoaderSmall speedMultiplier={1} /> : <img src={closeIconGrey} alt="clear" onClick={() => setInputValue('')} />}
                        </div>
                    </label>
                </div>
                {movie?.results[0]?.title &&
                <Link to={`/search/movie/${movie.results[0].title}`}>
                    <div className={styles['search-result']} onClick={() => setInputValue(movie?.results[0]?.title)}>
                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-9-film-4ea386ceaf360069e7a0a2c8a3ef4c046883afc49bf2511f77a8282b1ee705dc.svg" alt="film" />
                        <p>{movie?.results[0]?.title} <span>in Movies</span></p>
                    </div>
                </Link>}
                {tv?.results[0]?.name &&
                <Link to={`/search/tv/${tv.results[0].name}`}>
                    <div className={styles['search-result']} onClick={() => setInputValue(tv?.results[0]?.name)}>
                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-87-tv-0ed68826577a0881c28305786e1524bb9c0ab426bb8b0dd637e80f80f338be08.svg" alt="tv" />
                        <p>{tv?.results[0]?.name} <span>in TV Shows</span></p>
                    </div>
                </Link>}
                {person?.results[0]?.name &&
                <Link to={`/search/person/${person.results[0].name}`}>
                    <div className={styles['search-result']} onClick={() => setInputValue(person?.results[0]?.name)}>
                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-7de7dfcae838579a18f4eebc5b8847230d154718e481c5cd01c477cfcbc85993.svg" alt="user" />
                        <p>{person?.results[0]?.name} <span>in People</span></p>
                    </div>
                </Link>}
                {!movie?.results[0]?.title && !tv?.results[0]?.name && !person?.results[0]?.name && inputValue && (
                    <div className={styles.error}>
                        NO RESULTS
                    </div>
                )}
            </section>}
            <MenuModal visible={menuModalVisible} onClose={closeMenuModal} />
        </header>
    );
};
