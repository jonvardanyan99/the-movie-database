import { useParams } from 'react-router-dom';

import { useQuery } from '../../hooks/useQuery';
import { Credits } from './components/Credits';
import { Loader } from '../../components/Loader';
import { LoaderSmall } from '../../components/Loader/LoaderSmall';

import styles from './styles.module.scss';

export const Person = () => {
    const params = useParams();
    const {loading, data} = useQuery({ url: `/person/${params.id}`, params: '&language=en-US&append_to_response=external_ids' });

    const currentDate = new Date();
    const birthDate = new Date(data?.birthday);

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
        age--;
    };

    const alive = !data?.deathday;

    const deathDate = new Date(data?.deathday);

    let deceasedAge = deathDate.getFullYear() - birthDate.getFullYear();

    if (deathDate < new Date(deathDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
        deceasedAge--;
    };

    return (
        <div className={styles.person}>
            {loading ? <Loader cssOverride={{ marginTop: '300px', marginRight: '100px' }} /> : (
                <article className={styles.article1}>
                    {data?.profile_path ?
                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.profile_path}`} alt={data.name} /> :
                    <div className={styles['no-image']}>
                        <img
                            src={data?.gender === 1 ?
                                'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg' :
                                'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                            }
                            alt={data?.name}
                        />
                    </div>}
                    {(data?.external_ids.facebook_id || data?.external_ids.twitter_id || data?.external_ids.instagram_id || data?.external_ids.tiktok_id || data?.homepage) ? (
                        <div className={styles['link-container']}>
                            {data.external_ids.facebook_id &&
                            <div>
                                <span>Visit Facebook</span>
                                <a href={`https://www.facebook.com/${data.external_ids.facebook_id}`} target="_blank">
                                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-2c5718e4ece8eb3a3cc49ae97000e541c0aad50869b419b5aa579693bc0ad059.svg" alt="facebook" />
                                </a>
                            </div>}
                            {data.external_ids.twitter_id &&
                            <div>
                                <span>Visit Twitter</span>
                                <a href={`https://twitter.com/${data.external_ids.twitter_id}`} target="_blank">
                                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg" alt="twitter" />
                                </a>
                            </div>}
                            {data.external_ids.instagram_id &&
                            <div>
                                <span>Visit Instagram</span>
                                <a href={`https://www.instagram.com/${data.external_ids.instagram_id}`} target="_blank">
                                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg" alt="instagram" />
                                </a>
                            </div>}
                            {data.external_ids.tiktok_id &&
                            <div>
                                <span>Visit Tiktok</span>
                                <a href={`https://www.tiktok.com/@${data.external_ids.tiktok_id}`} target="_blank">
                                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/tiktok-69d6a5d09a7fd09b663fa45337fa05cbfc4cbf16b45d72d9962b036a9e2702b4.svg" alt="tiktok" />
                                </a>
                            </div>}
                            {data.external_ids.youtube_id &&
                            <div>
                                <span>Visit Youtube</span>
                                <a href={`https://www.youtube.com/${data.external_ids.youtube_id}`} target="_blank">
                                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/youtube-de379f898e1a71c488c71075eb00f5c003699069b9cb1f38c8ac7ea99c8a6338.svg" alt="youtube" />
                                </a>
                            </div>}
                            {data.homepage &&
                            <div>
                                <span>Visit Homepage</span>
                                <a className={(data.external_ids.facebook_id || data.external_ids.twitter_id || data.external_ids.instagram_id || data.external_ids.tiktok_id) ? styles.homepage : ''} href={data.homepage} target="_blank">
                                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg" alt="homepage" />
                                </a>
                            </div>}
                        </div>
                    ) : null}
                    <h3>Personal Info</h3>
                    <h4>Known For</h4>
                    <p>{data?.known_for_department}</p>
                    <h4>Known Credits</h4>
                    <p>49</p>
                    <h4>Gender</h4>
                    <p>{data?.gender === 1 ? 'Female' : 'Male'}</p>
                    <h4>Birthday</h4>
                    <p>{(data?.birthday && alive) ? `${data.birthday} (${age} years old)` : (data?.birthday && !alive) ? data.birthday : '-'}</p>
                    {data?.deathday && (
                        <>
                            <h4>Day of Death</h4>
                            <p>{data.deathday} ({deceasedAge} years old)</p>
                        </>
                    )}
                    <h4>Place of Birth</h4>
                    <p>{data?.place_of_birth ? data.place_of_birth : '-'}</p>
                    <h4>Also Known As</h4>
                    {data?.also_known_as.length > 0 ?
                    <div>
                        {data.also_known_as.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div> :
                    <p className={styles['also-known-as']}>-</p>}
                    <button>
                        <div>
                            <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-217-lock-e9f123776b034a0be74a4f3061cd0b9704e854cb8c29307352f20fec2bac4f46.svg" alt="lock" />
                            LOGIN TO EDIT
                        </div>
                    </button>
                    <div className={styles.keyboard}>
                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-357-keyboard-4de4fe2896d6ba568aeb8c07d250a99374f086554ffd4b1f7645d69325b979ab.svg" alt="keyboard" />
                        <p>Keyboard Shortcuts</p>
                    </div>
                    <div className={styles['speech-alert']}>
                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-933-speech-bubble-alert-b33d276606a1a76a1a612c9a7043dfd275ddf0ac55587a5e6a621323db6c488a.svg" alt="speech-alert" />
                        <p>Login to report an issue</p>
                    </div>
                </article>
            )}
            <article className={styles.article2}>
                {loading ? <LoaderSmall size={25} /> : <h2>{data?.name}</h2>}
                <h3>Biography</h3>
                {loading ? <LoaderSmall size={30} /> : <p>{data?.biography ? data.biography : `We don't have a biography for ${data?.name}.`}</p>}
                <section>
                    <h3>Known For</h3>
                    <div>
                        <div>
                            <img src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" alt="Wednesday" />
                            <h4>Wednesday</h4>
                        </div>
                        <div>
                            <img src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" alt="Wednesday" />
                            <h4>Wednesday</h4>
                        </div>
                        <div>
                            <img src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" alt="Wednesday" />
                            <h4>Wednesday</h4>
                        </div>
                        <div>
                            <img src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" alt="Wednesday" />
                            <h4>Wednesday</h4>
                        </div>
                        <div>
                            <img src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" alt="Wednesday" />
                            <h4>Wednesday</h4>
                        </div>
                        <div>
                            <img src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" alt="Wednesday" />
                            <h4>Wednesday</h4>
                        </div>
                        <div>
                            <img src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" alt="Wednesday" />
                            <h4>Wednesday</h4>
                        </div>
                        <div>
                            <img src="https://www.themoviedb.org/t/p/w150_and_h225_bestv2/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" alt="Wednesday" />
                            <h4>Wednesday</h4>
                        </div>
                    </div>
                </section>
                <Credits loading={loading} name={data?.name || ''} knownForDepartment={data?.known_for_department || ''} />
            </article>
        </div>
    );
};