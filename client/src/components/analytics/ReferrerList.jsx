import '../../styles/components/ReferrerList.css'

const ReferrerList = ({ referrers }) => {
  if (!referrers.length) return <p className="editor-empty">No referrer data yet.</p>

  const max = referrers[0].count

  return (
    <ol className="referrer-list">
      {referrers.map((item, index) => (
        <li key={item.referrer} className="referrer-list__item">
          <span className="referrer-list__rank">{index + 1}</span>
          <span className="referrer-list__domain">{item.referrer || 'direct'}</span>
          <div className="referrer-list__bar-wrap">
            <div
              className="referrer-list__bar"
              style={{ width: `${Math.round((item.count / max) * 100)}%` }}
            />
          </div>
          <span className="referrer-list__count">{item.count}</span>
        </li>
      ))}
    </ol>
  )
}

export default ReferrerList
