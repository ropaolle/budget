const mongoose = require('mongoose');
const idToValue = require('./extras');

const { Schema } = mongoose;

const categorySchema = new Schema({
  label: { type: String, index: true, unique: true },
  title: { type: String },
});

categorySchema.set('toJSON', { virtuals: true, transform: idToValue });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
