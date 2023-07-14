import "../assets/styles/status.css"

const Status = (prop) => {
    const className = prop.className; //member-status, election-status
    const circleColor = "rounded-circle " + prop.bgColor; // .bg-danger, .bg-warning, .bg-success
    const name = prop.name;

  return (
    <div className={className} >
        <div className={circleColor}></div>
        <div className="status-name">{name}</div>
    </div>
  )
}

export default Status