import { React } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { useQuery } from '../../hooks/useQuery';
import { Credits } from './components/Credits';
import styles from './styles.module.scss';

export const Person = () => {
  const params = useParams();

  const { loading, data } = useQuery({
    url: `/person/${params.id}`,
    params: '&language=en-US&append_to_response=external_ids',
  });

  const { loading: creditsLoading, data: creditsData } = useQuery({
    url: `/person/${params.id}/combined_credits`,
    params: '&language=en-US',
  });

  const movieCount = new Set();
  const tvCount = new Set();

  creditsData?.cast.forEach(item => {
    const movieTitle = item.title;
    const tvName = item.name;

    if (movieTitle) {
      movieCount.add(movieTitle);
    }

    if (tvName) {
      tvCount.add(tvName);
    }
  });

  creditsData?.crew.forEach(item => {
    const movieTitle = item.title;
    const tvName = item.name;

    if (movieTitle) {
      movieCount.add(movieTitle);
    }

    if (tvName) {
      tvCount.add(tvName);
    }
  });

  const currentDate = new Date();
  const birthDate = new Date(data?.birthday);

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())
  ) {
    age--;
  }

  const alive = !data?.deathday;

  const deathDate = new Date(data?.deathday);

  let deceasedAge = deathDate.getFullYear() - birthDate.getFullYear();

  if (deathDate < new Date(deathDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
    deceasedAge--;
  }

  let birthDayValue;

  if (data?.birthday && alive) {
    birthDayValue = `${data.birthday} (${age} years old)`;
  } else if (data?.birthday && !alive) {
    birthDayValue = data.birthday;
  } else {
    birthDayValue = '-';
  }

  return (
    <div className={styles.person}>
      {loading || creditsLoading ? (
        <Loader />
      ) : (
        <>
          <article className={styles['profile-section']}>
            {data?.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.profile_path}`}
                alt={data.name}
              />
            ) : (
              <div className={styles['no-image']}>
                <img
                  src={
                    data?.gender === 1
                      ? 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg'
                      : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                  }
                  alt={data?.name}
                />
              </div>
            )}
            {data?.external_ids.facebook_id ||
            data?.external_ids.twitter_id ||
            data?.external_ids.instagram_id ||
            data?.external_ids.tiktok_id ||
            data?.homepage ? (
              <div className={styles['link-container']}>
                {data.external_ids.facebook_id && (
                  <div>
                    <span>Visit Facebook</span>
                    <a
                      href={`https://www.facebook.com/${data.external_ids.facebook_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-2c5718e4ece8eb3a3cc49ae97000e541c0aad50869b419b5aa579693bc0ad059.svg"
                        alt="facebook"
                      />
                    </a>
                  </div>
                )}
                {data.external_ids.twitter_id && (
                  <div>
                    <span>Visit Twitter</span>
                    <a
                      href={`https://twitter.com/${data.external_ids.twitter_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg"
                        alt="twitter"
                      />
                    </a>
                  </div>
                )}
                {data.external_ids.instagram_id && (
                  <div>
                    <span>Visit Instagram</span>
                    <a
                      href={`https://www.instagram.com/${data.external_ids.instagram_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg"
                        alt="instagram"
                      />
                    </a>
                  </div>
                )}
                {data.external_ids.tiktok_id && (
                  <div>
                    <span>Visit Tiktok</span>
                    <a
                      href={`https://www.tiktok.com/@${data.external_ids.tiktok_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/tiktok-69d6a5d09a7fd09b663fa45337fa05cbfc4cbf16b45d72d9962b036a9e2702b4.svg"
                        alt="tiktok"
                      />
                    </a>
                  </div>
                )}
                {data.external_ids.youtube_id && (
                  <div>
                    <span>Visit Youtube</span>
                    <a
                      href={`https://www.youtube.com/${data.external_ids.youtube_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/youtube-de379f898e1a71c488c71075eb00f5c003699069b9cb1f38c8ac7ea99c8a6338.svg"
                        alt="youtube"
                      />
                    </a>
                  </div>
                )}
                {data.homepage && (
                  <div>
                    <span>Visit Homepage</span>
                    <a
                      className={
                        data.external_ids.facebook_id ||
                        data.external_ids.twitter_id ||
                        data.external_ids.instagram_id ||
                        data.external_ids.tiktok_id
                          ? styles.homepage
                          : ''
                      }
                      href={data.homepage}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg"
                        alt="homepage"
                      />
                    </a>
                  </div>
                )}
              </div>
            ) : null}
            <h3>Personal Info</h3>
            <h4>Known For</h4>
            <p>{data?.known_for_department}</p>
            <h4>Known Credits</h4>
            <p>{movieCount.size + tvCount.size}</p>
            <h4>Gender</h4>
            <p>{data?.gender === 1 ? 'Female' : 'Male'}</p>
            <h4>Birthday</h4>
            <p>{birthDayValue}</p>
            {data?.deathday && (
              <>
                <h4>Day of Death</h4>
                <p>
                  {data.deathday} ({deceasedAge} years old)
                </p>
              </>
            )}
            <h4>Place of Birth</h4>
            <p>{data?.place_of_birth ? data.place_of_birth : '-'}</p>
            <h4>Also Known As</h4>
            {data?.also_known_as.length > 0 ? (
              <div>
                {data.also_known_as.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            ) : (
              <p className={styles['also-known-as']}>-</p>
            )}
            <a href="https://www.themoviedb.org/login">
              <div>
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-217-lock-white-81d0c4a81e3d038565c80391d6a28a49e98bfe9f1fa26e6473feb3b92de5b4d1.svg"
                  alt="lock"
                />
                LOGIN TO EDIT
              </div>
            </a>
            <div className={styles.keyboard}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-357-keyboard-4de4fe2896d6ba568aeb8c07d250a99374f086554ffd4b1f7645d69325b979ab.svg"
                alt="keyboard"
              />
              <p>Keyboard Shortcuts</p>
            </div>
            <div className={styles['speech-alert']}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-933-speech-bubble-alert-b33d276606a1a76a1a612c9a7043dfd275ddf0ac55587a5e6a621323db6c488a.svg"
                alt="speech-alert"
              />
              <p>Login to report an issue</p>
            </div>
          </article>
          <article className={styles['details-section']}>
            <h2>{data?.name}</h2>
            <h3>Biography</h3>
            <p>
              {data?.biography ? data.biography : `We don't have a biography for ${data?.name}.`}
            </p>
            <Credits
              name={data?.name || ''}
              knownForDepartment={data?.known_for_department || ''}
              creditsData={creditsData || {}}
              movieCount={movieCount.size}
              tvCount={tvCount.size}
            />
          </article>
        </>
      )}
    </div>
  );
};
