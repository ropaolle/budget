# Todo

* [ ] Cron: Update statistics
* [ ] Monthly cost
* [ ]

# Later

* [ ] Cron: DB backup
* [ ] Import montly/yearly expenses
* [ ] Import from .xls

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
