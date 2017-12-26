## Todo
- [x] Use shapes in props validation

- [ ] Requiered data
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


## Content
[Notes and referenses](#notes-and-ref)

### Configure line endings in git
Update your .gitattributes
```
git config core.eol lf
git config core.autocrlf input
git checkout-index --force --all
```

----------------------------------------
# FIREBASE

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

## Backup
Run ```npm run backup```
```
npm install -g firestore-backup
firestore-backup --accountCredentials ./backup/fb.json --backupPath ./backup --prettyPrint
```

----------------------------------------

# <a name="notes-and-ref"></a>Notes and references
[Apps-script](https://developers.google.com/apps-script/overview)
[Markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  
[Github most stars](https://github.com/search?q=stars:%3E1&s=stars&type=Repositories)
[Github trending](https://github.com/trending)
[Github Gist's](https://gist.github.com/)

#### Gravatar
[How-to](https://en.gravatar.com/site/implement/)

#### Create empty project and eject
```
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

#### Todo-list example
```
// TODO(id-123): Todo-list example. #tag1 #tag2
```
> TODO, FIXME, CHANGED, XXX, IDEA, HACK, NOTE, REVIEW, NB, BUG, QUESTION, COMBAK, TEMP*/

#### Telldus API
http://api.telldus.net/localapi/api.html
http://192.168.10.104/api
http://192.168.10.104/api/devices/list
http://api.telldus.net/localapi/api/authentication.html#step-1-request-a-request-token

----------------------------------------

# JavaScript
### Handle missing gravatar
``` JS
import request from 'request';
const send404IfNoPhoto = '?d=404';
request(`photoURL${send404IfNoPhoto}`, { json: true }, (err, res, body) => {
  if (err) { return; }
  if (body === '404 Not Found') {
   // Gravatar does not exist
  }
});
```

### Timer functions
``` JS
console.time('genArray');
console.timeEnd('genArray');

var start = window.performance.now();
var end = window.performance.now();
var time = end - start;
console.log(time);
```

### SVG icon
``` JS
import SvgIcon from 'material-ui/SvgIcon';
const GitHubIcon = props => (
 <SvgIcon {...props}>
   {<path
     d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
   />}
 </SvgIcon>
);
```

### React
``` JS
componentWillReceiveProps(nextProps) { console.log('componentWillReceiveProps'); }
shouldComponentUpdate(nextProps, nextState) { console.log('shouldComponentUpdate'); return true; }
componentWillUpdate(nextProps, nextState) { console.log('componentWillUpdate'); }
componentDidUpdate(prevProps, prevState) { console.log('componentDidUpdate'); }

ref={(c) => { this.gridWrapper = c; }}

componentDidMount() {
 window.addEventListener('resize', this.updateDimensions);
}

componentWillUnmount() {
 window.removeEventListener('resize', this.updateDimensions);
}

componentDidMount() {
 const gridSize = window.innerWidth - (window.innerWidth % 10) - 30;
 if (gridSize < 400) {
   this.setState({
     width: gridSize + 1,
     height: gridSize + 1,
   });
 }
}
```

### Move collections
``` JS
const a = snapshot.docs.map(doc => doc.data());
const categories = { 0: 'Övrigt', 1: 'Bygg', 2: 'Bil', 3: 'Bar', 4: 'Mat', 5: 'Medicin', 6: 'Restaurang', 7: 'Tjänster', 8: 'Elektronik', 9: 'Resor', 10: 'Bubbis', 11: 'Kläder/möbler/mm', 12: 'El', 13: 'Försäkringar', 14: 'Hyra' };
const types = { monthly: 'Monthly', oneTime: 'One time', quartely: 'Quartely', yearly: 'Yearly' };
database.collection('settings').doc('categories').set(categories);
database.collection('settings').doc('types').set(types);
```
