import { usePortfolio } from '../../context/PortfolioContext'
import '../../styles/components/StatsBar.css'

const profileFields = ['headline', 'bio', 'location', 'availability', 'profilePhotoUrl']

const calcCompletion = (profile) => {
  if (!profile) return 0
  const filled = profileFields.filter((f) => profile[f]?.trim()).length
  return Math.round((filled / profileFields.length) * 100)
}

const StatsBar = () => {
  const { portfolio } = usePortfolio()

  if (!portfolio) return null

  const completion = calcCompletion(portfolio.profileSection)
  const projectCount = portfolio.projects?.length ?? 0

  return (
    <div className="stats-bar">
      <div className="stats-bar__item">
        <span className="stats-bar__value">{portfolio.viewCount}</span>
        <span className="stats-bar__label">Views</span>
      </div>
      <div className="stats-bar__divider" />
      <div className="stats-bar__item">
        <span className="stats-bar__value">{projectCount}</span>
        <span className="stats-bar__label">Projects</span>
      </div>
      <div className="stats-bar__divider" />
      <div className="stats-bar__item">
        <span className="stats-bar__value">{completion}%</span>
        <span className="stats-bar__label">Profile complete</span>
      </div>
    </div>
  )
}

export default StatsBar
