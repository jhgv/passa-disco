import React from 'react';
import { Router, Route } from 'react-router-dom';
import AlbumList from './album/AlbumList';
import AlbumCreate from './album/AlbumCreate';
import AlbumUpdate from './album/AlbumUpdate';
import AlbumDelete from './album/AlbumDelete';
import history from '../history';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <div className="text-center mb-5">
          <h1 className="font-weight-light">
            <FontAwesomeIcon icon={faCompactDisc} /> Passa Disco!
          </h1>
          <hr />
        </div>
        <div className="container">
          <Route path="/" exact component={AlbumList} />
          <Route path="/album/create" exact component={AlbumCreate} />
          <Route path="/album/update/:id" exact component={AlbumUpdate} />
          <Route path="/album/delete/:id" exact component={AlbumDelete} />
        </div>
      </Router>
    </div>
  );
};

export default App;
