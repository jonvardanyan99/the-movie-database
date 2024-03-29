import PropTypes from 'prop-types';
import { React } from 'react';
import { useParams } from 'react-router-dom';

import closeIcon from '../../assets/icons/closeGrey.png';
import { useQuery } from '../../hooks/useQuery';
import { Loader } from '../Loader';
import { Modal } from '../Modal';
import styles from './styles.module.scss';

export const TrailerModal = ({ visible, onClose, id }) => {
  const params = useParams();

  const mediaType = params.mediaType || 'movie';

  const { loading, data } = useQuery({
    url: `/${mediaType}/${id}/videos`,
    params: '&language=en-US',
    skip: !id,
  });

  const trailer = data?.results.find(result => result.name === 'Official Trailer');

  return (
    <Modal className={styles.modal} visible={visible}>
      {loading ? (
        <Loader size={50} />
      ) : (
        <div className={styles.trailer}>
          <div>
            <h2>{trailer?.name}</h2>
            <button type="button" onClick={onClose}>
              <img src={closeIcon} alt="close" />
            </button>
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${trailer?.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </Modal>
  );
};

TrailerModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
