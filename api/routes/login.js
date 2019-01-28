const express = require('express');
const User = require('../models/User');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Type = require('../models/Type');
const Expense = require('../models/Expense');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.authenticate(email, password, async (err, user) => {
    if (err) return res.json({ err });

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

    res.json({ user, settings });
  });
});

module.exports = router;
