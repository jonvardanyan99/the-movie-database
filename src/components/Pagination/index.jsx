import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export const Pagination = ({ currPage, onPageChange, totalPages }) => {
    let arr = [];

    for (let i = 1; i <= totalPages; i++) {
        arr.push(i);
    };

    let endNumbers = [arr.length - 1, arr.length];
    let length = arr.length;

    if (arr.length >= 12) {
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
    };

    return (
        totalPages > 1 ? (
            <ul className={styles.pagination}>
                {currPage > 1 && <button onClick={() => onPageChange(currPage - 1)}>← Previous</button>}
                {arr.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            if (typeof(item) === 'number') {
                                onPageChange(item);
                            };
                        }}
                        className={item === currPage ? styles['curr-page'] : item === '...' ? styles.ellipsis : undefined}
                    >
                        {item}
                    </li>
                ))}
                {currPage < length && <button onClick={() => onPageChange(currPage + 1)}>Next →</button>}
            </ul>
        ) : null
    );
};

Pagination.propTypes = {
    currPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
};