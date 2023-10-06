import './App.css'
import {Routes, Route, Navigate, BrowserRouter as Router} from 'react-router-dom'
import {useLayoutEffect} from "react";
import Login from '../pages/login/Login.jsx'
import SignUp  from '../pages/signup/SignUp.jsx'
import Home from '../components/Home.jsx'
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Products from "../pages/products/Products.jsx";
import AddProducts from "../pages/addproducts/AddProducts.jsx";
import Users from "../pages/users/Users.jsx";
import Transaction from "../pages/transactions/Transaction.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoutes from '../common/PrivateRouter..jsx'
import {useAuth} from "../data/useAuth.jsx";



function App() {
    const { isAuthenticated, user, login, logout } = useAuth();
    useLayoutEffect(() => {
        document.body.style.backgroundColor = '#f7f7f7'
    });

    return (
            <div>
                <Router>

                    <Routes>
                        <Route path={'/'} element={<Navigate to={'/login'}/>}/>
                        <Route path={'/login'} login={login} element={<Login/>} key={'login'}/>
                        <Route path={'/signup'} element={<SignUp/>} key={'signup'}/>
                        <Route element={<PrivateRoutes/>}>
                            <Route path={'/home/*'} isAuthenticated={isAuthenticated}  user={user} login={login} logout={logout} element={<Home/>}  key={'home'}>
                                <Route path={'*'} element={<Dashboard/>} />
                                <Route path={'products'}   element={<Products/>} />
                                <Route path={'addproducts'} element={<AddProducts/>} />
                                <Route path={'users'} element={<Users/>} />
                                <Route path={'transaction'} element={<Transaction/>} />
                            </Route>
                        </Route>

                    </Routes>
                </Router>

            </div>


    )
}

export default App


