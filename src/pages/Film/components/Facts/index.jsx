import PropTypes from 'prop-types';
import { React } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../../../../components/Loader';
import { useQuery } from '../../../../hooks/useQuery';
import styles from './styles.module.scss';

export const Facts = ({
  loading,
  homePage,
  status,
  networks,
  type,
  originalLanguage,
  budget,
  revenue,
}) => {
  const params = useParams();
  const { loading: externalIdsLoading, data: externalIds } = useQuery({
    url: `/${params.mediaType}/${params.id}/external_ids`,
    params: '',
  });
  const { loading: keywordsLoading, data: keywords } = useQuery({
    url: `/${params.mediaType}/${params.id}/keywords`,
    params: '',
  });

  const languageCodes = {
    en: 'English',
    fr: 'French',
    de: 'German',
    es: 'Spanish',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    ja: 'Japanese',
    zh: 'Chinese',
    ar: 'Arabic',
    hi: 'Hindi',
  };

  const getLanguageName = code => {
    return languageCodes[code] || 'Unknown';
  };

  let keywordKey;

  if (params.mediaType === 'movie') {
    keywordKey = 'keywords';
  } else if (params.mediaType === 'tv') {
    keywordKey = 'results';
  }

  return (
    <div className={styles.facts}>
      {loading || externalIdsLoading || keywordsLoading ? (
        <Loader />
      ) : (
        <>
          {(externalIds?.facebook_id ||
            externalIds?.twitter_id ||
            externalIds?.instagram_id ||
            homePage) && (
            <div className={styles['link-container']}>
              {externalIds.facebook_id && (
                <div>
                  <a
                    href={`https://www.facebook.com/${externalIds.facebook_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-71155d1cd369c47ce8456477833a92c324fa01e6d628cb6ece19cedea3c1c480.svg"
                      alt="Facebook"
                    />
                  </a>
                  <span>Visit Facebook</span>
                </div>
              )}
              {externalIds.twitter_id && (
                <div>
                  <a
                    href={`https://www.twitter.com/${externalIds.twitter_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg"
                      alt="Twitter"
                    />
                  </a>
                  <span>Visit Twitter</span>
                </div>
              )}
              {externalIds.instagram_id && (
                <div>
                  <a
                    href={`https://www.instagram.com/${externalIds.instagram_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg"
                      alt="Instagram"
                    />
                  </a>
                  <span>Visit Instagram</span>
                </div>
              )}
              {homePage && (
                <div
                  className={styles.homepage}
                  style={
                    !externalIds.facebook_id && !externalIds.twitter_id && !externalIds.instagram_id
                      ? { border: 'none', padding: 0 }
                      : null
                  }
                >
                  <a href={homePage} target="_blank" rel="noreferrer">
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg"
                      alt="Homepage"
                    />
                  </a>
                  <span>Visit Homepage</span>
                </div>
              )}
            </div>
          )}
          {params.mediaType === 'tv' && <h3>Facts</h3>}
          <h4>Status</h4>
          <p>{status}</p>
          {networks.length > 0 && (
            <>
              <h4>Networks</h4>
              <div className={styles.networks}>
                {networks.map(network => (
                  <img
                    key={network.id}
                    src={`https://www.themoviedb.org/t/p/h30${network.logo_path}`}
                    alt={network.name}
                  />
                ))}
              </div>
            </>
          )}
          {params.mediaType === 'tv' && (
            <>
              <h4>Type</h4>
              <p>{type}</p>
            </>
          )}
          <h4>Original Language</h4>
          <p>{getLanguageName(originalLanguage)}</p>
          {params.mediaType === 'movie' && (
            <>
              <h4>Budget</h4>
              <p>
                {budget
                  ? budget.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })
                  : '-'}
              </p>
              <h4>Revenue</h4>
              <p>
                {revenue
                  ? revenue.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })
                  : '-'}
              </p>
            </>
          )}
          <h3 className={styles.keywords}>Keywords</h3>
          {keywords && keywords[keywordKey].length > 0 ? (
            <div className={styles['keywords-container']}>
              {keywords[keywordKey].map(keyword => (
                <span key={keyword.id}>{keyword.name}</span>
              ))}
            </div>
          ) : (
            <p>No keywords have been added.</p>
          )}
        </>
      )}
    </div>
  );
};

Facts.propTypes = {
  loading: PropTypes.bool.isRequired,
  homePage: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  networks: PropTypes.arrayOf(PropTypes.shape).isRequired,
  type: PropTypes.string.isRequired,
  originalLanguage: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired,
};
