import { useState, useEffect } from 'react'
import { analyticsApi } from '../services/analyticsApi'
import ViewsLineChart from '../components/analytics/ViewsLineChart'
import ReferrerList from '../components/analytics/ReferrerList'
import ProjectClicksChart from '../components/analytics/ProjectClicksChart'
import '../styles/pages/AnalyticsDashboard.css'

const AnalyticsDashboard = () => {
  const [viewStats, setViewStats] = useState(null)
  const [clickStats, setClickStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [views, clicks] = await Promise.all([
          analyticsApi.fetchViewStats(),
          analyticsApi.fetchClickStats(),
        ])
        setViewStats(views)
        setClickStats(clicks)
      } catch {
        setError('Failed to load analytics')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  if (isLoading) return <div className="analytics-skeleton"><div className="analytics-skeleton__block" /><div className="analytics-skeleton__block" /><div className="analytics-skeleton__block analytics-skeleton__block--short" /></div>
  if (error) return <p className="editor-error">{error}</p>

  const totalViews = viewStats.views.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="analytics-dashboard">
      <h2 className="editor-section__title">Analytics</h2>

      <div className="analytics-dashboard__stat-row">
        <div className="analytics-stat">
          <span className="analytics-stat__value">{totalViews}</span>
          <span className="analytics-stat__label">Views last 30 days</span>
        </div>
      </div>

      <div className="analytics-dashboard__section">
        <h3 className="analytics-dashboard__heading">Daily views</h3>
        <ViewsLineChart data={viewStats.views} />
      </div>

      <div className="analytics-dashboard__section">
        <h3 className="analytics-dashboard__heading">Top referrers</h3>
        <ReferrerList referrers={viewStats.referrers} />
      </div>

      <div className="analytics-dashboard__section">
        <h3 className="analytics-dashboard__heading">Project link clicks</h3>
        <ProjectClicksChart data={clickStats} />
      </div>
    </div>
  )
}

export default AnalyticsDashboard
