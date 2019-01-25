# Budget

## Todo

- [ ] Filter kostnadssidan.

## Info

[Mongoose](https://mongoosejs.com/docs/schematypes.html)
[Express](https://www.terlici.com/2014/09/29/express-router.html)

## Code

```js
Expense.update(
  { _id: id },
  req.body,
  { upsert: true, setDefaultsOnInsert: true },
  (err, data) => {
    if (err) return res.json({ err });
    return res.json(req.body);
  }
);
Expense.findOneAndUpdate(
  { _id: id },
  req.body,
  { upsert: true, new: true },
  (err, data) => {
    if (err) return res.json({ err });
    return res.json(data);
  }
);
```
