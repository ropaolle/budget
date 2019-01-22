const mongoose = require('mongoose');

const { Schema } = mongoose;

const typeSchema = new Schema({
  label: { type: String },
  color: { type: String },
});

const categorySchema = new Schema({
  label: { type: String },
  title: { type: String },
});

const serviceSchema = new Schema({
  label: { type: String },
  color: { type: String },
  title: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

// https://mongoosejs.com/docs/schematypes.html
const expenseSchema = new Schema({
  cost: { type: Number },
  date: { type: Date /* , default: Date.now */ },
  description: { type: String },
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  type: { type: Schema.Types.ObjectId, ref: 'Type' },
  // services: [serviceSchema],
  recurring: { type: Date },
});

const Service = mongoose.model('Service', serviceSchema);
const Category = mongoose.model('Category', categorySchema);
const Type = mongoose.model('Type', typeSchema);
const User = mongoose.model('User', expenseSchema);

module.exports = User;
