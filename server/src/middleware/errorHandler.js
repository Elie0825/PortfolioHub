const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Something went wrong'

  if (process.env.NODE_ENV === 'development') {
    console.error(`[${new Date().toISOString()}] ${statusCode} - ${message}`)
    console.error(error.stack)
  }

  res.status(statusCode).json({ message })
}

module.exports = { errorHandler }
