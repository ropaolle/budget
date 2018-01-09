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

[Telldus developer blog](http://developer.telldus.com/blog/2016/05/24/local-api-for-tellstick-znet-lite-beta-now-in-public-beta)

## Kräver authentification

* [Local api](http://api.telldus.net/localapi/api.html)
* [Api explorer](http://api.telldus.com/explore/index)
* [Telldus Znet Lite 2](http://192.168.10.104/api)

## Get token

```bash
# Begär ett nytt temp-token
curl -i -d app="ropaolle-sovrum" -X PUT http://192.168.10.104/api/token

# Gå till sidan som returneras, logga in och tillåt access.

# Hämta api key (token)
curl -i -X GET http://192.168.10.104/api/token?token={temp-token}

{
  "allowRenew": true,
  "expires": 1517932317,
  "token": "{token}"
}

# Refresh token
curl -i -X GET http://192.168.10.104/api/refreshToken -H "Authorization: Bearer {token}"
```

## Diverse

https://github.com/telldus/tellstick-server/blob/master/api/src/api/ApiManager.py
https://forum.telldus.com/viewtopic.php?f=1&t=6848

$ curl -i -X GET http://0.0.0.0/api/devices/list?supportedMethods=3 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6IkV4YW1wbGUgYXBwIiwiZXhwIjoxNDUyOTUxNTYyfQ.eyJyZW5ldyI6dHJ1ZSwidHRsIjo4NjQwMH0.HeqoFM6-K5IuQa08Zr9HM9V2TKGRI9VxXlgdsutP7sg"
HTTP/1.1 200 OK
Date: Tue, 19 Jan 2016 10:21:29 GMT
Content-Type: Content-Type: application/json; charset=utf-8
Server: CherryPy/3.7.0

{
"device": [
{
"id": 1,
"methods": 3,
"name": "Example device",
"state": 2,
"statevalue": "",
"type": "device"
}
]
}
