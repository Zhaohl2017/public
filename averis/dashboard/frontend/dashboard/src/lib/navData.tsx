import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AppleIcon from '@mui/icons-material/Apple';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
 
export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        icon: <TravelExploreIcon/>,
        text: "Moderator Board",
        link: "/mod"
    },
    {
        id: 2,
        icon: <BarChartIcon/>,
        text: "Admin Board",
        link: "/admin"
    },
    {
        id: 3,
        icon: <SupervisedUserCircleIcon/>,
        text: "User",
        link: "/user"
    },
    {
        id: 4,
        icon: <AppleIcon/>,
        text: "Products",
        link: "/product"
    },
    {
        id: 5,
        icon: <LoginIcon/>,
        text: "Login",
        link: "/login"
    },
    {
        id: 5,
        icon: <LogoutIcon/>,
        text: "Sign Up",
        link: "/register"
    }
]