# Budget

## Todo
- [ ] Mobilvy, ej tabell
- [ ] DefaultPage
- [ ] Importera från Excel

## Info
[localeStorage](https://www.robinwieruch.de/local-storage-react/)
[Mongoose](https://mongoosejs.com/docs/schematypes.html)
[Express](https://www.terlici.com/2014/09/29/express-router.html)
[JWT](https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4)

## Code

```js
label med forHtml till input

// TODO: FileReader
const importExpenses = file => {
  const fileReader = new FileReader();

  fileReader.onloadend = () => {
    const content = fileReader.result;
    console.log(content);
  };

  fileReader.readAsText(file);
};

```
