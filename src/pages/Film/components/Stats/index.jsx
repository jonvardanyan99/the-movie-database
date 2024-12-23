import { React } from 'react';

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
        <div className={styles['a-contributor']}>A</div>
        <div>
          <span>380</span>
          <p>A</p>
        </div>
      </div>
      <div className={styles.contributors}>
        <div className={styles['b-contributor']}>B</div>
        <div>
          <span>216</span>
          <p>B</p>
        </div>
      </div>
      <div className={styles.contributors}>
        <div className={styles['c-contributor']}>C</div>
        <div>
          <span>122</span>
          <p>C</p>
        </div>
      </div>
      <div className={styles.contributors}>
        <div className={styles['d-contributor']}>D</div>
        <div>
          <span>105</span>
          <p>D</p>
        </div>
      </div>
      <p>View Edit History</p>
      <h3>Popularity Trend</h3>
      <a href="https://www.themoviedb.org/login">
        <div>
          <img
            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-217-lock-white-81d0c4a81e3d038565c80391d6a28a49e98bfe9f1fa26e6473feb3b92de5b4d1.svg"
            alt="lock"
          />
          LOGIN TO EDIT
        </div>
      </a>
      <div>
        <img
          src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-357-keyboard-4de4fe2896d6ba568aeb8c07d250a99374f086554ffd4b1f7645d69325b979ab.svg"
          alt="keyboard"
        />
        <p>Keyboard Shortcuts</p>
      </div>
      <div>
        <img
          src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-933-speech-bubble-alert-b33d276606a1a76a1a612c9a7043dfd275ddf0ac55587a5e6a621323db6c488a.svg"
          alt="speech"
        />
        <p>Login to report an issue</p>
      </div>
    </div>
  );
};
