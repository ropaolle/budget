const mongoose = require('mongoose');

const { Schema } = mongoose;

const typeSchema = new Schema({
  label: { type: String, requiered: true },
  color: { type: String, default: 'success' },
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
