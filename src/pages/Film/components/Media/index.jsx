import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { useQuery } from '../../../../hooks/useQuery';
import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

export const Media = ({ name }) => {
    const params = useParams();
    const [medias, setMedias] = useState([
        ['Most Popular'],
        ['Videos'],
        ['Backdrops'],
        ['Posters'],
    ]);
    const [activeMedia, setActiveMedia] = useState(medias[0]);
    const {loading: imagesLoading, data: images} = useQuery({ url: `/${params.mediaType}/${params.id}/images`, params: '' });
    const {loading: videosLoading, data: videos} = useQuery({ url: `/${params.mediaType}/${params.id}/videos`, params: '' });

    useEffect(() => {
        setMedias(prevMedias => {
            const updatedMedias = [...prevMedias];
            updatedMedias[2][1] = images?.backdrops.length;
    
            return updatedMedias;
        });

        setMedias(prevMedias => {
            const updatedMedias = [...prevMedias];
            updatedMedias[3][1] = images?.posters.length;

            return updatedMedias;
        });
    }, [images]);

    useEffect(() => {
        setMedias(prevMedias => {
            const updatedMedias = [...prevMedias];
            updatedMedias[1][1] = videos?.results.length;

            return updatedMedias;
        });
    }, [videos]);

    const popularVideo = videos?.results.find(result => result.name === 'Official Trailer') || videos?.results[0];
    const popularBackdrop = images?.backdrops[0]?.file_path;
    const popularPoster = images?.posters[0]?.file_path;

    return (
        <div className={styles.media}>
            {(images?.backdrops.length > 0 || images?.posters.length > 0 || videos?.results.length > 0) ? (
                <>
                    <div>
                        <h2>Media</h2>
                        <ul>
                            {medias.map(media => (
                                <li 
                                    key={media} 
                                    className={media === activeMedia ? styles['active-media'] : undefined}
                                    onClick={() => setActiveMedia(media)}
                                >
                                    {media[0]} {media[1] && <span>{media[1]}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {
                        activeMedia === medias[0] ? (
                            (videosLoading || imagesLoading) ? <Loader /> : (popularVideo || popularBackdrop || popularPoster) ? (
                                <section className={styles['most-popular']}>
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${popularVideo?.key}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    />
                                    {popularBackdrop && <img className={styles['popular-backdrop']} src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2${popularBackdrop}`} alt={name} />}
                                    {popularPoster && <img className={styles['popular-poster']} src={`https://www.themoviedb.org/t/p/w220_and_h330_face${popularPoster}`} alt={name} />}
                                </section>
                            ) : (
                                <p>We don't have any videos or images for {name}.</p>
                            )
                        ) :
                        activeMedia === medias[1] ? (
                            videosLoading ? <Loader /> : (
                                videos.results.length > 0 ? (
                                    <section className={styles.videos}>
                                        {videos.results.slice(0, 6).map(result => (
                                            <iframe
                                                key={result.id}
                                                src={`https://www.youtube.com/embed/${result.key}`}
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen
                                            />
                                        ))}
                                        {videos.results.length > 6 &&
                                        <div>
                                            <div>
                                                <span>View More</span>
                                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-650-circle-right-74964888ec28ed7284bac83c6b9be1db85809561491c21451c041079b788cd06.svg" alt="circle right" />
                                            </div>
                                        </div>}
                                    </section>
                                ) : (
                                    <p>We don't have any videos for {name}.</p>
                                )
                            )
                        ) :
                        activeMedia === medias[2] ? (
                            imagesLoading ? <Loader /> : (
                                images.backdrops.length > 0 ? (
                                    <section className={styles.backdrops}>
                                        {images.backdrops.slice(0, 6).map((backdrop, index) => (
                                            <img key={index} src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2${backdrop.file_path}`} alt={name} />
                                        ))}
                                        {images.backdrops.length > 6 &&
                                        <div>
                                            <div>
                                                <span>View More</span>
                                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-650-circle-right-74964888ec28ed7284bac83c6b9be1db85809561491c21451c041079b788cd06.svg" alt="circle right" />
                                            </div>
                                        </div>}
                                    </section>
                                ) : (
                                    <p>We don't have any backdrops for {name}.</p>
                                )
                            )
                        ) :
                        activeMedia === medias[3] ? (
                            imagesLoading ? <Loader /> : (
                                images.posters.length > 0 ? (
                                    <section className={styles.posters}>
                                        {images.posters.slice(0, 6).map((poster, index) => (
                                            <img key={index} src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster.file_path}`} alt={name} />
                                        ))}
                                        {images.posters.length > 6 &&
                                        <div>
                                            <div>
                                                <span>View More</span>
                                                <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-650-circle-right-74964888ec28ed7284bac83c6b9be1db85809561491c21451c041079b788cd06.svg" alt="circle right" />
                                            </div>
                                        </div>}
                                    </section>
                                ) : (
                                    <p>We don't have any posters for {name}.</p>
                                )
                            )
                        ) : null
                    }
                </>
            ) : (
                <>
                    <h2>Media</h2>
                    <p>No videos, backdrops or posters have been added to {name}.</p>
                </>
            )}
        </div>
    );
};

Media.propTypes = {
    name: PropTypes.string.isRequired,
};