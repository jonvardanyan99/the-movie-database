import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

export const CurrSeason = ({ loading, lastEpisodeToAir, nextEpisodeToAir, seasons, name }) => {

    const season = seasons?.find(season => lastEpisodeToAir.season_number === season.season_number);
    const seasonAirDate = season?.air_date || null;
    const voteAverage = season?.vote_average.toFixed(1);
    const nextEpisodeAirDate = nextEpisodeToAir?.air_date || null;
    const lastEpisodeAirDate = lastEpisodeToAir?.air_date || null;

    return (
        <div className={styles['curr-season']}>
            <h2>Current Season</h2>
            {loading ? <Loader /> : (
                <>
                    <section>
                        <div className={styles.poster}>
                            {season?.poster_path ?
                            <img src={`https://www.themoviedb.org/t/p/w130_and_h195_bestv2${season.poster_path}`} alt={`${season?.name} - ${name}`} /> :
                            <div>
                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt={`${season?.name} - ${name}`} />
                            </div>}
                        </div>
                        <div className={styles.content}>
                            <h2>{season?.name}</h2>
                            <h4>
                                {voteAverage > 0 &&
                                <div>
                                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-49-star-67a24f6d4324aa644c594653e762b1c0de2b3e1ce0852171cfa49cc2650de374.svg" alt="star" />
                                    <span>{voteAverage}</span>
                                </div>}
                                {new Date(seasonAirDate).getFullYear()} • {season?.episode_count > 1 ? `${season.episode_count} Episodes` : `${season?.episode_count} Episode`} 
                            </h4>
                            {season?.overview ?
                            <p>{season.overview}</p> :
                            <p>{season?.name} of {name} premiered on {format(new Date(seasonAirDate), 'MMMM d, Y')}.</p>}
                            <p>
                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-46-calendar-3e0931dfeba8f62c51e81dfa4364a6d836f3a03aaf739a51d0846902ee367645.svg" alt="calendar" />
                                <span>{nextEpisodeToAir?.name || lastEpisodeToAir?.name}</span>
                                ({nextEpisodeToAir?.season_number || lastEpisodeToAir?.season_number}x{nextEpisodeToAir?.episode_number || lastEpisodeToAir?.episode_number}, {format(new Date(nextEpisodeAirDate || lastEpisodeAirDate), 'MMMM d, Y')})
                            </p>
                        </div>
                    </section>
                    <p>View All Seasons</p>
                </>
            )}
        </div>
    );
};

CurrSeason.propTypes = {
    loading: PropTypes.bool.isRequired,
    lastEpisodeToAir: PropTypes.object.isRequired,
    nextEpisodeToAir: PropTypes.object.isRequired,
    seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
    name: PropTypes.string.isRequired,
};