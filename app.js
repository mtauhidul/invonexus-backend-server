const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const documentRouter = require('./controllers/document');
const statusRouter = require('./controllers/status');
const userRouter = require('./controllers/user');
const textRouter = require('./controllers/text');
const tagRouter = require('./controllers/tag');
const categoryRouter = require('./controllers/category');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info(`connecting to ${config.TEST_URI}`);

mongoose.set('strictQuery', false);

mongoose
  .connect(config.TEST_URI)
  .then(() => {
    logger.info('connected to test database');
  })
  .catch((error) => {
    logger.error('error connecting to test database', error.message);
  });

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/documents', documentRouter);
app.use('/api/status', statusRouter);
app.use('/api/users', userRouter);
app.use('/api/text', textRouter);
app.use('/api/tags', tagRouter);
app.use('/api/categories', categoryRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
