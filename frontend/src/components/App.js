import React from 'react';
import { Router, Route } from 'react-router-dom';
import DiscList from './disc/DiscList';
import DiscCreate from './disc/DiscCreate';
import DiscUpdate from './disc/DiscUpdate';
import DiscDetail from './disc/DiscDetail';
import DiscDelete from './disc/DiscDelete';
import history from './history';
import Header from './Header';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <div className="container">
          <Route path="/" exact component={DiscList} />
          <Route path="/discs/create" exact component={DiscCreate} />
          <Route path="/discs/update/:id" exact component={DiscUpdate} />
          <Route path="/discs/detail/:id" exact component={DiscDetail} />
          <Route path="/discs/delete/:id" exact component={DiscDelete} />
        </div>
      </Router>
    </div>
  );
};

export default App;
