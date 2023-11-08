import { React, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import closeIconGrey from '../../assets/icons/closeGrey.png';
import closeIcon from '../../assets/icons/closeWhite.png';
import menuIcon from '../../assets/icons/menu.png';
import searchIcon from '../../assets/icons/search.png';
import { useQuery } from '../../hooks/useQuery';
import { LoaderSmall } from '../Loader/LoaderSmall';
import { MenuModal } from './components/MenuModal';
import styles from './styles.module.scss';

export const Header = () => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query');

  const { loading: movieLoading, data: movie } = useQuery({
    url: '/search/movie',
    params: `&language=en-US&query=${inputValue}&page=1&include_adult=false`,
    skip: !inputValue,
  });
  const { loading: tvLoading, data: tv } = useQuery({
    url: '/search/tv',
    params: `&language=en-US&query=${inputValue}&page=1&include_adult=false`,
    skip: !inputValue,
  });
  const { loading: personLoading, data: person } = useQuery({
    url: '/search/person',
    params: `&language=en-US&query=${inputValue}&page=1&include_adult=false`,
    skip: !inputValue,
  });

  let isSearchPathname;

  if (
    location.pathname === '/search/movie' ||
    location.pathname === '/search/tv' ||
    location.pathname === '/search/person'
  ) {
    isSearchPathname = true;
  } else {
    isSearchPathname = false;
  }

  useEffect(() => {
    if (queryParam) {
      setInputValue(queryParam);
    }
  }, [queryParam]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    global.addEventListener('click', handleClickOutside);

    return () => global.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchVisible && !isSearchPathname && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchPathname, searchVisible]);

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

  const handleKeyDown = event => {
    if (event.key === 'Enter' && inputValue.trim().length) {
      navigate({
        pathname: '/search/movie',
        search: `?query=${inputValue}&page=1`,
      });

      inputRef.current.blur();
      setIsFocused(false);
    }
  };

  const navigateToSearch = (mediaType, query) => {
    navigate({
      pathname: `/search/${mediaType}`,
      search: `?query=${query}&page=1`,
    });

    setIsFocused(false);
  };

  let noResults = false;

  if (movie && tv && person) {
    if (!movie.total_results && !tv.total_results && !person.total_results) {
      noResults = true;
    }
  }

  const clearButton = isFocused ? (
    <button type="button" onClick={() => setInputValue('')} onMouseDown={e => e.preventDefault()}>
      <img src={closeIconGrey} alt="clear" />
    </button>
  ) : null;

  return (
    <header className={styles.header}>
      <div>
        <div>
          <Link to="/">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="logo"
            />
          </Link>
          <div>
            Movies
            <ul>
              <Link to="/movies">
                <li>Popular</li>
              </Link>
              <Link to="/movies/now-playing">
                <li>Now Playing</li>
              </Link>
              <Link to="/movies/upcoming">
                <li>Upcoming</li>
              </Link>
              <Link to="/movies/top-rated">
                <li>Top Rated</li>
              </Link>
            </ul>
          </div>
          <div>
            TV Shows
            <ul>
              <Link to="/tvs">
                <li>Popular</li>
              </Link>
              <Link to="/tvs/airing-today">
                <li>Airing Today</li>
              </Link>
              <Link to="/tvs/on-the-air">
                <li>On TV</li>
              </Link>
              <Link to="/tvs/top-rated">
                <li>Top Rated</li>
              </Link>
            </ul>
          </div>
          <div>
            People
            <ul>
              <Link to={{ pathname: '/people', search: `?page=1` }}>
                <li>Popular People</li>
              </Link>
            </ul>
          </div>
        </div>
        <div>
          <a href="https://www.themoviedb.org/login">Login</a>
          <a href="https://www.themoviedb.org/signup">Join TMDB</a>
          <button
            type="button"
            className={styles.search}
            onClick={e => {
              e.stopPropagation();

              if (!isSearchPathname) {
                toggleSearching();
              }
            }}
          >
            {searchVisible && !isSearchPathname ? (
              <img src={closeIcon} alt="close" />
            ) : (
              <img
                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg"
                alt="search"
              />
            )}
          </button>
          <button type="button" className={styles.menu} onClick={openMenuModal}>
            <img src={menuIcon} alt="menu" />
          </button>
        </div>
      </div>
      {!searchVisible && !isSearchPathname ? null : (
        <section ref={searchContainerRef}>
          <div>
            <label htmlFor="searchBar">
              <img src={searchIcon} alt="search" />
              <div>
                <input
                  id="searchBar"
                  type="text"
                  ref={inputRef}
                  value={inputValue}
                  placeholder="Search for a movie, tv show, person..."
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                />
                {movieLoading || tvLoading || personLoading ? (
                  <LoaderSmall speedMultiplier={1} />
                ) : (
                  clearButton
                )}
              </div>
            </label>
          </div>
          {isFocused && inputValue && movie?.results[0]?.title && (
            <button type="button" onClick={() => navigateToSearch('movie', movie.results[0].title)}>
              <div>
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-9-film-4ea386ceaf360069e7a0a2c8a3ef4c046883afc49bf2511f77a8282b1ee705dc.svg"
                  alt="film"
                />
                <p>
                  <span>{movie?.results[0]?.title}</span> in Movies
                </p>
              </div>
            </button>
          )}
          {isFocused && inputValue && tv?.results[0]?.name && (
            <button type="button" onClick={() => navigateToSearch('tv', tv.results[0].name)}>
              <div>
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-87-tv-0ed68826577a0881c28305786e1524bb9c0ab426bb8b0dd637e80f80f338be08.svg"
                  alt="tv"
                />
                <p>
                  <span>{tv?.results[0]?.name}</span> in TV Shows
                </p>
              </div>
            </button>
          )}
          {isFocused && inputValue && person?.results[0]?.name && (
            <button
              type="button"
              onClick={() => navigateToSearch('person', person.results[0].name)}
            >
              <div>
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-7de7dfcae838579a18f4eebc5b8847230d154718e481c5cd01c477cfcbc85993.svg"
                  alt="user"
                />
                <p>
                  <span>{person?.results[0]?.name}</span> in People
                </p>
              </div>
            </button>
          )}
          {isFocused && inputValue && noResults && <div className={styles.error}>NO RESULTS</div>}
        </section>
      )}
      <MenuModal visible={menuModalVisible} onClose={closeMenuModal} />
    </header>
  );
};
