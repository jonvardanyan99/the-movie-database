import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ visible, children, className }) => {
    const containerRef = useRef(document.createElement('div'));
    
    useEffect(() => {
        if (visible) {
            const container = containerRef.current;
            container.classList.add(styles.modal, className);
    
            modalRoot.appendChild(container);
            document.body.classList.add(styles['hidden-body']);
    
            return () => {
                modalRoot.removeChild(container);
                document.body.classList.remove(styles['hidden-body']);
            };
        }
    }, [className, visible]);

    if (visible) {
        return createPortal(children, containerRef.current);
    }

    return null;
};

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
    className: PropTypes.string,
}