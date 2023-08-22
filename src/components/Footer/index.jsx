import styles from './styles.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="img" />
                <a href="https://www.themoviedb.org/signup">JOIN THE COMMUNITY</a>
            </div>
            <section>
                <div>
                    <h3>The Basics</h3>
                    <ul>
                        <li>
                            <a href="https://www.themoviedb.org/about">About TMDB</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/about/staying-in-touch">Contact Us</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/talk">Support Forums</a>
                        </li>
                        <li>
                            <a href="https://developer.themoviedb.org/docs">API</a>
                        </li>
                        <li>
                            <a href="https://status.themoviedb.org/">System Status</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Get Involved</h3>
                    <ul>
                        <li>
                            <a href="https://www.themoviedb.org/bible">Contribution Bible</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/movie/new">Add New Movie</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/tv/new">Add New TV Show</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Community</h3>
                    <ul>
                        <li>
                            <a href="https://www.themoviedb.org/documentation/community/guidelines">Guidelines</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/discuss">Discussions</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/leaderboard">Leaderboard</a>
                        </li>
                        <li>
                            <a href="https://twitter.com/themoviedb">Twitter</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Legal</h3>
                    <ul>
                        <li>
                            <a href="https://www.themoviedb.org/terms-of-use">Terms of Use</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/documentation/api/terms-of-use">API Terms of Use</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/privacy-policy">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/dmca-takedown">DMCA Takedown Request</a>
                        </li>
                    </ul>
                </div>
            </section>
        </footer>
    );
};