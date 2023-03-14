const logger = require('../utils/logger')

const errorHandler = (error,request,response,next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError'){
    response.status(400).json({ error: error.message })
  }
  else if(error.name === 'Error'){
    response.status(400).json({ error: error.message })
  }
  else if(error.name === 'JsonWebTokenError'){
    response.status(401).json({ error: error.message })
  }
  next(error)
}

const getToken = (request,response,next) => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')){
    const token = auth.replace('Bearer ','')
    request.token = token
    next()
  }
  return null
}

module.exports = {
  errorHandler,
  getToken
}