const prisma = require('../config/database')

const getAllByPortfolioId = async (portfolioId) => {
  return prisma.skill.findMany({
    where: { portfolioId },
    orderBy: { sortOrder: 'asc' },
  })
}

const create = async (portfolioId, name) => {
  const last = await prisma.skill.findFirst({
    where: { portfolioId },
    orderBy: { sortOrder: 'desc' },
  })
  return prisma.skill.create({
    data: { portfolioId, name, sortOrder: last ? last.sortOrder + 1 : 0 },
  })
}

const remove = async (id) => {
  return prisma.skill.delete({ where: { id } })
}

const toggleFeatured = async (id, isFeatured) => {
  return prisma.skill.update({ where: { id }, data: { isFeatured } })
}

module.exports = { getAllByPortfolioId, create, remove, toggleFeatured }
