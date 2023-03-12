const logger = require('../utils/logger')

const errorHandler = (error,request,response,next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError'){
    response.status(400).json({ error: error.message })
  }
  else if(error.name === 'Error'){
    response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = errorHandler