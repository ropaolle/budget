const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  label: { type: String, index: true, unique: true },
  title: { type: String },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
