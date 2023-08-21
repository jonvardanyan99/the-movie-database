import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { CategorySwitch } from '../../../../components/CategorySwitch';
import playIcon from '../../../../assets/icons/play.png';
import { Loader } from '../../../../components/Loader';
import { TrailerModal } from '../../../../components/TrailerModal';
import { useQuery } from '../../../../hooks/useQuery';

import styles from './styles.module.scss';

const categories = [
    'Streaming',
    'In Theatres',
];

export const Trailers = () => {
    const [activeTrailer, setActiveTrailer] = useState({});
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [trailerModalVisible, setTrailerModalVisible] = useState(false);

    let URL;

    if (activeCategory === categories[0]) {
        URL = '/movie/upcoming';
    } else if (activeCategory === categories[1]) {
        URL = '/movie/now_playing';
    };

    const {loading, data} = useQuery({ url: URL, params: '&language=en-US&page=1' });

    const trailers = useMemo(() => {
        return data?.results.map(result => ({
            id: result.id,
            name: result.title,
            photo: `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${result.poster_path}`,
            backPhoto: `https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces${result.poster_path}`,
        }));
    }, [data?.results]);

    useEffect(() => {
        if (trailers?.length > 0) {
            setActiveTrailer(trailers[0]);
        };
    }, [trailers]);

    const handleTrailerHover = (trailer) => {
        if (activeTrailer.id !== trailer.id) {
            setActiveTrailer(trailer);
        };
    };

    const openTrailerModal = () => {
        setTrailerModalVisible(true);
    };

    const closeTrailerModal = () => {
        setTrailerModalVisible(false);
    };

    const handleDataChange = useCallback(category => {
        setActiveCategory(category);
    }, []);

    return (
        <div className={styles.trailers} style={{ backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.75) 0%, rgba(3, 37, 65, 0.75) 100%), url(${activeTrailer?.backPhoto})` }}>
            <CategorySwitch secondary title="Latest Trailers" categories={categories} onChange={handleDataChange} />
            {
                loading ? <Loader cssOverride={{ marginTop: '20px' }} /> :
                <section>
                    {trailers?.map(trailer => (
                        <div key={trailer.id} onMouseOver={() => handleTrailerHover(trailer)}>
                            <div onClick={openTrailerModal}>
                                <img src={trailer.photo} alt={trailer.name} />
                                <img src={playIcon} alt="play" />
                            </div>
                            <Link to={`/movie/${trailer.id}`}>
                                <h2>{trailer.name}</h2>
                            </Link>
                            <h3>Official Trailer</h3>
                        </div>
                    ))}
                </section>
            }
            <TrailerModal visible={trailerModalVisible} onClose={closeTrailerModal} id={activeTrailer.id || 0} />
        </div>
    );
};