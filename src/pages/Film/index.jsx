import { React } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '../../hooks/useQuery';
import { Cast } from './components/Cast';
import { Collection } from './components/Collection';
import { CurrSeason } from './components/CurrSeason';
import { Facts } from './components/Facts';
import { Media } from './components/Media';
import { Overview } from './components/Overview';
import { Recommendations } from './components/Recommendations';
import { Social } from './components/Social';
import { Stats } from './components/Stats';
import styles from './styles.module.scss';

export const Film = () => {
  const params = useParams();
  const { loading, data = {} } = useQuery({
    url: `/${params.mediaType}/${params.id}`,
    params: '&language=en-US&page=1',
  });

  return (
    <div className={styles.film}>
      <Overview
        loading={loading}
        id={data.id || 0}
        name={data.title || data.name || ''}
        date={data.release_date || data.first_air_date || ''}
        genres={data.genres || []}
        runtime={data.runtime || 0}
        posterPath={data.poster_path || ''}
        backPhoto={data.backdrop_path || ''}
        voteAverage={data.vote_average || 0}
        tagline={data.tagline || ''}
        overview={data.overview || ''}
        createdBy={data.created_by || []}
      />
      <article>
        <section>
          <Cast />
          {params.mediaType === 'tv' && (
            <CurrSeason
              loading={loading}
              lastEpisodeToAir={data.last_episode_to_air || {}}
              nextEpisodeToAir={data.next_episode_to_air || {}}
              seasons={data.seasons || []}
              name={data.name || ''}
            />
          )}
          <Social loading={loading} name={data.title || data.name || ''} />
          <Media name={data.title || data.name || ''} />
          {data.belongs_to_collection && (
            <Collection loading={loading} id={data.belongs_to_collection.id} />
          )}
          <Recommendations loading={loading} name={data.title || data.name || ''} />
        </section>
        <section>
          <Facts
            loading={loading}
            homePage={data.homepage || ''}
            status={data.status || ''}
            networks={data.networks || []}
            type={data.type || ''}
            originalLanguage={data.original_language || ''}
            budget={data.budget || 0}
            revenue={data.revenue || 0}
          />
          <Stats />
        </section>
      </article>
    </div>
  );
};
