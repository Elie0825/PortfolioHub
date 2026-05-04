const puppeteer = require('puppeteer')
const prisma = require('../config/database')

const exportPdf = async (req, res, next) => {
  let browser
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    const portfolio = await prisma.portfolio.findUnique({ where: { userId: req.user.id } })

    if (!portfolio?.isPublished) {
      const error = new Error('Publish your portfolio before exporting to PDF')
      error.statusCode = 400
      throw error
    }

    const url = `${process.env.CLIENT_URL}/u/${user.username}`

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
      printBackground: true,
    })

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${user.username}-portfolio.pdf"`,
      'Content-Length': pdf.length,
    })
    res.end(pdf)
  } catch (error) {
    next(error)
  } finally {
    if (browser) await browser.close()
  }
}

module.exports = { exportPdf }
