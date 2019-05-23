import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <Link className="navbar-brand" to="/">
          Passa Disco!
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/discs/create" className="nav-link">
                Create Disc
              </Link>
            </li>
          </ul>
          <span className="navbar-text">
            <a
              href="https://github.com/jhgv/passa-disco"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} /> Code
            </a>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
