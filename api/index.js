require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const User = require('./models/User');
const Category = require('./models/Category');
const Service = require('./models/Service');
const Type = require('./models/Type');
const Expense = require('./models/Expense');

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
  User.authenticate(email, password, async (err, user) => {
    if (err) return res.json({ err });
    // const types = await Type.find({}, (err, data) => data);
    const allData = await Promise.all([
      Type.find({}, (err, data) => data),
      Category.find({}, (err, data) => data),
      Service.find({}, (err, data) => data),
    ]);
    const options = {
      types: allData[0],
      categories: allData[1],
      services: allData[2],
    };

    res.json({ user, settings: options });
  });
});

app.post('/expenses', (req, res) => {
  const { id } = req.body;
  Expense.findOneAndUpdate({ _id: id || new mongoose.mongo.ObjectID() }, req.body, { upsert: true, new: true })
    .populate('service')
    .populate('category')
    .populate('type')
    .exec((err, data) => {
      if (err) return res.json({ err });
      return res.json(data);
    });
});

app.get('/expenses', async (req, res) => {
  const { order, sort, skip, limit, filters = {} } = req.query;
  try {
    const query = JSON.parse(filters);
    const totalCount = await Expense.countDocuments(query);
    const expenses = await Expense.find(query)
      .populate('category')
      .populate('service')
      .populate('type')
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ [sort || 'data']: order === 'asc' ? 1 : -1 });
    return res.json({ expenses, totalCount });
  } catch (err) {
    return res.json({ err });
  }
});

app.get('/expenses/:id', (req, res) => {
  const { id } = req.params;
  Expense.findById(id).exec((err, data) => {
    if (err) return res.json({ err });
    return res.json(data);
  });
});

app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  Expense.remove({ _id: id }, err => {
    if (err) return res.json({ err });
    return res.json({ id });
  });
});

app.listen(REACT_APP_API_PORT, () => console.info(`Example app listening on port ${REACT_APP_API_PORT}!`));
