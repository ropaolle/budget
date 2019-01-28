const express = require('express');
const mongoose = require('mongoose');
const Expense = require('../models/Expense');

const router = express.Router();

router.post('/expenses', (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  Expense.findOneAndUpdate({ _id: id || new mongoose.mongo.ObjectID() }, req.body, { upsert: true, new: true })
    .populate('service')
    .populate('category')
    .populate('type')
    .exec((err, data) => {
      if (err) return res.json({ err });
      return res.json(data);
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
    return res.json({ err });
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
