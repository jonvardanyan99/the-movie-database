import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export const Welcome = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const navigateToSearch = () => {
        if (inputValue.trim().length) {
            navigate({
                pathname: '/search/movie',
                search: `?query=${inputValue}&page=1`,
            });
        };
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            navigateToSearch();
        };
    };

    return (
        <div className={styles.welcome}>
            <h2>Welcome.</h2>
            <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for a movie, tv show, person......"
                />
                <button onClick={navigateToSearch}>Search</button>
            </div>
        </div>
    );
};