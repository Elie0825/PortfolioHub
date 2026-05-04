import { Link } from 'react-router-dom'
import '../../styles/components/PublicNotFound.css'

const PublicNotFound = ({ username }) => (
  <div className="public-not-found">
    <h1 className="public-not-found__title">Portfolio not found</h1>
    <p className="public-not-found__message">
      {username
        ? `@${username} hasn't published a portfolio yet.`
        : 'This portfolio does not exist.'}
    </p>
    <Link to="/register" className="public-not-found__cta">
      Create your own portfolio
    </Link>
  </div>
)

export default PublicNotFound
