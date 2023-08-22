import { useParams, Link } from 'react-router-dom';

import { useQuery } from '../../../../hooks/useQuery';
import { Loader } from '../../../../components/Loader';

import { CrewDataDisplay } from './components/CrewDataDisplay';
import styles from './styles.module.scss';

export const PeopleInfo = () => {
    const params = useParams();
    const {loading, data} = useQuery({ url: `/${params.mediaType}/${params.id}/credits`, params: '&language=en-US' });

    for (let i = 0; i < data?.cast.length - 1; i++) {
        for (let j = i + 1; j < data.cast.length; j++) {
            if (data.cast[i].id === data.cast[j].id) {
                data.cast[i].character = data.cast[i].character + ', ' + data.cast[j].character;
                data.cast.splice(j, 1);
                break;
            };
        };
    };

    for (let i = 0; i < data?.crew.length - 1; i++) {
        for (let j = i + 1; j < data.crew.length; j++) {
            if (data.crew[i].id === data.crew[j].id && data.crew[i].department === data.crew[j].department) {
                data.crew[i].job = data.crew[i].job + ', ' + data.crew[j].job;
                data.crew.splice(j, 1);
                break;
            };
        };
    };

    const departments = [...new Set(data?.crew.map(item => item.department))];
    departments.sort((a, b) => a.localeCompare(b));

    return (
        <div className={styles['people-info']}>
            {loading ? <Loader /> : (
                <section>
                    <div className={styles.cast}>
                        <h2>Cast <span>{data?.cast.length}</span></h2>
                        {data?.cast.map(item => (
                            <div key={item.id}>
                                <Link to={`/person/${item.id}`}>
                                    {item.profile_path ? (
                                        <img src={`https://www.themoviedb.org/t/p/w66_and_h66_face${item.profile_path}`} alt={item.name} />
                                    ) : (
                                        <div className={styles['no-image']}>
                                            <img
                                                src={
                                                    item.gender === 1 ?
                                                    'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg' :
                                                    'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                                                }
                                                alt={item.name}
                                            />
                                        </div>
                                    )}
                                </Link>
                                <div>
                                    <Link to={`/person/${item.id}`}>
                                        <h4>{item.name}</h4>
                                    </Link>
                                    <p>{item.character}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>Crew <span>{data?.crew.length}</span></h2>
                        {departments.map((department, index) => (
                            <CrewDataDisplay key={index} department={department} data={data.crew} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};