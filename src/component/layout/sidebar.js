import React, {Component, Fragment} from 'react';
// import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
    render(){
        return(
            <Fragment>
                <aside class="main-sidebar sidebar-dark-primary elevation-4">                    
                    <a href="/" class="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />

                        <span class="brand-text font-weight-light">AdminLTE 3</span>
                    </a>

                    <div class="sidebar">
                        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div class="image">
                                <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User" />
                            </div>
                            <div class="info">
                                <a href="abc" class="d-block">Alexander Pierce</a>
                            </div>
                        </div>

                        <div class="form-inline">

                            <div class="input-group" data-widget="sidebar-search">
                            <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div class="input-group-append">
                                    <button class="btn btn-sidebar">
                                    <i class="fas fa-search fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <nav class="mt-2">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li class="nav-item menu-open">
                                    <a href="abc" class="nav-link active">
                                    <i class="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                    </a>
                                </li>
                                <li class="nav-header">STORAGE</li>
                                <li class="nav-item">
                                    <a href="abc" class="nav-link">
                                    <i class="nav-icon fas fa-edit"></i>
                                    <p>
                                        MASTER DATA
                                        <i class="fas fa-angle-left right"></i>
                                    </p>
                                    </a>
                                    <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <a href="/customers" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>MASTER CUSTOMER</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/ikan" class="nav-link">
                                        {/* <Link to="/ikan" class="nav-link"> */}
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>MASTER IKAN</p>
                                        {/* </Link> */}
                                        </a>
                                    </li>
                                    </ul>
                                </li>
                                <li class="nav-header">REPORT</li>
                            </ul>
                        </nav>
                    </div>

                </aside>

            </Fragment>
        )
    }
}
