import './Skeleton.css'

const Skeleton = ({ type }) => {
  if (type === 'banner') {
    return <div className="skeleton-banner"></div>
  }
  return (
    <div className="skeleton-row">
      <div className="skeleton-title"></div>
      <div className="skeleton-posters">
        {[...Array(6)].map((_, i) => (<div key={i} className="skeleton-poster"></div>))}
      </div>
    </div>
  )
}

export default Skeleton
