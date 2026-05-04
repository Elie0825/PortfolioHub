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

const DEFAULT_SECTION_ORDER = [
  { id: 'hero', visible: true },
  { id: 'skills', visible: true },
  { id: 'projects', visible: true },
  { id: 'experience', visible: true },
  { id: 'contact', visible: true },
]

const createUserWithPortfolio = async ({ email, username, hashedPassword }) => {
  return prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      portfolio: {
        create: {
          sectionOrder: DEFAULT_SECTION_ORDER,
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
