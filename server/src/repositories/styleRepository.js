const prisma = require('../config/database')

const getStyle = async (portfolioId) => {
  return prisma.portfolio.findUnique({
    where: { id: portfolioId },
    select: { styleConfig: true, sectionOrder: true },
  })
}

const updateStyleConfig = async (portfolioId, styleConfig) => {
  return prisma.portfolio.update({
    where: { id: portfolioId },
    data: { styleConfig },
    select: { styleConfig: true, sectionOrder: true },
  })
}

const updateSectionOrder = async (portfolioId, sectionOrder) => {
  return prisma.portfolio.update({
    where: { id: portfolioId },
    data: { sectionOrder },
    select: { styleConfig: true, sectionOrder: true },
  })
}

module.exports = { getStyle, updateStyleConfig, updateSectionOrder }
