// import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './component/layout/header';
import Sidebar from './component/layout/sidebar';
import Menu from './component/menu'
import Footer from './component/layout/footer';
import Ikan from './component/ikan/index'
import Customers from './component/customer/index'


function App() {
  return (
    <div class="wrapper">
      <Header />
      <Sidebar />
      <Router>
        <Switch>
          <Route path="/" exact component = {Menu}></Route>
          <Route path="/ikan" exact component = {Ikan}></Route>
          <Route path="/customers" exact component = {Customers}></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;


// class App extends Component {
//   render(){
//     return(
//       <div class="App">
//         <Header />
//         <Sidebar />
//         <Router>
//           <Switch>
//             <Route path="/" exact component = {Menu}></Route>
//             <Route path="/ikan" exact component = {Ikan}></Route>
//           </Switch>
//         </Router>
//         <Footer />
//       </div>
//     )
//   }
// }