const prisma = require('../config/database')

const getAllByPortfolioId = async (portfolioId) => {
  return prisma.project.findMany({
    where: { portfolioId },
    orderBy: { sortOrder: 'asc' },
  })
}

const create = async (portfolioId, data) => {
  const last = await prisma.project.findFirst({
    where: { portfolioId },
    orderBy: { sortOrder: 'desc' },
  })
  return prisma.project.create({
    data: { ...data, portfolioId, sortOrder: last ? last.sortOrder + 1 : 0 },
  })
}

const update = async (id, portfolioId, data) => {
  return prisma.project.update({
    where: { id },
    data,
  })
}

const remove = async (id, portfolioId) => {
  return prisma.project.delete({ where: { id } })
}

const reorder = async (orderedIds) => {
  return prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.project.update({ where: { id }, data: { sortOrder: index } })
    )
  )
}

module.exports = { getAllByPortfolioId, create, update, remove, reorder }
