const prisma = require('../config/database')

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } })
}

const findUserByUsername = async (username) => {
  return prisma.user.findUnique({ where: { username } })
}

const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, username: true, createdAt: true },
  })
}

const createUserWithPortfolio = async ({ email, username, hashedPassword }) => {
  return prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      portfolio: {
        create: {
          profileSection: {
            create: {},
          },
        },
      },
    },
    select: { id: true, email: true, username: true, createdAt: true },
  })
}

module.exports = {
  findUserByEmail,
  findUserByUsername,
  findUserById,
  createUserWithPortfolio,
}
