import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';

const AdminSidebarData = [
    {
        tabName: "Dashboard",
        icon: <DashboardOutlinedIcon/>,
        link: "/admin-dashboard"
    },
    {
        tabName: "Members",
        icon: <GroupsOutlinedIcon/>,
        link: "/admin-member"
    },
    {
        tabName: "Candidates",
        icon: <PersonSearchOutlinedIcon/>,
        link: "/admin-candidate"
    },
    {
        tabName: "Election",
        icon: <BallotOutlinedIcon/>,
        link: "/admin-election"
    },
    {
        tabName: "My Account",
        icon: <PersonOutlineOutlinedIcon/>,
        link: "/admin-account"
    }
]

export default AdminSidebarData