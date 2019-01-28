# Budget

## Todo

- [ ] Visa, skapa och ändra tjänster och kategorier.
- [ ] Auto suggest för beskrivning.
- [ ] Exportera till Excel.
- [ ] Importera från Excel.
- [ ] Kortare pager.

## Info

[Mongoose](https://mongoosejs.com/docs/schematypes.html)
[Express](https://www.terlici.com/2014/09/29/express-router.html)

## Code

```js

const categories = [
  { value: '0', label: 'Övrigt', type: 'expense' },
  { value: '1', label: 'Bygg', type: 'expense' },
  { value: '2', label: 'Bil', type: 'expense' },
  { value: '3', label: 'Bar', type: 'expense' },
  { value: '4', label: 'Mat', type: 'expense' },
  { value: '5', label: 'Medicin', type: 'expense' },
  { value: '6', label: 'Restaurang', type: 'expense' },
  { value: '7', label: 'Tjänster', type: 'expense' },
  { value: '8', label: 'Elektronik', type: 'expense' },
  { value: '9', label: 'Resor', type: 'expense' },
  { value: '10', label: 'Bubbis', type: 'expense' },
  { value: '11', label: 'Kläder/möbler/mm', type: 'expense' },
  { value: '12', label: 'El', type: 'expense' },
  { value: '13', label: 'Försäkringar', type: 'expense' },
  { value: '14', label: 'Hyra', type: 'expense' },
  { value: '15', label: 'Pension', type: 'expense' },
  { value: '100', label: 'Licencia Lön', type: 'income' },
  { value: '101', label: 'Licencia Pension', type: 'income' },
  { value: '102', label: 'Tradera', type: 'income' },
  { value: '103', label: 'Skatteåterbäring', type: 'income' },
];

```
