const mongoose = require('mongoose');
const format = require('date-fns/format');

const { Schema } = mongoose;

const expenseSchema = new Schema({
  cost: { type: Number },
  date: { type: Date, default: Date.now },
  description: { type: String },
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  type: { type: Schema.Types.ObjectId, ref: 'Type' },
  recurring: { type: Date },
});

expenseSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => ({
    ...ret,
    date: format(ret.date, 'YYYY-MM-DD'),
    recurring: ret.recurring ? format(ret.recurring, 'YYYY-MM-DD') : '',
  }),
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
