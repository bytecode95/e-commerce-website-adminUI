import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Products from "../pages/products/Products.jsx";
import AddProducts from "../pages/addproducts/AddProducts.jsx"
import Users from '../pages/users/Users.jsx'
import Transaction from '../pages/transactions/Transaction.jsx'

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';


const routes = [

    {
        name: "Dashboard",
        key: 'dashboard',
        path: '*',
        component: <Dashboard/>,
        icon: <DashboardIcon color="success"/>,
    },
    {
        name: "Products",
        key: 'products',
        path: 'products',
        component: <Products/>,
        icon: <InventoryIcon color="success"/>,
    },

    {
        name: "Add Products",
        key: 'add products',
        path: 'addproducts',
        component: <AddProducts/>,
        icon: <ShoppingCartIcon color="success"/>,
    },
    {
        name: "Users",
        key: 'users',
        path: 'users',
        component: <Users/>,
        icon: <AccountCircleIcon color="success"/>
    },
    {
        name: "Transaction",
        key: 'transaction',
        path: 'transaction',
        component: <Transaction color="success"/>,
        icon: <PaidIcon color="success"/>
    }
]



export default routes;
