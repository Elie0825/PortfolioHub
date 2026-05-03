const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const { clientUrl } = require('./config/environment')
const { errorHandler } = require('./middleware/errorHandler')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(helmet())

app.use(cors({
  origin: clientUrl,
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many requests from this IP, please try again later',
})

app.use('/api/auth', authRateLimit, authRoutes)

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use(errorHandler)

module.exports = app
