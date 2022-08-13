import styles from './styles.module.scss';

export const LeaderBoard = () => {
    return (
        <article className={styles.leaderboard}>
            <section>
                <h2>Leaderboard</h2>
                <div>
                    <div>
                        <div />
                        <p>All Time Edits</p>
                    </div>
                    <div>
                        <div />
                        <p>Edits This Week</p>
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <div>
                        <div>S</div>
                        <div>
                            <h3>Samara</h3>
                            <div>
                                <div></div>
                                <h4>2,627,095</h4>
                            </div>
                            <div>
                                <div></div>
                                <h4>7,629</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div></div>
                        <div>
                            <h3></h3>
                            <div>
                                <div></div>
                                <h4>2,617,749</h4>
                            </div>
                            <div>
                                <div></div>
                                <h4>6,541</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}