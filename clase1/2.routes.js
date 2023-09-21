const http = require('node:http')
const DitoJSON = require('./pokemon/dito.json')

const port = process.env.PORT ?? 1234

const processServer = (req, res) => {
  const { url, method } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h2>Bienvenidos</h2>')

        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(DitoJSON))

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h2>Error</h2>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // Escuhcrta el evnto data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a una base de datos para guardar la info
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            data.timespan = new Date()
            data.age = 18
            res.end(JSON.stringify(data))
          })
          break
          // ??????
        }
        default:
          res.statusCode = 400
          res.setHeader('Content-type', 'text/plain; charset=utf-8')
          return res.end('404 Page no found')
      }
  }
}

const server = http.createServer(processServer)

server.listen(port, (req, res) => {
  console.log(`Server listening on port http://localhost:${port}`)
})
