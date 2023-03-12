
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controller/blogsroute')
const usersRouter = require('./controller/userroute')
const config = require('./utils/config')
const logger = require('./utils/logger')
const errorHandler = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

module.exports = app