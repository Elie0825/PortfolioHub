const prisma = require('../config/database')

const getAllByPortfolioId = async (portfolioId) => {
  return prisma.experience.findMany({
    where: { portfolioId },
    orderBy: { sortOrder: 'asc' },
  })
}

const create = async (portfolioId, data) => {
  const last = await prisma.experience.findFirst({
    where: { portfolioId },
    orderBy: { sortOrder: 'desc' },
  })
  return prisma.experience.create({
    data: { ...data, portfolioId, sortOrder: last ? last.sortOrder + 1 : 0 },
  })
}

const update = async (id, data) => {
  return prisma.experience.update({ where: { id }, data })
}

const remove = async (id) => {
  return prisma.experience.delete({ where: { id } })
}

module.exports = { getAllByPortfolioId, create, update, remove }
