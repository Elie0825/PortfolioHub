import { Link } from 'react-router-dom'
import '../../styles/components/PublicFooter.css'

const PublicFooter = () => (
  <footer className="public-footer">
    <span className="public-footer__text">
      Powered by{' '}
      <Link to="/register" className="public-footer__link">
        PortfolioHub
      </Link>
    </span>
  </footer>
)

export default PublicFooter
