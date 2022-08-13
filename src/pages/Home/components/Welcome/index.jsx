import styles from './styles.module.scss';

export const Welcome = () => {
    return (
        <article className={styles.welcome}>
            <h2>Welcome.</h2>
            <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
            <div>
                <input placeholder="Search for a movie, tv show, person......" />
                <button>Search</button>
            </div>
        </article>
    )
}