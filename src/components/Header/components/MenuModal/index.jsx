import PropTypes from 'prop-types';
import { React, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import closeIcon from '../../../../assets/icons/close.png';
import closeIconGrey from '../../../../assets/icons/closeGrey.png';
import searchIcon from '../../../../assets/icons/search.png';
import { useQuery } from '../../../../hooks/useQuery';
import { LoaderSmall } from '../../../Loader/LoaderSmall';
import { Modal } from '../../../Modal';
import styles from './styles.module.scss';

export const MenuModal = ({ visible, onClose }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
      onClose();
    }
  };

  const navigateToSearch = (mediaType, query) => {
    navigate({
      pathname: `/search/${mediaType}`,
      search: `?query=${query}&page=1`,
    });

    setIsFocused(false);
    onClose();
  };

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

  let noResults = false;

  if (movie && tv && person) {
    if (!movie.total_results && !tv.total_results && !person.total_results) {
      noResults = true;
    }
  }

  const clearButton = isFocused ? (
    <button type="button" onClick={() => setInputValue('')} onMouseDown={e => e.preventDefault()}>
      <img src={closeIconGrey} alt="closeIconGrey" />
    </button>
  ) : null;

  return (
    <Modal className={styles.modal} visible={visible}>
      <div className={styles.menu}>
        <button type="button" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
        <div>
          <Link to="/" onClick={onClose}>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="logo"
            />
          </Link>
          <button
            type="button"
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
        </div>
        {searchVisible && !isSearchPathname ? (
          <section ref={searchContainerRef}>
            <div>
              <label htmlFor="searchBar">
                <img src={searchIcon} alt="search" />
                <div>
                  <input
                    id="searchBar"
                    type="text"
                    value={inputValue}
                    placeholder="Search for a movie, tv show, person..."
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
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
              <button
                type="button"
                onClick={() => navigateToSearch('movie', movie.results[0].title)}
              >
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
        ) : (
          <ul>
            <li className={styles['media-link']}>
              Movies
              <ul>
                <Link to="/movies" onClick={onClose}>
                  <li>Popular</li>
                </Link>
                <Link to="/movies/now-playing" onClick={onClose}>
                  <li>Now Playing</li>
                </Link>
                <Link to="/movies/upcoming" onClick={onClose}>
                  <li>Upcoming</li>
                </Link>
                <Link to="/movies/top-rated" onClick={onClose}>
                  <li>Top Rated</li>
                </Link>
              </ul>
            </li>
            <li className={styles['media-link']}>
              TV Shows
              <ul>
                <Link to="/tvs" onClick={onClose}>
                  <li>Popular</li>
                </Link>
                <Link to="/tvs/airing-today" onClick={onClose}>
                  <li>Airing Today</li>
                </Link>
                <Link to="/tvs/on-the-air" onClick={onClose}>
                  <li>On TV</li>
                </Link>
                <Link to="/tvs/top-rated" onClick={onClose}>
                  <li>Top Rated</li>
                </Link>
              </ul>
            </li>
            <li className={styles['media-link']}>
              People
              <ul>
                <Link to={{ pathname: '/people', search: `?page=1` }} onClick={onClose}>
                  <li>Popular People</li>
                </Link>
              </ul>
            </li>
            <li className={styles.link}>
              <a href="https://www.themoviedb.org/login">Login</a>
            </li>
            <li className={styles.link}>
              <a href="https://www.themoviedb.org/signup">Join TMDB</a>
            </li>
          </ul>
        )}
      </div>
    </Modal>
  );
};

MenuModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
