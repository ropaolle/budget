const express = require('express');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Type = require('../models/Type');
const Expense = require('../models/Expense');
const data = require('./test');
const uniq = require('lodash.uniq');
// const camelCase = require('lodash.camelcase');
const capitalize = require('lodash.capitalize');

const router = express.Router();

// console.log(data);

function typeToId(type) {
  switch (type.toLowerCase()) {
    case 'onetime':
      return '5c4d7368b648553f0c6f631f';
    case 'monthly':
      return '5c4d7368b648553f0c6f6320';
    case 'bimonthly':
      return '5c4d7368b648553f0c6f6321';
    case 'quarterly':
      return '5c4d7368b648553f0c6f6322';
    case 'yearly':
      return '5c4d7368b648553f0c6f6323';
    default:
      console.log(type);
      return '';
  }
}

function categoryToId(number) {
  switch (number.toString()) {
    case '0':
      return '5c4d7368b648553f0c6f630a';
    case '1':
      return '5c4d7368b648553f0c6f630b';
    case '2':
      return '5c4d7368b648553f0c6f630c';
    case '3':
      return '5c4d7368b648553f0c6f630d';
    case '4':
      return '5c4d7368b648553f0c6f630e';
    case '5':
      return '5c4d7368b648553f0c6f630f';
    case '6':
      return '5c4d7368b648553f0c6f6310';
    case '7':
      return '5c4d7368b648553f0c6f6311';
    case '8':
      return '5c4d7368b648553f0c6f6312';
    case '9':
      return '5c4d7368b648553f0c6f6313';
    case '10':
      return '5c4d7368b648553f0c6f6314';
    case '11':
      return '5c4d7368b648553f0c6f6315';
    case '12':
      return '5c4d7368b648553f0c6f6316';
    case '13':
      return '5c4d7368b648553f0c6f6317';
    case '14':
      return '5c4d7368b648553f0c6f6318';
    case '15':
      return '5c4d7368b648553f0c6f6319';
    case '100':
      return '5c4d7368b648553f0c6f631a';
    case '105':
      return '5c4d7368b648553f0c6f631b';
    case '101':
      return '5c4d7368b648553f0c6f631c';
    case '102':
      return '5c4d7368b648553f0c6f631d';
    case '103':
      return '5c4d7368b648553f0c6f631e';
    default:
      console.log(number);
      return '';
  }
}

/*
cost: '272.5', // , -> .
    description: '1 back öl',
    service: null,
    type: '5c4826880b2d2a02f0ed0b65',
    date: '2018-06-01T00:00:00.000Z',
    category: '5c4826880b2d2a02f0ed0b60',
*/

router.post('/createOptions', async (req, res) => {
  try {

    const s = data.map(v => v.service);
    const y = uniq(s);
console.log(y);

const services = [];

    const bulk = data.map(v => {
      // TODO: Skapa services
      const newDoc = {
        ...v,
        cost: v.cost.replace(',', '.'),
        type: typeToId(v.type),
        category: categoryToId(v.category),

      };
      return newDoc; //{ insertOne: { document: newDoc } };
    });

    // console.log(bulk);

    // const res1 = await Expense.bulkWrite(bulk);
    // const res1 = await Category.bulkWrite([
    //   { insertOne: { document: { label: 'Övrigt', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Bygg', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Bil', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Bar', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Mat', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Medicin', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Restaurang', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Tjänster', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Elektronik', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Resor', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Bubbis', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Kläder/möbler/mm', type: 'expense' } } },
    //   { insertOne: { document: { label: 'El', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Försäkringar', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Hyra', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Pension', type: 'expense' } } },
    //   { insertOne: { document: { label: 'Licencia Lön', type: 'income' } } },
    //   { insertOne: { document: { label: 'TeleOffice Lön', type: 'income' } } },
    //   { insertOne: { document: { label: 'Licencia Pension', type: 'income' } } },
    //   { insertOne: { document: { label: 'Tradera', type: 'income' } } },
    //   { insertOne: { document: { label: 'Skatteåterbäring', type: 'income' } } },
    // ]);
    // const ids = res1.result.insertedIds.map(({ _id }) => _id);
    // const res2 = await Service.bulkWrite([
    //   { insertOne: { document: { value: '0', label: 'Ica', category: ids[0] } } },
    //   { insertOne: { document: { value: '1', label: 'Coop', category: ids[0] } } },
    //   { insertOne: { document: { value: '2', label: 'Dustin', category: ids[2] } } },
    // ]);
    // const res3 = await Type.bulkWrite([
    //   { insertOne: { document: { color: 'success', label: 'oneTime' } } },
    //   { insertOne: { document: { color: 'success', label: 'monthly' } } },
    //   { insertOne: { document: { color: 'success', label: 'biMonthly' } } },
    //   { insertOne: { document: { color: 'success', label: 'quarterly' } } },
    //   { insertOne: { document: { color: 'success', label: 'yearly' } } },
    // ]);
    return res.json({ state: 'success', res1 });
  } catch (err) {
    return res.json({ type: 'createOptions', err });
  }
});

module.exports = router;
