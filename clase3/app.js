import express, { json } from 'express' // ESModules
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by') // desabilitamos el x-powered-by del header para seguridad

// Todas Las movies
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
