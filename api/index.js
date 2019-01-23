require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const User = require('./models/User');
// const Expense = require('./models/Expense');
// const Type = require('./models/Type');

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
// const router = express.Router();

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

app.use('/', require('./routes/options'));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.authenticate(email, password, (err, user) => res.json({ err, user }));
});

app.listen(REACT_APP_API_PORT, () => console.info(`Example app listening on port ${REACT_APP_API_PORT}!`));

/* app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/createUser', (req, res, next) => {
  const user = new User(req.body);
  user.save(err => {
    // console.log(err, user);
    if (err) return next(err);
    return res.json(user);
  });
});

app.post('/createExpense', (req, res, next) => {
  const expense = new Expense(req.body);
  expense.save(err => {
    // console.log(err, expense);
    if (err) return next(err);
    return res.json(expense);
  });
});

app.post('/createType', (req, res, next) => {
  // const type = new Type({ label: 'oneTime' });
  // type.save(err => {
  //   // console.log(err, type);
  //   if (err) return next(err);
  //   return res.json(type);
  // });

  try {
    Type.bulkWrite([
      { insertOne: { document: { color: 'success', label: 'oneTime' } } },
      { insertOne: { document: { color: 'success', label: 'monthly' } } },
      { insertOne: { document: { color: 'success', label: 'biMonthly' } } },
      { insertOne: { document: { color: 'success', label: 'quarterly' } } },
      { insertOne: { document: { color: 'success', label: 'yearly' } } },
    ]).then(x => {
      console.log(x);
      return res.json(x);
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

app.post('/getTypes', (req, res, next) => {
  Type.find({}, (err, persons) => {
    if (err) return next(err);
    console.log(persons);
    return res.json(persons);
  });
}); */
