import apiClient from './apiClient'

const exportPortfolioPdf = async () => {
  const res = await apiClient.get('/pdf/export', { responseType: 'blob' })
  const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'portfolio.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const pdfApi = { exportPortfolioPdf }
