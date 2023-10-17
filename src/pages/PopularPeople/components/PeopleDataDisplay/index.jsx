import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

export const PeopleDataDisplay = ({ loading, data }) => {
    return (
        <div
            className={styles['people-data-display']}
            style={{ justifyContent: loading ? 'center': 'unset' }}
        >
            {loading ? <Loader cssOverride={{ marginTop: '35px' }} /> : (
                data.results?.map(result => (
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
        </div>
    );
};

PeopleDataDisplay.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
};