const fs = require('fs');
const format = require('date-fns/format');
const express = require('express');

const Expense = require('../models/Expense');
const Category = require('../models/Category');
const Service = require('../models/Service');
const User = require('../models/User');
const Type = require('../models/Type');

const router = express.Router();

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, err => {
      if (err) reject(err);
      else resolve();
    });
  });

router.get('/backup', async (req, res) => {
  try {
    const data = await Promise.all([
      User.find().lean(),
      Type.find().lean(),
      Category.find().lean(),
      Service.find().lean(),
      Expense.find().lean(),
    ]);

    const dataObject = {
      users: data[0],
      types: data[1],
      categories: data[2],
      services: data[3],
      expenses: data[4],
    };

    const path = `./api/backup/${format(new Date(), 'YYYYMMDD-HHmmss')}.json`;
    await writeFile(path, JSON.stringify(dataObject, null, 4));

    return res.json({ backup: 'ok' });
  } catch (err) {
    return res.json({ error: err.message });
  }
});

module.exports = router;
