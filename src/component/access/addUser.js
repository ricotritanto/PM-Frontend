import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';
// import Select from 'react-select'

export default class addUser extends Component {
    render(){
    const {optionRole} = this.props
    // console.log(optionRole)
        return(
            <div>
                {/* <Button className="float-right mb-4" color="success" onClick={this.props.togglenewUserModal}>
                    Add User
                </Button>
                <Modal isOpen={this.props.newUserModal} toggle={this.props.togglenewUserModal}>
                    <ModalHeader toggle={this.props.togglenewUserModal}>
                        Create New User
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="username">Username:</Label>
                            <Input id="username" name="username" onChange={this.props.onChangeAddUserHandler} onKeyPress={this.props.onKeyPressAdd} />
                            <Label for="email">Email:</Label>
                            <Input id="email" name="email" onChange={this.props.onChangeAddUserHandler} onKeyPress={this.props.onKeyPressAdd} />
                            <Label for="password">Password:</Label>
                            <Input id="password" name="password" onChange={this.props.onChangeAddUserHandler} onKeyPress={this.props.onKeyPressAdd} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addUser()}>
                            Add
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.togglenewUserModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal> */}
                 <button type="button" className="btn btn-success float-right mb-4" data-toggle="modal" data-target="#modal-default">
                  New User
                </button>
                <div className="modal fade" id="modal-default">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h4 className="modal-title">Add New User</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div className="modal-body">
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
                                    <Input type="select"  onChange={this.props.onChangeAddUserHandler} name="id_role" id="id_role">
                                        <option> --- Pilih Role ---</option>
                                        {optionRole.map((data) =>(
                                            <option key={data.value} value={data.value} name="id_role" id="id_role">{data.label}</option>
                                        ))}
                                    </Input>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.props.addUser()}>Save changes</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}