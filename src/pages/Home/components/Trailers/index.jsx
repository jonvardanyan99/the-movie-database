import { CategorySwitch } from '../../../../components/CategorySwitch';
import { useState } from 'react';
import playIcon from '../../../../assets/icons/play.png';

import styles from './styles.module.scss';

const categories = [
    'Streaming',
    'On TV',
    'For Rent',
    'In Theatres',
];

const trailers = [
    {
        id: 1,
        src: 'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/4arosFsAEZIDpzZhkm6q1yxYi2f.jpg',
        name: 'Vengeance Is Mine, All Others Pay Cash',
        title: 'Arrow Trailer',
    },
    {
        id: 2,
        src: 'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/s5svcTbGcdTkA3cj7pCfy1rxy2O.jpg',
        name: "My Best Friend's Wedding",
        title: 'Official Trailer',
    },
    {
        id: 3,
        src: 'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
        name: 'Stranger Things',
        title: 'Stranger Things 4 | Volume 2 Trailer | Netflix',
    },
    {
        id: 4,
        src: 'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/4OjoH07cxYQbnGiJzJxto0NUejH.jpg',
        name: 'Jerry & Marge Go Large',
        title: 'Now Streaming',
    },
    {
        id: 5,
        src: 'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/vHTuFN4uN1jD1xQWHnOft5dLvL5.jpg',
        name: 'Westworld',
        title: 'Season 4 Official Trailer',
    },
    {
        id: 6,
        src: 'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/nevEGeib1T18PgUWlaS9lM8TsgQ.jpg',
        name: 'Joel Kim Booster: Psychosexual',
        title: 'Official Trailer',
    },
    {
        id: 7,
        src: 'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/7dzE7MywqLklIa3EdmVcIBXWDQs.jpg',
        name: 'To Sir, with Love',
        title: 'Official Trailer',
    },
];

export const Trailers = () => {
    const [activeTrailer, setActiveTrailer] = useState(trailers[0]);

    const handleTrailerHover = (trailer) => {
        if (activeTrailer.id !== trailer.id) {
            setActiveTrailer(trailer);
        }
    };

    return (
        <article className={styles.trailers} style={{ backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.75) 0%, rgba(3, 37, 65, 0.75) 100%), url(${activeTrailer.src})` }}>
            <CategorySwitch secondary title="Latest Trailers" categories={categories} />
            <section>
                {trailers.map(trailer => (
                    <div key={trailer.id} onMouseOver={() => handleTrailerHover(trailer)}>
                        <div>
                            <img src={trailer.src} alt="img" />
                            <img src={playIcon} alt="img" />
                        </div>
                        <h2>{trailer.name}</h2>
                        <h3>{trailer.title}</h3>
                    </div>
                ))}
            </section>
        </article>
    )
}