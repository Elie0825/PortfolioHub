const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const { clientUrl } = require('./config/environment')
const { errorHandler } = require('./middleware/errorHandler')
const authRoutes = require('./routes/authRoutes')
const portfolioRoutes = require('./routes/portfolioRoutes')
const projectRoutes = require('./routes/projectRoutes')
const skillRoutes = require('./routes/skillRoutes')
const experienceRoutes = require('./routes/experienceRoutes')
const contactLinkRoutes = require('./routes/contactLinkRoutes')
const publicRoutes = require('./routes/publicRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes')
const messageRoutes = require('./routes/messageRoutes')
const pdfRoutes = require('./routes/pdfRoutes')
const styleRoutes = require('./routes/styleRoutes')

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
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/experiences', experienceRoutes)
app.use('/api/contact-links', contactLinkRoutes)
app.use('/api/public', publicRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/pdf', pdfRoutes)
app.use('/api/style', styleRoutes)

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use(errorHandler)

module.exports = app
