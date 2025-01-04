
import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ShowsPage from './pages/ShowsPage';
import SearchPage from './pages/SearchPage';
import ShowPage from './pages/ShowPage';

function App() {
    return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shows" element={<ShowsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="shows/:showid" element={<ShowPage />} />
        <Route path="*" element={<DocumentNotFound />} />
      </Route>
    </Routes>)
  }
  
  function DocumentNotFound() {
    return (<div>Virheellinen URL</div>)
  }
  
  

  function Layout() {
    return (
      <div>
        <Header />
        <div className="navigation-bar">
          <div className="shows-link">
            <Link to="/shows">Selaa sarjoja</Link>
          </div>
          <div className="search-link">
            <Link to="/search">Hae sarjoja</Link>
          </div>
        </div>
        <hr />
        <Outlet />
      </div>
    );
  }
  
  
  export default App;
