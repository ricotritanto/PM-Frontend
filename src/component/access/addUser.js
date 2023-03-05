import React, { Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
// import Select from 'react-select'

export default class addUser extends Component {
    render(){
    const {optionRole} = this.props
    // console.log(optionRole)
        return(
            <div>
                <Button className="float-right mb-4" color="primary" onClick={this.props.togglenewUserModal}>
                    Add User
                </Button>
                <Modal isOpen={this.props.newUserModal} toggle={this.props.togglenewUserModal}>
                    <ModalHeader toggle={this.props.togglenewUserModal}>
                        Create User
                    </ModalHeader>
                    <ModalBody>              
                        <div className="tab-pane" id="settings">
                            <form className="form-horizontal">
                            <div className="form-group row">
                                <label htmlFor="inputName" className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                <input type="email" className="form-control" id="username" name="username"  onChange={this.props.onChangeAddUserHandler} onKeyPress={this.props.onKeyPressAdd}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                <input type="email" className="form-control" id="email" name="email" onChange={this.props.onChangeAddUserHandler} onKeyPress={this.props.onKeyPressAdd} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPass" className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                <input type="password" className="form-control" id="password" name="password"  onChange={this.props.onChangeAddUserHandler} onKeyPress={this.props.onKeyPressAdd} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputRole" className="col-sm-3 col-form-label">Role</label>
                                <div className="col-sm-9">
                                <select className="form-control" onChange={this.props.onChangeAddUserHandler} name="roles" id="roles">      
                                <option> --- Pilih Role ---</option>
                                        {optionRole.map((data) =>(
                                            <option key={data.value} selected={this.props.newUserData.roles === data.value} value={data.value}>{data.label}</option>
                                        ))}     
                                </select>
                                </div>
                            </div>
                            </form>
                        </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" onClick={this.props.togglenewUserModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.props.addUser()}>Save changes</button>
                            </div>
                        </ModalFooter>
                    </Modal>
            </div>
        )
    }
}