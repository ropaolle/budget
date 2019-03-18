require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');

const middleware = require('./middleware');

const { NODE_ENV, BUDGET_API_DB, BUDGET_API_PORT, BUDGET_API_CORS } = process.env;

mongoose.connect(
  BUDGET_API_DB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors({ origin: BUDGET_API_CORS }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', require('./routes/login'));
app.use('/', middleware.checkToken, require('./routes/expenses'));
app.use('/', middleware.checkToken, require('./routes/services'));
app.use('/', middleware.checkToken, require('./routes/backup'));
app.use('/', middleware.checkToken, require('./routes/test'));

if (NODE_ENV === 'production') {
  https
    .createServer(
      {
        key: fs.readFileSync('/home/olle/.ssh/budget-api.key'),
        cert: fs.readFileSync('/home/olle/.ssh/budget-api.cert'),
      },
      app
    )
    .listen(BUDGET_API_PORT, () => console.info(`Production HTTPS on port ${BUDGET_API_PORT}!`));
} else {
  app.listen(BUDGET_API_PORT, () => console.info(`Development HTTP on port ${BUDGET_API_PORT}!`));
}
