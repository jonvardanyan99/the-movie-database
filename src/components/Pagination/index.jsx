import PropTypes from 'prop-types';
import { React } from 'react';

import styles from './styles.module.scss';

export const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  let pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const endNumbers = [pageNumbers.length - 1, pageNumbers.length];
  const length = pageNumbers.length;

  if (pageNumbers.length >= 12) {
    if (currentPage <= 4) {
      pageNumbers = pageNumbers.slice(0, 7).concat(['...', ...endNumbers]);
    } else if (currentPage >= 5 && currentPage <= 7) {
      pageNumbers = pageNumbers.slice(0, currentPage + 3).concat(['...', ...endNumbers]);
    } else if (currentPage >= 8 && currentPage <= length - 7) {
      pageNumbers = pageNumbers
        .slice(0, 2)
        .concat('...')
        .concat(pageNumbers.slice(currentPage - 4, currentPage + 3))
        .concat(['...', ...endNumbers]);
    } else if (currentPage >= length - 6 && currentPage <= length - 4) {
      pageNumbers = pageNumbers
        .slice(0, 2)
        .concat('...')
        .concat(pageNumbers.slice(currentPage - 4));
    } else if (currentPage >= length - 3) {
      pageNumbers = pageNumbers
        .slice(0, 2)
        .concat('...')
        .concat(pageNumbers.slice(length - 7));
    }
  }

  return totalPages > 1 ? (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button type="button" onClick={() => onPageChange(currentPage - 1)}>
          ← Previous
        </button>
      )}
      {pageNumbers.map((item, index) => {
        const isNumber = typeof item === 'number';

        let className = isNumber ? undefined : styles.ellipsis;

        if (item === currentPage) {
          className = styles['curr-page'];
        }

        return (
          <button
            type="button"
            key={index}
            onClick={isNumber ? () => onPageChange(item) : undefined}
            className={className}
          >
            {item}
          </button>
        );
      })}
      {currentPage < length && (
        <button type="button" onClick={() => onPageChange(currentPage + 1)}>
          Next →
        </button>
      )}
    </div>
  ) : null;
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
