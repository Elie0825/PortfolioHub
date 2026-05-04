import apiClient from './apiClient'

const getStyle = () => apiClient.get('/style').then((r) => r.data)

const updateStyleConfig = (styleConfig) =>
  apiClient.patch('/style/config', { styleConfig }).then((r) => r.data)

const updateSectionOrder = (sectionOrder) =>
  apiClient.patch('/style/sections', { sectionOrder }).then((r) => r.data)

export const styleApi = { getStyle, updateStyleConfig, updateSectionOrder }
