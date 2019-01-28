const express = require('express');
const fs = require('fs');
// const User = require('../models/User');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Type = require('../models/Type');
const Expense = require('../models/Expense');

const router = express.Router();

router.get('/backup', async (req, res) => {
  // console.log(req.body);
  const data = await Promise.all([Type.find({}), Category.find({}), Service.find({}), Expense.find({})]);

  const allData = {
    types: data[0],
    categories: data[1],
    services: data[2],
    expenses: data[3],
  };

  const json = JSON.stringify(allData);

  fs.writeFile('./api/backup/data.json', json, 'utf8', err => {
    if (err) console.error(err);
    console.info('The file has been saved!');
  });

  res.json({ body: '' });
});

module.exports = router;
