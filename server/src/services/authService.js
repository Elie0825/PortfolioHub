const bcrypt = require('bcryptjs')
const { signToken } = require('../config/jwt')
const userRepository = require('../repositories/userRepository')

const SALT_ROUNDS = 12

const register = async ({ email, username, password }) => {
  const emailTaken = await userRepository.findUserByEmail(email)
  if (emailTaken) {
    const error = new Error('An account with this email already exists')
    error.statusCode = 409
    throw error
  }

  const usernameTaken = await userRepository.findUserByUsername(username)
  if (usernameTaken) {
    const error = new Error('This username is already taken')
    error.statusCode = 409
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  const user = await userRepository.createUserWithPortfolio({
    email,
    username,
    hashedPassword,
  })

  const token = signToken({ userId: user.id })

  return { user, token }
}

const login = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email)
  if (!user) {
    const error = new Error('Invalid email or password')
    error.statusCode = 401
    throw error
  }

  const passwordMatches = await bcrypt.compare(password, user.password)
  if (!passwordMatches) {
    const error = new Error('Invalid email or password')
    error.statusCode = 401
    throw error
  }

  const safeUser = { id: user.id, email: user.email, username: user.username }
  const token = signToken({ userId: user.id })

  return { user: safeUser, token }
}

module.exports = { register, login }
