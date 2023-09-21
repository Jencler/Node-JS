const express = require('express')
const app = express()
const ditto = require('./pokemon/dito.json')

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')

app.use(express.json())

// Podemos resumir todo esto con solo  usar => app.use(express.json())

/* app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // Solo llegan request que sonn POST y que tiene l header 'Conetn-Type: application/json
  let body = ''

  // Escuhcrta el evnto data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    // llamar a una base de datos para guardar la info
    const data = JSON.parse(body)
    data.age = 18

    // Mutar  la request y meter ña informacion en el req.body
    req.body = data
    next()
  })
}) */

app.get('/', (req, res) => {
  res.send('<h1>Mi página</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar en la base de datos
  res.status(201).json(req.body)
})

// De esta manera se hace un 404 en express  y simpre va al ultimo.
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
