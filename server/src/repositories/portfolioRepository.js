const prisma = require('../config/database')

const getByUserId = async (userId) => {
  return prisma.portfolio.findUnique({
    where: { userId },
    include: {
      profileSection: true,
      projects: { orderBy: { sortOrder: 'asc' } },
      experiences: { orderBy: { sortOrder: 'asc' } },
      skills: { orderBy: { sortOrder: 'asc' } },
      contactLinks: true,
    },
  })
}

const updateProfileSection = async (portfolioId, data) => {
  return prisma.profileSection.update({
    where: { portfolioId },
    data,
  })
}

const updateTheme = async (portfolioId, theme) => {
  return prisma.portfolio.update({
    where: { id: portfolioId },
    data: { theme },
  })
}

const togglePublished = async (portfolioId, isPublished) => {
  return prisma.portfolio.update({
    where: { id: portfolioId },
    data: { isPublished },
  })
}

const getPublicPortfolioByUsername = async (username) => {
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return null

  const portfolio = await prisma.portfolio.findUnique({ where: { userId: user.id } })
  if (!portfolio || !portfolio.isPublished) return null

  return prisma.portfolio.findUnique({
    where: { id: portfolio.id },
    include: {
      user: { select: { username: true } },
      profileSection: true,
      projects: { orderBy: { sortOrder: 'asc' } },
      experiences: { orderBy: { sortOrder: 'asc' } },
      skills: { orderBy: { sortOrder: 'asc' } },
      contactLinks: true,
    },
  })
}
// styleConfig and sectionOrder are scalar fields — included automatically by Prisma findUnique

module.exports = {
  getByUserId,
  updateProfileSection,
  updateTheme,
  togglePublished,
  getPublicPortfolioByUsername,
}
