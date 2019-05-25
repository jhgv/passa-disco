const supertest = require('supertest');

const app = require('../app');

global.app = app;
global.request = supertest(app);
