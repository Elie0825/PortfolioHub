const prisma = require('../config/database')

const getAllByPortfolioId = async (portfolioId) => {
  return prisma.contactLink.findMany({ where: { portfolioId } })
}

const upsertByPlatform = async (portfolioId, platform, url) => {
  const existing = await prisma.contactLink.findFirst({
    where: { portfolioId, platform },
  })
  if (existing) {
    return prisma.contactLink.update({ where: { id: existing.id }, data: { url } })
  }
  return prisma.contactLink.create({ data: { portfolioId, platform, url } })
}

const remove = async (portfolioId, platform) => {
  const existing = await prisma.contactLink.findFirst({
    where: { portfolioId, platform },
  })
  if (!existing) return null
  return prisma.contactLink.delete({ where: { id: existing.id } })
}

module.exports = { getAllByPortfolioId, upsertByPlatform, remove }
