import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';

import styles from './styles.module.scss';

export const CategorySwitch = ({ title, categories, secondary = false, onChange }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  useEffect(() => {
    onChange(activeCategory);
  }, [activeCategory, onChange]);

  return (
    <div
      className={`${styles['category-switch']} ${
        secondary ? styles['category-switch--secondary'] : ''
      }`}
    >
      <h2>{title}</h2>
      <div>
        {categories.map(category => (
          <button
            type="button"
            key={category}
            className={category === activeCategory ? styles['active-category'] : undefined}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

CategorySwitch.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  secondary: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
