const mongoose = require('mongoose');
const idToValue = require('./extras');

const { Schema } = mongoose;

const typeSchema = new Schema({
  label: { type: String, unique: true },
  color: { type: String, default: 'success' },
});

typeSchema.set('toJSON', { virtuals: true, transform: idToValue });

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
