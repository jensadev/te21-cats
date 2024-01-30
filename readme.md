# Recept för ett nytt projekt

* ny mapp `mkdir nytt-projekt`
* gå in i mappen `cd nytt-projekt`
* initiera npm `npm init -y`
* installera paketen du behöver, troligast `npm i express nunjucks`
* behöver du databas installera också `npm i mysql2 dotenv`
* installera även dev dependencies `npm i -D nodemon`
* skapa en .gitignore fil `touch .gitignore`
* lägg till node_modules och .env i .gitignore
* skapa en server.js fil `touch server.js`
* skapa en .env fil `touch .env`
* initiera git `git init`
* Öppna projektet i VS Code `code .`

## Express behöver lite mappar

* skapa en mapp för statiska filer `mkdir public`
* skapa en mapp för templates `mkdir views`
* skapa en mapp för routes `mkdir routes`

## Databas

Kopia db.js från tidigare projekt, den innehåller.

```js
const mysql = require('mysql2')

const pool = mysql.createPool({
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  charset: 'utf8mb4',
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
})

module.exports = pool
```

## Server.js

```js
require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')

const port = process.env.PORT || 3000

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use((req, res, next) => {
  res.locals.url = req.originalUrl
  next()
})

app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
```

## Startscript i package.json

```json
  "scripts": {
    "dev": "nodemon -e js,html,njk,json ./server.js"
  },
```

**Rör aldrig `package-lock.json`, den sköter npm själv**

## Skapa ytterligare filer

Du behöver innehållet i dessa filer.

* public/style.css
* views/layout.njk
* views/index.njk
* routes/index.js

### public/style.css

```css
body {
  font-family: sans-serif;
 }
```

### views/layout.njk

```html
html:5 osv...
<body>
  {% block content %}{% endblock %}
</body>
```

### views/index.njk

```html
{% extends "layout.njk" %}

{% block content %}
  <h1>{{ title }}</h1>
{% endblock %}
```

### routes/index.js

```js
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})

module.exports = router
```

## Hur ser min databas ut då?

Och hur redovisar jag att jag kan planera och skapa en databas?

![planering](./public/cat_table.png)

### Skapa tabellerna i TablePlus

Kom ihåg att döpa tabellerna till **<förnamn>_<tabellnamn>**