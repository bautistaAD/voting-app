// import Card from 'react-bootstrap/Card';

const DashboardCard = (prop) => {
  const name = prop.name;
  const png = prop.png
  const count = prop.count
  const iconClass = prop.iconClass
    return (
      <div className="dashboard-card-base shadow mb-2 bg-body rounded">
        <div className={iconClass}>
          <img src={png} className="dashboard-card-image" alt="none"></img>
        </div>
        <h3 className="dashboard-card-count">{count}</h3>
        <div className="dashboard-card-title">{name}</div>
      </div>
    );
  }
  
  export default DashboardCard;