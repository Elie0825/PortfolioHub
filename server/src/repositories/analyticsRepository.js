const prisma = require('../config/database')

const recordView = async (portfolioId, referrer) => {
  return prisma.portfolioView.create({
    data: { portfolioId, referrer: referrer || '' },
  })
}

const recordProjectClick = async (projectId, linkType) => {
  return prisma.projectClick.create({
    data: { projectId, linkType },
  })
}

const getViewsLast30Days = async (portfolioId) => {
  const rows = await prisma.$queryRaw`
    SELECT
      TO_CHAR(DATE(visited_at AT TIME ZONE 'UTC'), 'YYYY-MM-DD') AS date,
      COUNT(*)::int AS count
    FROM portfolio_views
    WHERE portfolio_id = ${portfolioId}
      AND visited_at >= NOW() - INTERVAL '30 days'
    GROUP BY DATE(visited_at AT TIME ZONE 'UTC')
    ORDER BY date ASC
  `

  const map = {}
  rows.forEach((r) => { map[r.date] = r.count })

  const result = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setUTCDate(d.getUTCDate() - i)
    const key = d.toISOString().slice(0, 10)
    result.push({ date: key, count: map[key] ?? 0 })
  }
  return result
}

const getTopReferrers = async (portfolioId) => {
  const rows = await prisma.portfolioView.groupBy({
    by: ['referrer'],
    where: { portfolioId },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: 5,
  })
  return rows.map((r) => ({ referrer: r.referrer || 'direct', count: r._count.id }))
}

const getProjectClickCounts = async (portfolioId) => {
  const projects = await prisma.project.findMany({
    where: { portfolioId },
    select: { id: true, title: true, sortOrder: true },
    orderBy: { sortOrder: 'asc' },
  })

  const clicks = await prisma.projectClick.groupBy({
    by: ['projectId', 'linkType'],
    where: { project: { portfolioId } },
    _count: { id: true },
  })

  const clickMap = {}
  clicks.forEach((c) => {
    if (!clickMap[c.projectId]) clickMap[c.projectId] = { live: 0, github: 0 }
    clickMap[c.projectId][c.linkType] = c._count.id
  })

  return projects.map((p) => ({
    id: p.id,
    title: p.title,
    live: clickMap[p.id]?.live ?? 0,
    github: clickMap[p.id]?.github ?? 0,
  }))
}

module.exports = { recordView, recordProjectClick, getViewsLast30Days, getTopReferrers, getProjectClickCounts }
