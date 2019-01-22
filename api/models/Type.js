const mongoose = require('mongoose');

const { Schema } = mongoose;

const typeSchema = new Schema({
  label: { type: String },
  color: { type: String },
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
