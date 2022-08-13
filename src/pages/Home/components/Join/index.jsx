import styles from './styles.module.scss';

export const Join = () => {
    return (
        <article className={styles.join}>
            <h2>Join Today</h2>
            <section>
                <div>
                    <p>
                        Get access to maintain your own <em>custom personal lists, track what you've seen</em> and search and filter for <em>what to 
                        watch next</em>—regardless if it's in theatres, on TV or available on popular streaming services like 
                        Netflix, Amazon Prime Video, and hayu.
                    </p>
                    <button>Sign Up</button>
                </div>
                <ul>
                    <li>Enjoy TMDB ad free</li>
                    <li>Maintain a personal watchlist</li>
                    <li>Filter by your subscribed streaming services and find something to watch</li>
                    <li>Log the movies and TV shows you've seen</li>
                    <li>Build custom lists</li>
                    <li>Contribute to and improve our database</li>
                </ul>
            </section>
        </article>
    )
}