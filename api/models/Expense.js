const mongoose = require('mongoose');

const { Schema } = mongoose;

// https://mongoosejs.com/docs/schematypes.html
const expenseSchema = new Schema({
  cost: { type: Number },
  date: { type: Date, default: Date.now },
  description: { type: String },
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  type: { type: Schema.Types.ObjectId, ref: 'Type' },
  // services: [serviceSchema],
  recurring: { type: Date },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
