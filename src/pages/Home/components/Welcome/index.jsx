import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export const Welcome = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = event => {
        setInputValue(event.target.value);
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
                    placeholder="Search for a movie, tv show, person......"
                />
                <Link to={`/search/movie/${inputValue}`}>Search</Link>
            </div>
        </div>
    );
};