import React,{Component, Fragment} from 'react';

// import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
export default class Header extends Component{
    constructor(props){
        super(props)
            this.logout = this.logout.bind(this)
            this.state = {
                isLoading:false
            }
        
    }

    logout() {
        this.setState({
            isLoading: true,
        })
        Swal.fire({
            title: "Are you sure?",
            type: "warning",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            showCancelButton: true,
        })
        .then((result) => {
            if (result.value === true) {
                localStorage.removeItem('token')
                    window.location.reload();
            }
            if(result.dismiss === 'cancel'){
                Swal.fire("Cancel Berhasil!");
                this.setState({isLoading:false})
            }
        });
    }


    render() {
        return (
            <Fragment>
                <div>
                    <div className="preloader flex-column justify-content-center align-items-center">
                        <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
                    </div>
                    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" data-widget="pushmenu" href="a" role="button"><i className="fas fa-bars" /></a>
                            </li>
                            <li className="nav-item d-none d-sm-inline-block">
                                <a href="/" className="nav-link">Home</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" data-widget="navbar-search" href="a" role="button">
                                <i className="fas fa-search" />
                                </a>
                                <div className="navbar-search-block">
                                <form className="form-inline">
                                    <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar" type="submit">
                                        <i className="fas fa-search" />
                                        </button>
                                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                        <i className="fas fa-times" />
                                        </button>
                                    </div>
                                    </div>
                                </form>
                                </div>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="a" role="button">
                                <i className="fas fa-th-large" />
                                </a>
                            </li> */}
                            <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="/">
                            <i className="far fa-user"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">                            
                                <a href="/" className="dropdown-item">
                                    <i className="fa fa-id-card mr-2"></i> Update User
                                </a>
                            <div className="dropdown-divider"></div>
                                <i className="dropdown-item dropdown-footer">
                                    <button onClick={this.logout} className="btn btn-sm btn-warning">Logout</button>
                                </i>
                            </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Fragment>
        )
    }
}
