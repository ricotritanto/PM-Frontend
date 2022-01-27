// import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './component/layout/header';
import Sidebar from './component/layout/sidebar';
import Menu from './component/menu'
import Footer from './component/layout/footer';
import Product from './component/products/index'
import Customers from './component/customer/index'
import DeliveryOrder from './component/do/index'
import Invoice from './component/invoice/index'
import User from './component/access/user'

import Login from "./component/access/login";
// import Register from "./component/access/register";
// import Profile from "./component/access/profile";
import Dashboard from "./component/dashboard"

function setToken(userToken) {
  console.log(userToken)
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = localStorage.getItem('token');
  return tokenString
}


function App() {
  // const [token, setToken] = useState();
  // console.log(getToken)
  const token = getToken();
  // console.log(token)

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (   
    <div className="wrapper">
      <Header />
      <Sidebar />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard}/>
          {/* <Route exact path="/register"  component={Register} /> */}
            {/* <Route exact path="/profile" component={Profile} /> */}
          <Route exact path="/menu"  component = {Menu}></Route>
          <Route exact path="/product"  component = {Product}></Route>
          <Route exact path="/customers"  component = {Customers}></Route>
          <Route exact path="/delivery_orders"  component = {DeliveryOrder}></Route>
          <Route exact path="/invoice"  component = {Invoice}></Route>
          <Route exact path="/user"  component = {User}></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;