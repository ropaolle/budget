const express = require('express');
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const Category = require('../models/Category');
const Service = require('../models/Service');

const router = express.Router();

function createNewCategoryOrService(val) {
  // If none empty string and not objectId
  return !mongoose.Types.ObjectId.isValid(val) && typeof val === 'string' && val.length > 0;
}

async function createExpense(expense) {
  const { id, category, service } = expense;

  // Create new Category if missing
  if (createNewCategoryOrService(category)) {
    const newCategory = new Category({ label: category });
    const savedCategory = await newCategory.save();
    expense.category = savedCategory.id;
  }

  // Create new Service if missing
  if (createNewCategoryOrService(service)) {
    const newService = new Service({ label: service, category: expense.category });
    const savedService = await newService.save();
    expense.service = savedService.id;
  }

  return Expense.findOneAndUpdate({ _id: id || new mongoose.mongo.ObjectID() }, expense, {
    upsert: true,
    new: true,
  })
    .populate('service')
    .populate('category')
    .populate('type')
    .exec();
}

router.post('/expenses', async (req, res) => {
  try {
    res.json(await createExpense(req.body));
  } catch (err) {
    return res.json({ error: err.message });
  }
});

router.post('/expenses/import', async (req, res) => {
  try {
    for (const expense of req.body) {
      await createExpense(expense);
    }
    return res.json({ result: 'success', count: req.body.length });
  } catch (err) {
    return res.json({ error: err.message });
  }
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
      .lean()
      .populate('category')
      .populate('service')
      .populate('type')
      .sort({ date: -1 });

    return res.json({ expenses });
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
