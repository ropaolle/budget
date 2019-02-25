const fs = require('fs');
const format = require('date-fns/format');
const express = require('express');
const mongoose = require('mongoose');

const Expense = require('../models/Expense');
const Category = require('../models/Category');
const Service = require('../models/Service');

const router = express.Router();

router.post('/expenses', async (req, res) => {
  const { data } = req.body;
  const { id, category, service } = data;

  // If Category is not an objectId and a string, then create new Category.
  if (!mongoose.Types.ObjectId.isValid(category) && typeof category === 'string' && category.length > 0) {
    const c = new Category({ label: category });
    await c.save(err => {
      if (err) return console.error(err);
      data.category = c.id;
    });
  }

  // If Service is not an objectId and a string, then create new Service.
  if (!mongoose.Types.ObjectId.isValid(service) && typeof service === 'string' && service.length > 0) {
    const s = new Service({ label: service, category: data.category });
    await s.save(err => {
      if (err) return console.error(err);
      data.service = s.id;
    });
  }

  Expense.findOneAndUpdate({ _id: id || new mongoose.mongo.ObjectID() }, data, { upsert: true, new: true })
    .populate('service')
    .populate('category')
    .populate('type')
    .exec((err, result) => {
      if (err) return res.json({ err });
      return res.json(result);
    });
});

router.get('/expenses', async (req, res) => {
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
    return res.json({ error: err.message });
  }
});

router.get('/expenses/export', async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate('category')
      .populate('service')
      .populate('type')
      // .limit(5)
      .sort({ date: -1 });
    return res.json({ expenses });
  } catch (err) {
    return res.json({ error: err.message });
  }
});

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, err => {
      if (err) reject(err);
      else resolve();
    });
  });

router.get('/expenses/export/:filetype', async (req, res) => {
  try {
    const { filetype } = req.params;

    const expenses = await Expense.find()
      .lean()
      .populate('category')
      .populate('service')
      .populate('type')
      // .limit(5)
      .sort({ date: -1 });

    if (filetype === 'json') {
      const path = `./api/backup/expenses_${format(new Date(), 'YYYYMMDD-HHmmss')}.json`;
      await writeFile(path, JSON.stringify(expenses, null, 4));
      return res.json({ backup: 'ok' });
    }

    if (filetype === 'excel') {
      return res.json({ expenses });
    }

    return res.send(200);
  } catch (err) {
    return res.json({ error: err.message });
  }
});

router.get('/expenses/:id', (req, res) => {
  const { id } = req.params;
  Expense.findById(id).exec((err, data) => {
    if (err) return res.json({ err });
    return res.json(data);
  });
});

router.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  Expense.remove({ _id: id }, err => {
    if (err) return res.json({ err });
    return res.json({ id });
  });
});

module.exports = router;
