FIREBASE
----------------------------------------
### Install Firebase
```
npm install -g firebase-tools
```
### Login and create new project
```
firebase login --no-localhost
firebase init
```
### Deploy project
```
#firebase use --add olle-fb
firebase deploy --only hosting
```
### Install functions
Install in folder /functions
```
npm install firebase-functions@latest
nano ~/.config/configstore/@google-cloud/functions-emulator/config.json
  "bindHost": "192.168.10.146",
firebase serve --only functions --host 192.168.10.146
```
