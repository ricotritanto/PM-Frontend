import React,{Component, Fragment} from 'react';

// import { useHistory } from 'react-router-dom';
import UpdatePassword from '../access/updatePassword'

import Swal from 'sweetalert2';
import {Button, Modal, ModalBody, ModalHeader,ModalFooter,FormGroup, Label,Input } from 'reactstrap';
export default class Header extends Component{
    constructor(props){
        super(props)
            this.logout = this.logout.bind(this)
            this.state = {
                isLoading:false,
                updatePasswordModal:false
            }
            this.handleModal = this.handleModal.bind(this);
        
    }

    handleModal(){
        console.log('test')
        this.setState({updatePasswordModal:!this.state.updatePasswordModal})
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
        // const {updatePasswordModal} = this.props
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
                                    <i className="dropdown-item dropdown-footer">
                                        <button className="btn btn-sm btn-success" onClick={()=>this.handleModal()}>Change Password</button>   
                                    
                                    </i>                    
                                    <div className="dropdown-divider"></div>
                                    <i className="dropdown-item dropdown-footer">
                                        <button onClick={this.logout} className="btn btn-sm btn-warning">Logout</button>
                                    </i>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <Modal isOpen={this.state.updatePasswordModal} toggle={this.handleModal}>
                    <ModalHeader toggle={this.handleModal} style={{ 'backgroundColor': "yellow" }} color="primary" >
                        <b>Change Password </b>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="password">New Password : </Label>
                            <Input id="newpassword" name="newpassword" />
                            <Label for="password">Confirm Password:</Label>
                            <Input id="confirmpass" name="confirpass" />
                         </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">
                            Update
                        </Button>
                        <Button color="secondary" onClick={this.handleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                </div>
            </Fragment>
        )
    }
}
