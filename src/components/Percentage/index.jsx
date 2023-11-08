import { Circle } from 'progressbar.js';
import PropTypes from 'prop-types';
import { React, useEffect, useRef } from 'react';

import styles from './styles.module.scss';

export const Percentage = ({ percent, className }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.classList.add(styles['percentage-circle'], className);

    const bar = new Circle(containerRef.current, {
      strokeWidth: 7,
      trailWidth: 15,
      trailColor: '#081c22',
      easing: 'easeInOut',
      duration: 1400,
      fill: '#081c22',
      text: {
        autoStyleContainer: false,
        style: {
          position: 'absolute',
          top: 'calc(50% - 11px)',
          left: '0',
          right: '0',
          textAlign: 'center',
          paddingLeft: '5px',
          fontFamily: "'Source Sans Pro', Arial, sans-serif",
          fontSize: '22px',
          lineHeight: '16px',
          color: 'white',
          fontWeight: 'bold',
        },
      },
      from: { color: '#cd8502' },
      to: { color: '#1d741d' },
      step(state, circle) {
        circle.path.setAttribute('stroke', state.color);

        const value = Math.round(circle.value());
        circle.setText(
          `<span>${value}<sup style="font-size: 12px; margin-left: 1px">%</sup></span>`,
        );
      },
    });

    bar.animate(percent);

    return () => {
      bar.destroy();
    };
  }, [className, percent]);

  return <div ref={containerRef} />;
};

Percentage.propTypes = {
  percent: PropTypes.number.isRequired,
  className: PropTypes.string,
};
