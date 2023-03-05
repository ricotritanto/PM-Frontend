import React, { Component} from "react";
import { Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';

export default class EditUser extends Component {
    render(){
        console.log(this.props.editUserData.roles)
        const {optionRole} = this.props;
        return(
            <div>
                 <Modal isOpen={this.props.editUserModal} toggle={this.props.toggleEditUserModal}>
                    <ModalHeader toggle={this.props.toggleEditUserModal}>
                        Update Data User
                    </ModalHeader>
                    <ModalBody>
                        <div className="tab-pane" id="settings">
                            <form className="form-horizontal">
                            <div className="form-group row">
                                <label htmlFor="inputName" className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                    <input type="email" className="form-control" id="username" name="username"  value={this.props.editUserData.username} onChange={this.props.onChangeEditUserHandler} onKeyPress={this.props.onKeyPressEdit}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                    <input type="email" className="form-control" id="email" name="email" value={this.props.editUserData.email} onChange={this.props.onChangeEditUserHandler} onKeyPress={this.props.onKeyPressEdit} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputRole" className="col-sm-3 col-form-label">Role</label>
                                <div className="col-sm-9">
                                    <select className="form-control" onChange={this.props.onChangeEditUserHandler} name="roles" id="roles">      
                                        {optionRole.map((data) =>(
                                            <option key={data.value} selected={this.props.editUserData.roles === data.value} value={data.value}>{data.label}</option>
                                        ))}     
                                    </select>
                                </div>
                            </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {/* </div> */}
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" onClick={this.props.toggleEditUserModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.props.updateUser()}>Save changes</button>
                        </div>
                    </ModalFooter>
                </Modal>
                    {/* </div>
                    </div>
                </div> */}
            </div>
        )
    }
}