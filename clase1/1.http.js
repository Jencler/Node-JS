const http = require('node:http')// Protocolo HTTP
const fs = require('node:fs')
const path = require('node:path')
const port = process.env.PORT ?? 1234

const processRququest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('Hola Mundo esta es mi página')
  } else if (req.url === '/mi-imagen') {
    const imagePath = path.join(__dirname, 'dev.webp') // Construye la ruta completa
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Error Del servidor')
        console.log(err)
      } else {
        res.setHeader('Content-Type', 'image/webp')
        res.end(data)
      }
    })
  }
}

const server = http.createServer(processRququest)

server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})
