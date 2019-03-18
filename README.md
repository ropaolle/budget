# Budget

## Todo

- [ ] Mobilvy, ej tabell
- [ ] Knappen rensa fungerar ej (ersätt clearButton med clearFunction).

## Info

[localeStorage](https://www.robinwieruch.de/local-storage-react/)
[Mongoose](https://mongoosejs.com/docs/schematypes.html)
[Express](https://www.terlici.com/2014/09/29/express-router.html)
[JWT](https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4)

### API

```bash
git submodule add https://github.com/ropaolle/budget-api.git api
```

## Code

### Console.log

```js
// Raw
console.log(String.raw`Hello\nWorld`);

// Group
console.group("process.env");
console.log(process.env.REACT_APP_API_PATH);
console.groupEnd();
```

### Load text file

```js
  <Label hidden for="importFile">
    Ladda fil som ska importeras
  </Label>
  <CustomInput
    type="file"
    onChange={e => this.loadFile(e.target.files[0])}
    id="importFile"
    name="importFile"
    label={file ? file.name : 'Välj fil...'}
  />

  loadFile(file) {
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const workbook = XLSX.read(fileReader.result, { type: 'binary', cellDates: true, cellStyles: true });
      console.log(workbook);
    };

    fileReader.readAsText(file);
  }
```

### For loops

```js
for (const x of [...Array(5).keys()]) {
  console.log(x);
}

for (let i = 0; i < length; i++) {
  binary += String.fromCharCode(bytes[i]);
}
```

### Destructuring Nested Objects

```js
const y = { o: { x: 2 } };
const {
  o: { x }
} = y;
console.log(x);
```
