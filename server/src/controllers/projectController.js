const projectService = require('../services/projectService')

const getAll = async (req, res, next) => {
  try {
    const projects = await projectService.getAll(req.user.id)
    res.json(projects)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const { title, description, liveUrl, githubUrl, thumbUrl, techTags } = req.body
    const project = await projectService.create(req.user.id, {
      title,
      description: description || '',
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      thumbUrl: thumbUrl || '',
      techTags: techTags || [],
    })
    res.status(201).json(project)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const { title, description, liveUrl, githubUrl, thumbUrl, techTags } = req.body
    const project = await projectService.update(req.user.id, req.params.id, {
      title,
      description,
      liveUrl,
      githubUrl,
      thumbUrl,
      techTags,
    })
    res.json(project)
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    await projectService.remove(req.user.id, req.params.id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

const reorder = async (req, res, next) => {
  try {
    await projectService.reorder(req.user.id, req.body.orderedIds)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, create, update, remove, reorder }
