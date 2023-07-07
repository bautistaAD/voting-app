import '../assets/styles/sidebar.css';

function Sidebar(prop) {
    const sideClass = prop.sidebar;
    const sideTabClass = 'sidebar-' + prop.sidebar;
    const sideData= prop.sideData;

  return (
    <div className="wrapper">
        <div id="sidebar" className= {sideClass}>
          {sideData.map((val,key) => (
            <div className={sideTabClass} key={key} id={window.location.pathname === val.link ? ("sidetab-active"): ("")} onClick={() => window.location.pathname = val.link}> 
              <div className='sidebar-icon'>{val.icon}</div>
              <div className='sidebar-tabName'>{val.tabName}</div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Sidebar