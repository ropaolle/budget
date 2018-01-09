# Todo
* [ ] Cost format -> 20.00 kr
* [ ] Planned expenses: Auto insert. Ignore coming... 
 
# Later
* [ ] Cron: Update statistics
* [ ] Cron: DB backup
* [ ] Import from .xls with (react-file-input)

# Emmet
div>span.test -> `<div><span className="test"></span></div>`

# Diverse
* Search: Ctrl+p, type >, typ # search
* workspace, @ search file
* Select: Alt+Shift+Mouse select column
* Move row: alt+up/down
* RightClick find all referenses
* Select func name press F2, rename + enter: öppnar alla filer med denna ref
* Factor out inner function: Markera delfunk och tryck på glödlampan

# Telldus
http://developer.telldus.com/blog/2016/05/24/local-api-for-tellstick-znet-lite-beta-now-in-public-beta
http://api.telldus.net/localapi/api.html
http://api.telldus.com/explore/index
http://192.168.10.104/api

## Get token
http://api.telldus.com/explore/devices/list
``` bash
curl -i -d app="ropaolle-sovrum" -X PUT http://192.168.10.104/api/token
# http://192.168.10.104/api/authorize?token=a22a3d498a0d4304b09bf2f2dc7c61b4
curl -i -X GET http://192.168.10.104/api/token?token=a22a3d498a0d4304b09bf2f2dc7c61b4
{
  "allowRenew": true,
  "expires": 1517932317,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6InJvcGFvbGxlLXNvdnJ1bSIsImV4cCI6MTUxNzkzMjMxN30.eyJyZW5ldyI6dHJ1ZSwidHRsIjoyNDE5MjAwfQ.XYDHxcGUKIViOcAC48Ezbu3NMXrsIaCD2zqzpMB67AU"
}
```

## Diverse
https://github.com/telldus/tellstick-server/blob/master/api/src/api/ApiManager.py
https://forum.telldus.com/viewtopic.php?f=1&t=6848
