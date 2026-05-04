const contactLinkService = require('../services/contactLinkService')

const getAll = async (req, res, next) => {
  try {
    const links = await contactLinkService.getAll(req.user.id)
    res.json(links)
  } catch (error) {
    next(error)
  }
}

const upsert = async (req, res, next) => {
  try {
    const { platform, url } = req.body
    const link = await contactLinkService.upsert(req.user.id, platform, url)
    res.json(link)
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    await contactLinkService.remove(req.user.id, req.params.platform)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, upsert, remove }
