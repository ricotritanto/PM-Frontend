import React,{Component, Fragment} from 'react';

export default class Header extends Component{
    render() {
        return (
            <Fragment>
                <div>
                    <div classname="preloader flex-column justify-content-center align-items-center">
                        <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
                    </div>
                    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="a" role="button"><i className="fas fa-bars" /></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="index3.html" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="a" className="nav-link">Contact</a>
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
                        <li className="nav-item">
                            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="a" role="button">
                            <i className="fas fa-th-large" />
                            </a>
                        </li>
                        </ul>
                    </nav>
                </div>
            </Fragment>
        )
    }
}
