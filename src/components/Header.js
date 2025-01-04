//header-komponentti
import React from 'react';
import { Link } from 'react-router-dom';
import tv from '../utils/tv.jpg'; 

function Header() {
  return (
    <Link to="/" className="link">
      <header className="header">
        <img src={tv} alt="Television" />
        <h1 className="header-text">TV-sarjat</h1>
      </header>
    </Link>
  );
}

export default Header;
