import React from 'react';
import { Router, Route } from 'react-router-dom';
import AlbumCreate from './album/AlbumCreate';
import AlbumUpdate from './album/AlbumUpdate';
import AlbumDelete from './album/AlbumDelete';
import AlbumList from './album/AlbumList';
import history from '../history';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import CollectionList from './collection/CollectionList';
import CollectionDelete from './collection/CollectionDelete';

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
          <Route path="/" exact component={CollectionList} />
          <Route
            path="/collection/delete/:id"
            exact
            component={CollectionDelete}
          />
          <Route path="/collection/:id/albums" exact component={AlbumList} />
          <Route
            path="/collection/:id/album/create"
            exact
            component={AlbumCreate}
          />
          <Route
            path="/collection/:collectionId/album/update/:id"
            exact
            component={AlbumUpdate}
          />
          <Route
            path="/collection/:collectionId/album/delete/:id"
            exact
            component={AlbumDelete}
          />
        </div>
      </Router>
    </div>
  );
};

export default App;
