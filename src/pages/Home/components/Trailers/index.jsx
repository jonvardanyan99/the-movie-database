import { useState, useEffect } from 'react';

import { CategorySwitch } from '../../../../components/CategorySwitch';
import { TMDB_API_KEY } from '../../../../configs';
import playIcon from '../../../../assets/icons/play.png';
import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

const categories = [
    'Streaming',
    'In Theatres',
];

export const Trailers = () => {
    const [trailers, setTrailers] = useState([]);
    const [activeTrailer, setActiveTrailer] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (trailers.length > 0) {
            setActiveTrailer(trailers[0])
        }
    }, [trailers])

    const handleTrailerHover = (trailer) => {
        if (activeTrailer.id !== trailer.id) {
            setActiveTrailer(trailer);
        }
    };

    const handleDataChange = category => {
        if (category === categories[0]) {
            setLoading(true);

            fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
                .then(response => response.json())
                .then(data => {
                    const trailers = data.results.map(result => ({
                        id: result.id,
                        name: result.title,
                        photo: `https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`,
                    }))
                    setTrailers(trailers);

                    setLoading(false);
                })
        } else if (category === categories[1]) {
            setLoading(true);

            fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
                .then(response => response.json())
                .then(data => {
                    const trailers = data.results.map(result => ({
                        id: result.id,
                        name: result.title,
                        photo: `https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`,
                    }))
                    setTrailers(trailers);

                    setLoading(false);
                })
        }
    }

    return (
        <article className={styles.trailers} style={{ backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.75) 0%, rgba(3, 37, 65, 0.75) 100%), url(${activeTrailer?.photo})` }}>
            <CategorySwitch secondary title="Latest Trailers" categories={categories} onChange={handleDataChange} />
            <section>
                {
                    loading ? <Loader cssOverride={{ marginTop: '20px' }} /> :

                    trailers.map(trailer => (
                        <div key={trailer.id} onMouseOver={() => handleTrailerHover(trailer)}>
                            <div>
                                <img src={trailer.photo} alt="img" />
                                <img src={playIcon} alt="img" />
                            </div>
                            <h2>{trailer.name}</h2>
                            <h3>Official Trailer</h3>
                        </div>
                    ))
                }
            </section>
        </article>
    )
}