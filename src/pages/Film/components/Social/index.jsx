import format from 'date-fns/format';
import { PropTypes } from 'prop-types';
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../../../../components/Loader';
import { LoaderSmall } from '../../../../components/Loader/LoaderSmall';
import { useQuery } from '../../../../hooks/useQuery';
import styles from './styles.module.scss';

const socials = [['Reviews'], ['Discussions']];

export const Social = ({ loading, name }) => {
  const params = useParams();
  const [activeSocial, setActiveSocial] = useState(socials[0]);
  const [review, setReview] = useState({});

  const { loading: reviewsLoading, data } = useQuery({
    url: `/${params.mediaType}/${params.id}/reviews`,
    params: '&language=en-US&page=1',
  });

  useEffect(() => {
    socials[0][1] = data?.results.length ? data.results.length : 0;

    if (data?.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setReview(data?.results[randomIndex]);
    }
  }, [data]);

  const avatar = review.author_details?.avatar_path && (
    <img
      src={`https://www.themoviedb.org/t/p/w64_and_h64_face${review.author_details.avatar_path}`}
      alt={review.author_details.name || review.author_details.username}
    />
  );

  return (
    <div className={styles.social}>
      {reviewsLoading ? (
        <>
          <h2>Social</h2>
          <Loader />
        </>
      ) : (
        <>
          <div>
            <h2>Social</h2>
            <div>
              {socials.map(social => (
                <button
                  type="button"
                  key={social}
                  className={social === activeSocial ? styles['active-social'] : undefined}
                  onClick={() => setActiveSocial(social)}
                >
                  {social[0]} {social.length > 1 && <span>{social[1]}</span>}
                </button>
              ))}
            </div>
          </div>
          {activeSocial === socials[0] &&
            (review && Object.keys(review).length > 0 ? (
              <section className={styles.reviews}>
                <div key={review.id}>
                  <div>
                    {review.author_details.avatar_path &&
                    review.author_details.avatar_path.includes('gravatar') ? (
                      <img
                        src={`${review.author_details.avatar_path.slice(1)}?s=64`}
                        alt={review.author_details.name || review.author_details.username}
                      />
                    ) : (
                      avatar
                    )}
                    <div>
                      <div>
                        <h3>
                          A review by {review.author_details.name || review.author_details.username}
                        </h3>
                        {review.author_details.rating && (
                          <div>
                            <img
                              src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-49-star-67a24f6d4324aa644c594653e762b1c0de2b3e1ce0852171cfa49cc2650de374.svg"
                              alt="star"
                            />
                            <span>{review.author_details.rating}.0</span>
                          </div>
                        )}
                      </div>
                      <h5>
                        Written by{' '}
                        <span>{review.author_details.name || review.author_details.username}</span>{' '}
                        on {format(new Date(review.created_at), 'MMMM d, Y')}
                      </h5>
                    </div>
                  </div>
                  <div>
                    <p>
                      {review.content.length > 599
                        ? `${review.content.slice(0, 599)}...`
                        : review.content}
                    </p>
                  </div>
                </div>
                <p>Read All Reviews</p>
              </section>
            ) : (
              <p>
                We don't have any reviews for{' '}
                {loading ? <LoaderSmall cssOverride={{ marginLeft: '5px' }} /> : `${name}.`}
              </p>
            ))}
          {activeSocial === socials[1] && (
            <section className={styles.discussions}>
              <div>
                <div>
                  <div>
                    <div>A</div>
                    <h4>Lorem ipsum dolor sit amet, consectetur.</h4>
                  </div>
                  <p>Open</p>
                  <span>11</span>
                  <div>
                    <p>14 Feb 2019 at 8:06 AM</p>
                    <p>
                      by <span>A</span>
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <div>B</div>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                  </div>
                  <p>Open</p>
                  <span>0</span>
                  <div>
                    <p>28 Nov 2018 at 12:37 AM</p>
                    <p>
                      by <span>B</span>
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <div>C</div>
                    <h4>Lorem ipsum dolor.</h4>
                  </div>
                  <p>Open</p>
                  <span>0</span>
                  <div>
                    <p>17 Nov 2018 at 6:59 AM</p>
                    <p>
                      by <span>C</span>
                    </p>
                  </div>
                </div>
              </div>
              <p>Go To Discussions</p>
            </section>
          )}
        </>
      )}
    </div>
  );
};

Social.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
