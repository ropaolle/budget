require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const https = require('https');

const middleware = require('./middleware');

// Enviorment
// console.log(Object.entries(process.env).filter(([key]) => key.includes('REACT_APP_')));
const { REACT_APP_DB, REACT_APP_API_PORT, REACT_APP_API_CORS } = process.env;

mongoose.connect(
  REACT_APP_DB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors({ origin: REACT_APP_API_CORS }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// use sessions for tracking logins
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
  })
);

app.use('/', require('./routes/login'));
app.use('/', middleware.checkToken, require('./routes/expenses'));
app.use('/', middleware.checkToken, require('./routes/services'));
app.use('/', middleware.checkToken, require('./routes/backup'));
app.use('/', middleware.checkToken, require('./routes/test'));

// HTTP
app.listen(REACT_APP_API_PORT, () => console.info(`Example app listening on port ${REACT_APP_API_PORT}!`));

// HTTPS
// https
//   .createServer(
//     {
//       key: fs.readFileSync('/home/olle/.ssh/budget-api.key'),
//       cert: fs.readFileSync('/home/olle/.ssh/budget-api.cert'),
//     },
//     app
//   )
//   .listen(REACT_APP_API_PORT, () => console.info(`Example app listening on port ${REACT_APP_API_PORT}!`));
