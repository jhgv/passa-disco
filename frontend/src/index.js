import 'bootstrap/dist/css/bootstrap.min.css';
// TODO: Remove if no js bootstrap features are going to be used
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(<App />, document.querySelector('#root'));
