# Budget

## Todo

- [ ] Mobilvy, ej tabell
- [ ] DefaultPage
- [ ] Knappen rensa fungerar ej (ersätt clearButton med clearFunction).

## Info

[localeStorage](https://www.robinwieruch.de/local-storage-react/)
[Mongoose](https://mongoosejs.com/docs/schematypes.html)
[Express](https://www.terlici.com/2014/09/29/express-router.html)
[JWT](https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4)

## PM2

```bash
# Install
sudo npm install pm2 -g
pm2 completion install
cd ~/budget && pm2 start ./api/index.js
pm2 startup # Add to autostart

# Update
npm install pm2 -g && pm2 update

# Logging
tail -f /home/olle/.pm2/logs/index-error.log
tail -f /home/olle/.pm2/logs/index-out.log
```

## HTTPS

[Https](https://timonweb.com/posts/running-expressjs-server-over-https/)

```bash
cd ~/.ssh
openssl req -nodes -new -x509 -keyout budget-api.key -out budget-api.cert
```

```js
const fs = require('fs');
const https = require('https');

https
  .createServer(
    {
      key: fs.readFileSync('/home/olle/.ssh/budget-api.key'),
      cert: fs.readFileSync('/home/olle/.ssh/budget-api.cert'),
    },
    app
  )
  .listen(REACT_APP_API_PORT, () => console.info(`Example app listening on port ${REACT_APP_API_PORT}!`));
```

## Code

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
