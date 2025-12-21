const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    //Uniqueness error is named MongoServerError and E11000 is the specific error code for Duplicate key
    return res.status(400).json({ error: 'expected `username` to be unique' }) //Translate the "server error" into a "bad request" error since it is the client's fault
  }
  else if (error.name === 'JsonWebTokenError') {
    //This error occurs when the token is missing or invalid when verifying
    return res.status(401).json({ error: 'Invalid token' })
  }
  next(error) //Otherwise, pass to the default error handler middleware from the Express library
}

module.exports = { requestLogger,tokenExtractor, unknownEndpoint, errorHandler }