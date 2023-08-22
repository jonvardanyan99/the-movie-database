import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import format from 'date-fns/format';

import { Percentage } from '../../../../components/Percentage';
import { Loader } from '../../../../components/Loader';
import { TrailerModal } from '../../../../components/TrailerModal';
import { ImageModal } from '../../../../components/ImageModal';

import styles from './styles.module.scss';

export const Overview = ({ loading, id, name, date, genres, runtime, posterPath, backPhoto, voteAverage, tagline, overview, createdBy }) => {
    const [trailerModalVisible, setTrailerModalVisible] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const params = useParams();

    const openTrailerModal = () => {
        setTrailerModalVisible(true);
    };

    const closeTrailerModal = () => {
        setTrailerModalVisible(false);
    };

    const openImageModal = () => {
        setImageModalVisible(true);
    };

    const closeImageModal = () => {
        setImageModalVisible(false);
    };

    const convertTime = time => {
        let hour;
        let minute;
        
        if (time >= 60) {
            if (time % 60 === 0) {
                hour = time / 60;
                return `${hour}h`
            };

            hour = Math.floor(time / 60);
            minute = time % 60;
    
            return `${hour}h ${minute}m`;
        };
    
        return `${time}m`;
    };

    return (
        loading ? <Loader size={50} cssOverride={{ marginTop: '100px' }} /> : (
            <div
                className={styles.overview}
                style={{ 
                    backgroundImage: backPhoto ?
                    `linear-gradient(to right, rgba(204, 204, 204, 1) 150px, rgba(204, 204, 204, 0.70) 100%), url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backPhoto})` :
                    'linear-gradient(to right, rgba(204, 204, 204, 1) 150px, rgba(204, 204, 204, 0.70) 100%)',
                }}
            >
                <div>
                    <div className={styles['movie-poster']}>
                        {posterPath ?
                        <div
                            style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath})` }}
                            className={styles.poster}
                            onClick={openImageModal}
                        >
                            <div>
                                <img 
                                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-216-fullscreen-white-87524788011715a9bd73de86ef577442070ebc9873a7abb2845a6310a7f6174a.svg" 
                                    alt="expand" 
                                />
                                <span>Expand</span>
                            </div>
                        </div> :
                        <div className={styles['no-image']}>
                            <img
                                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                                alt="absence"
                            />
                        </div>}
                        <div>
                            <img src="https://www.themoviedb.org/t/p/original/d3ixI1no0EpTj2i7u0Sd2DBXVlG.jpg" alt="img" />
                            <div>
                                <h4>Now Streaming</h4>
                                <h3>Watch Now</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles['movie-info']}>
                        <h2>
                            {name} {date && <span> ({new Date(date).getFullYear()})</span>}
                        </h2>
                        <div>
                            {params.mediaType === 'movie' && date && <span className={styles.date}>{format(new Date(date), 'MM/dd/y')}</span>}
                            {genres?.map((genre, index, arr) => {
                                let text = `${genre.name},`;

                                if (index === arr.length - 1) {
                                    text = genre.name;
                                };
                                
                                return <span key={genre.id} className={styles.genre}>{text}</span>
                            })}
                            {runtime && <span className={styles.runtime}>{convertTime(runtime)}</span>}
                        </div>
                        <div>
                            <div>
                                <Percentage percent={voteAverage * 10 || 0} className={styles['overview-percentage']} />
                                <span>User Score</span>
                            </div>
                            <div className={styles.action}>
                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-159-thumbnails-list-white-c260ea972eebf812289fd3c41d0d2c1dff33ecbcd62be13fba8eeaf9de173789.svg" alt="lists" />
                            </div>
                            <div className={styles.action}>
                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-13-heart-white-28d2cc2d6418c5047efcfd2438bfc5d109192671263c270993c05f130cc4584e.svg" alt="favourite" />
                            </div>
                            <div className={styles.action}>
                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-73-bookmark-white-432e98d550b7e4c80b06272c49475b0db85a60f6fae450420713004b3c9d3ffd.svg" alt="watchlist" />
                            </div>
                            <div className={styles.action}>
                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-49-star-white-5c85220678b312aea9599d5f12ad858a9e7df226de51ef8b6b699023ffeda5fa.svg" alt="rate" />
                            </div>
                            <div>
                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg" alt="play" />
                                <span onClick={openTrailerModal}>Play Trailer</span>
                            </div>
                        </div>
                        {tagline && <h4 className={styles.tagline}>{tagline}</h4>}
                        <h3>Overview</h3>
                        <p>{overview ? overview : "We don't have an overview translated in English. Help us expand our database by adding one."}</p>
                        {createdBy?.length > 0 && (
                            <div className={styles['creator-container']}>
                                {createdBy.map(item => (
                                    <div key={item.id}>
                                        <h4>{item.name}</h4>
                                        <p>Creator</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <TrailerModal visible={trailerModalVisible} onClose={closeTrailerModal} id={id} />
                <ImageModal visible={imageModalVisible} onClose={closeImageModal} photo={posterPath} />
            </div>
        )
    );
};

Overview.propTypes = {
    loading: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
    runtime: PropTypes.number.isRequired,
    posterPath: PropTypes.string.isRequired,
    backPhoto: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    tagline: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    createdBy: PropTypes.array.isRequired,
};