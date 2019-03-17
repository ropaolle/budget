const express = require('express');
const User = require('../models/User');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Type = require('../models/Type');
const Expense = require('../models/Expense');

const router = express.Router();

// apiPost('/createUser', { username: 'ropaolle', password: 'pass1234', email: 'ropaolle@gmail.com' });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.authenticate(email, password);
    res.json({ token });
  } catch (err) {
    return res.json({ error: err.message });
  }
});

router.get('/login/settings', async (req, res) => {
  const allData = await Promise.all([
    Type.find({}),
    Category.find({}),
    Service.find({}),
    Expense.distinct('description'),
  ]);

  const settings = {
    types: allData[0],
    categories: allData[1],
    services: allData[2],
    autocomplete: allData[3],
  };

  res.json(settings);
});

module.exports = router;
