import './App.scss';

import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Page } from './components/Page';
import { ScrollToTop } from './components/ScrollToTop';
import { AiringToday } from './pages/AiringToday';
import { Cast } from './pages/Cast';
import { Film } from './pages/Film';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { NowPlaying } from './pages/NowPlaying';
import { OnTV } from './pages/OnTV';
import { Person } from './pages/Person';
import { PopularPeople } from './pages/PopularPeople';
import { Search } from './pages/Search';
import { TopRatedMovies } from './pages/TopRatedMovies';
import { TopRatedTVShows } from './pages/TopRatedTVShows';
import { TVs } from './pages/TVs';
import { Upcoming } from './pages/Upcoming';

export const App = () => {
  return (
    <BrowserRouter basename="/the-movie-database">
      <ScrollToTop>
        <Header />
        <Page>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:mediaType/:id" element={<Film />} />
            <Route path="/:mediaType/:id/cast" element={<Cast />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/now-playing" element={<NowPlaying />} />
            <Route path="/movies/upcoming" element={<Upcoming />} />
            <Route path="/movies/top-rated" element={<TopRatedMovies />} />
            <Route path="/tvs" element={<TVs />} />
            <Route path="/tvs/airing-today" element={<AiringToday />} />
            <Route path="/tvs/on-the-air" element={<OnTV />} />
            <Route path="/tvs/top-rated" element={<TopRatedTVShows />} />
            <Route path="/people" element={<PopularPeople />} />
            <Route path="/person/:id" element={<Person />} />
            <Route path="/search/:category" element={<Search />} />
          </Routes>
        </Page>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
};
