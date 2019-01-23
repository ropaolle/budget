const mongoose = require('mongoose');
const idToValue = require('./extras');

const { Schema } = mongoose;

const serviceSchema = new Schema({
  label: { type: String, unique: true },
  color: { type: String },
  title: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

serviceSchema.set('toJSON', { virtuals: true, transform: idToValue });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
