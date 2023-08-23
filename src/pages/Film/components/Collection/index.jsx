import PropTypes from 'prop-types';

import { useQuery } from '../../../../hooks/useQuery';
import { Loader } from '../../../../components/Loader';

import styles from './styles.module.scss';

export const Collection = ({ id }) => {
    const {loading, data = {}} = useQuery({ url: `/collection/${id}`, params: '&language=en-US' });

    const parts = data.parts?.map(part => part.title);
    let text = '';

    parts?.map((part, index, arr) => {
        let word;

        word = `${part} `;

        if (arr.length > 2) {
            word = `${part}, `
        };

        if (index === arr.length - 1) {
            word = `and ${part}`
        };

        return text += word;
    });

    return (
        <div className={styles.collection}>
            {loading ? <Loader /> : (
                <div style={{
                    backgroundImage: data.backdrop_path ?
                    `linear-gradient(to right, rgba(3, 37, 65, 1) 0%, rgba(3, 37, 65, 0.6) 100%), url(https://www.themoviedb.org/t/p/w1440_and_h320_multi_faces${data.backdrop_path})` :
                    'url(https://www.themoviedb.org/assets/2/v4/account_pipes/silver-251bf173c626c8be6f61efdd85b7009a83b2f9dfa60b80b182351a02fa2a57ec.svg)',
                    backgroundColor: !data.backdrop_path ? '#A9A9A9' : '',
                }}>
                    <h2>Part of the {data.name}</h2>
                    <p>Includes {text}</p>
                    <button>VIEW THE COLLECTION</button>
                </div>
            )}
        </div>
    );
};

Collection.propTypes = {
    id: PropTypes.number.isRequired,
};