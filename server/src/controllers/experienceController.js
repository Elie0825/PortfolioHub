const experienceService = require('../services/experienceService')

const getAll = async (req, res, next) => {
  try {
    const experiences = await experienceService.getAll(req.user.id)
    res.json(experiences)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const { role, company, startDate, endDate, description } = req.body
    const experience = await experienceService.create(req.user.id, {
      role,
      company,
      startDate,
      endDate: endDate || 'present',
      description: description || '',
    })
    res.status(201).json(experience)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const { role, company, startDate, endDate, description } = req.body
    const experience = await experienceService.update(req.user.id, req.params.id, {
      role,
      company,
      startDate,
      endDate,
      description,
    })
    res.json(experience)
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    await experienceService.remove(req.user.id, req.params.id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, create, update, remove }
