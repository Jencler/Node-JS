import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const moviesPath = join(dirname(currentFilePath), '..', 'movies.json')

const moviesAll = readJSON(moviesPath)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return moviesAll.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return moviesAll
  }

  static async getById ({ id }) {
    const movie = moviesAll.find(movie => movie.id === id)
    return movie
  }

  static async create (input) {
    const newMovie = {
      id: randomUUID(), // uui v4
      ...input
    }

    moviesAll.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = moviesAll.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    moviesAll.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = moviesAll.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    moviesAll[movieIndex] = {
      ...moviesAll[movieIndex],
      ...input
    }
    return moviesAll[movieIndex]
  }
}
