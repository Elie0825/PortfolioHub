const authService = require('../services/authService')
const { validationResult } = require('express-validator')

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { email, username, password } = req.body
    const { user, token } = await authService.register({ email, username, password })

    res.status(201).json({ user, token })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    const { user, token } = await authService.login({ email, password })

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user })
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, getMe }
