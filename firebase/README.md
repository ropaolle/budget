# FIREBASE

### Install Firebase
``` bash
npm install -g firebase-tools
```
### Login and create new project
``` bash
firebase login --no-localhost
firebase init
```
### Deploy project
``` bash
#firebase use --add olle-fb
firebase deploy --only hosting
```
### Install functions
Install in folder /functions
``` bash
npm install firebase-functions@latest
nano ~/.config/configstore/@google-cloud/functions-emulator/config.json
  "bindHost": "192.168.10.146",
firebase serve --only functions --host 192.168.10.146
```

### Backup
``` bash
# run
npm run backup

# Install
npm install -g firestore-backup
firestore-backup --accountCredentials ./backup/fb.json --backupPath ./backup --prettyPrint
```
