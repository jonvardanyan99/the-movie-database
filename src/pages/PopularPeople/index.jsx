import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '../../hooks/useQuery';
import { Loader } from '../../components/Loader';

import styles from './styles.module.scss';

export const PopularPeople = () => {
    const [currPage, setCurrPage] = useState(1);
    const {loading, data} = useQuery({ url: '/person/popular', params: `&language=en-US&page=${currPage}` });

    let arr = [];

    for (let i = 1; i <= data?.total_pages; i++) {
        arr.push(i);
    };

    let endNumbers = [arr.length - 1, arr.length];
    let length = arr.length;

    if (currPage <= 4) {
        arr = arr.slice(0, 7).concat(['...', ...endNumbers]);
    } else if (currPage >= 5 && currPage <= 7) {
        arr = arr.slice(0, currPage + 3).concat(['...', ...endNumbers]);
    } else if (currPage >= 8 && currPage <= length - 7) {
        arr = arr.slice(0, 2).concat('...').concat(arr.slice(currPage - 4, currPage + 3)).concat(['...', ...endNumbers]);
    } else if (currPage >= length - 6 && currPage <= length - 4) {
        arr = arr.slice(0, 2).concat('...').concat(arr.slice(currPage - 4));
    } else if (currPage >= length - 3) {
        arr = arr.slice(0, 2).concat('...').concat(arr.slice(length - 7));
    };

    return (
        <div className={styles['popular-people']}>
            <article>
                <h2>Popular People</h2>
                <section style={{ justifyContent: loading ? 'center': 'unset' }}>
                    {loading ? <Loader cssOverride={{ marginTop: '40px' }} /> : (
                        data?.results.map(result => (
                            <div key={result.id}>
                                <Link to={`/person/${result.id}`}>
                                    {result.profile_path ?
                                    <img src={`https://www.themoviedb.org/t/p/w235_and_h235_face${result.profile_path}`} alt={result.name} /> :
                                    <div className={styles['no-image']}>
                                        <img
                                            src={
                                                result.gender === 1 ?
                                                'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg' :
                                                'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                                            }
                                            alt={result.name}
                                        />
                                    </div>
                                    }
                                </Link>
                                <div>
                                    <Link to={`/person/${result.id}`}>
                                        <h3>{result.name}</h3>
                                    </Link>
                                    <p>
                                        {result.known_for.map(item => item.title || item.name).join(', ').length > 27 ?
                                        result.known_for.map(item => item.title || item.name).join(', ').slice(0, 27).concat('...') :
                                        result.known_for.map(item => item.title || item.name).join(', ')}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </section>
                {loading ? null : (
                    <ul>
                        {currPage > 1 && <button onClick={() => setCurrPage(currPage - 1)}>← Previous</button>}
                        {arr.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    if (typeof(item) === 'number') {
                                        setCurrPage(item);
                                    };
                                }}
                                className={item === currPage ? styles['curr-page'] : item === '...' ? styles.ellipsis : undefined}
                            >
                                {item}
                            </li>
                        ))}
                        {currPage < length && <button onClick={() => setCurrPage(currPage + 1)}>Next →</button>}
                    </ul>
                )}
            </article>
        </div>
    );
};