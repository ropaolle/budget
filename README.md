# Todo
- [ ] Cron: Update statistics
- [ ] 
- [ ] 
- [x] Load from db
      App
      1. Load auth listener
      - App>AppBar: auth.user
      - PrivateRoute: auth.isAuthenticated
      Budget
      1. if not loaded: Load budget settings+expenses
      2. Add expenses listener
      Charts
      1. if not loaded: Load budget settings
      2. Add budget settings listener

# Later
- [ ] Cron: DB backup
- [ ] Import montly/yearly expenses
- [ ] Import from .xls

# Firebase

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
# firebase use --add olle-fb
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

# Create React App

### Create empty project and eject
``` bash
# New app
create-react-app budget
cd budget

# Init git
git init

# Eject
npm run eject

# Create Budget on GitHub
git remote add origin git@github.com:ropaolle/budget.git
git remote -v
git push origin master
npm i
```
