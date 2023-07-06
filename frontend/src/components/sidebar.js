import '../assets/styles/sidebar.css';
import AdminSidebarData from './admin-sidebar-data';

function Sidebar(prop) {
    const sideClass = prop.sidebar;
    const sideTabClass = 'sidebar-' + prop.sidebar;
    

  return (
    <div className="wrapper">
        <div id="sidebar" className= {sideClass}>
          {AdminSidebarData.map((val,key) => (
            <div className={sideTabClass} key={key}> 
              <div className='sidebar-icon'>{val.icon}</div>
              <div className='sidebar-tabName'>{val.tabName}</div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Sidebar