import PropTypes from 'prop-types';

import { Modal } from '../Modal';
import closeIcon from '../../assets/icons/close.png';

import styles from './styles.module.scss';

export const ImageModal = ({ visible, onClose, photo }) => {
    return (
        <Modal visible={visible} className={styles.modal}>
            <div className={styles['image-modal']}>
                <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${photo}`} alt="name" />
                <div>
                    <img src={closeIcon} alt="close" onClick={onClose} />
                    <div>
                        <h4>Info</h4>
                        <p>Added By</p>
                        <h4>JC</h4>
                        <p>Size</p>
                        <span>1600x2400</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

ImageModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    photo: PropTypes.string.isRequired,
};