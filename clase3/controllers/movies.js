import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MoviesController {
  static async getAll (req, res) {
    const { genre } = req.query
    const moviesAll = await MovieModel.getAll({ genre })
    res.json(moviesAll)
  }

  static async geyById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(400).json({ message: 'La película no fue encontrado' })
  }

  static async create (req, res) { // siempre usar el mismo recurso la misma url que trae todas las peliculas solo quje en este caso el metodo POST
    const result = validateMovie(req.body)
    // Si hay errores
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    // Si hay errores
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params

    const updateMovie = await MovieModel.update({ id, input: result.data })

    res.json(updateMovie)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await MovieModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Pelicula no encontrada' })
    }
    return res.json({ message: 'Pelicula eliminada' })
  }
}
