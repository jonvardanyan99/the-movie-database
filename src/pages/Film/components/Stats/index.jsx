import styles from './styles.module.scss';

export const Stats = () => {
    return (
        <div className={styles.stats}>
            <h3>Content Score</h3>
            <div>
                <p>100</p>
                <p>Yes! Looking good!</p>
            </div>
            <h3>Top Contributors</h3>
            <div className={styles.contributors}>
                <img src="https://www.gravatar.com/avatar/32979712631282eac5b6fcc5b55152a6.jpg?s=90" alt="dbowman" />
                <div>
                    <span>394</span>
                    <a href="">dbowman</a>
                </div>
            </div>
            <div className={styles.contributors}>
                <img src="https://www.themoviedb.org/t/p/w45_and_h45_face/3nyT3aw7YK2fmP0egcxUY8sJVqQ.jpg" alt="Gus" />
                <div>
                    <span>218</span>
                    <a href="">Gus</a>
                </div>
            </div>
            <div className={styles.contributors}>
                <div>T</div>
                <div>
                    <span>126</span>
                    <a href="">TMDB-bot</a>
                </div>
            </div>
            <div className={styles.contributors}>
                <img src="https://www.themoviedb.org/t/p/w45_and_h45_face/yYG7Rhn9HfFpssIMeNiDynvxC14.jpg" alt="raze464" />
                <div>
                    <span>125</span>
                    <a href="">raze464</a>
                </div>
            </div>
            <p>View Edit History</p>
            <h3>Popularity Trend</h3>
            <a href="https://www.themoviedb.org/login">
                <div>
                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-217-lock-white-81d0c4a81e3d038565c80391d6a28a49e98bfe9f1fa26e6473feb3b92de5b4d1.svg" alt="lock" />
                    LOGIN TO EDIT
                </div>
            </a>
            <div>
                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-357-keyboard-4de4fe2896d6ba568aeb8c07d250a99374f086554ffd4b1f7645d69325b979ab.svg" alt="keyboard" />
                <p>Keyboard Shortcuts</p>
            </div>
            <div>
                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-933-speech-bubble-alert-b33d276606a1a76a1a612c9a7043dfd275ddf0ac55587a5e6a621323db6c488a.svg" alt="speech" />
                <p>Login to report an issue</p>
            </div>
        </div>
    );
};