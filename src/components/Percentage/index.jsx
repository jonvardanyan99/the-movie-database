import { useEffect, useRef } from 'react';
import { Circle } from 'progressbar.js';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export const Percentage = ({ percent }) => {
    const containerRef = useRef(null);

    useEffect(() => {
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
                    fontSize: '16px',
                    lineHeight: '16px',
                    color: 'white',
                    fontWeight: 'bold',
                },
            },
            from: { color: '#cd8502' },
            to: { color: '#1d741d' },
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(`<span>${value}<sup style="font-size: 8px; margin-left: 1px">%</sup></span>`);
                }
            },
        });

        bar.animate(percent / 100);

        return () => {
            bar.destroy();
        };
    }, [percent]);

    return (
        <div ref={containerRef} className={styles['percentage-circle']} />
    );
};

Percentage.propTypes = {
    percent: PropTypes.number.isRequired,
}