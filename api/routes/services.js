const express = require('express');
const mongoose = require('mongoose');
const Service = require('../models/Service');

const router = express.Router();

router.post('/services', (req, res) => {
  const { value: id } = req.body;
  Service.findOneAndUpdate({ _id: id || new mongoose.mongo.ObjectID() }, req.body, { upsert: true, new: true }).exec(
    (err, data) => {
      if (err) return res.json({ err });
      return res.json(data);
    }
  );
});

module.exports = router;
