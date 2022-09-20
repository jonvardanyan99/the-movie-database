import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';

import { Footer } from './components/Footer';

import { Home } from './pages/Home';

import './App.scss';

function App() {
    return (
        <BrowserRouter basename="/the-movie-database">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
