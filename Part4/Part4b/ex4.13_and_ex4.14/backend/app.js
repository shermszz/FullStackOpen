const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')
const blogsRouter = require('./controllers/blogs.js')

const app = express()

logger.info('connecting to MONGODB_URI...')

mongoose.connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('Successfully connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app