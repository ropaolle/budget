# Todo



# Later

* [ ] Cron: Update statistics
* [ ] Cron: DB backup
* [ ] Import montly/yearly expenses
* [ ] Import from .xls

# VS Code Extenions
* ESLint
* EditorConfig for Visual Studio Code
* Debugger for Chrome
* Prettier formatter for Visual Studio Code
* Auto Close Tag
* Code Runner

## Test later
* Rest Client


# MD

![image](./public/favicon.ico)

| Col 1     | Col 2        | Col 3                   |
| --------- | ------------ | ----------------------- |
| Mera text | Vad är detta | Text i kolumn nummer 3. |
| Mera text | Text min     | Kolumn nummer 3.        |

### Details

<details>
 <summary>Summary Goes Here</summary>
This is hidden, collapsable content...

```js
function processPrice(rawPrice) {
  let [, unitPrice] = PRICE_REGEX.exec(rawPrice);
  let unit = rawPrice
    .replace(unitPrice, "")
    .replace(/[^A-Za-z]/g, "")
    .trim();
  return { unitPrice: parseFloat(unitPrice), unit };
}
```

</details>

###

:smile: `:smile:`

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
