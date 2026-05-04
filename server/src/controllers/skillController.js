const skillService = require('../services/skillService')

const getAll = async (req, res, next) => {
  try {
    const skills = await skillService.getAll(req.user.id)
    res.json(skills)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const skill = await skillService.create(req.user.id, req.body.name)
    res.status(201).json(skill)
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    await skillService.remove(req.user.id, req.params.id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

const toggleFeatured = async (req, res, next) => {
  try {
    const skill = await skillService.toggleFeatured(
      req.user.id,
      req.params.id,
      req.body.isFeatured
    )
    res.json(skill)
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, create, remove, toggleFeatured }
