const express = require('express');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Type = require('../models/Type');

const router = express.Router();

router.post('/createOptions', async (req, res) => {
  try {
    // const res1 = await Category.bulkWrite([
    //   { insertOne: { document: { value: '0', label: 'Mat', title: '' } } },
    //   { insertOne: { document: { value: '1', label: 'Bil', title: '' } } },
    //   { insertOne: { document: { value: '2', label: 'Elektronik', title: '' } } },
    // ]);
    // const ids = res1.result.insertedIds.map(({ _id }) => _id);
    // const res2 = await Service.bulkWrite([
    //   { insertOne: { document: { value: '0', label: 'Ica', category: ids[0] } } },
    //   { insertOne: { document: { value: '1', label: 'Coop', category: ids[0] } } },
    //   { insertOne: { document: { value: '2', label: 'Dustin', category: ids[2] } } },
    // ]);
    // const res3 = await Type.bulkWrite([
    //   { insertOne: { document: { color: 'success', label: 'oneTime' } } },
    //   { insertOne: { document: { color: 'success', label: 'monthly' } } },
    //   { insertOne: { document: { color: 'success', label: 'biMonthly' } } },
    //   { insertOne: { document: { color: 'success', label: 'quarterly' } } },
    //   { insertOne: { document: { color: 'success', label: 'yearly' } } },
    // ]);
    return res.json({ state: 'success', res1, res2, res3 });
  } catch (err) {
    return res.json({ type: 'createOptions', err });
  }
});

module.exports = router;
