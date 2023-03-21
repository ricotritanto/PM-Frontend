import React, {Component, Fragment} from 'react';
// import { Link } from 'react-router-dom';

export default class Sidebar extends Component {

    render(){
        const username = localStorage.getItem('usernya')
        return(
            <Fragment>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">                    
                    <a href="/" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />

                        <span className="brand-text font-weight-light">CPANEL Admin</span>
                    </a>

                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
                            </div>
                            <div className="info">
                                <a href="abc" className="d-block">{username}</a>
                            </div>
                        </div>

                        {/* <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item menu-open">
                                    <a href="/" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                    </a>
                                </li>
                                <li className="nav-header">STORAGE</li>
                                <li className="nav-item">
                                    <a href="abc" className="nav-link">
                                    <i className="nav-icon fas fa-edit"></i>
                                    <p>
                                        MASTER DATA
                                        <i className="fas fa-angle-left right"></i>
                                    </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href="/customers" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>MASTER CUSTOMERS</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/product" className="nav-link">
                                        {/* <Link to="/ikan" className="nav-link"> */}
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>MASTER PRODUCTS</p>
                                        {/* </Link> */}
                                        </a>
                                    </li>
                                    </ul>
                                </li>
                                <li className="nav-header">TRANSACTIONS</li>
                                <li className="nav-item">
                                    <a href="/delivery_orders" className="nav-link">
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Delivery Orders</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/invoice" className="nav-link">
                                    {/* <Link to="/ikan" className="nav-link"> */}
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Invoice</p>
                                    {/* </Link> */}
                                    </a>
                                </li>
                                <li className="nav-header">Setting</li>
                                <li className="nav-item">
                                    <a href="/user" className="nav-link">
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>User</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/role" className="nav-link">
                                    {/* <Link to="/ikan" className="nav-link"> */}
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Role</p>
                                    {/* </Link> */}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </aside>

            </Fragment>
        )
    }
}
