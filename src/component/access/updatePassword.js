import React, { Component} from "react";
import { Modal, ModalHeader, ModalBody,ModalFooter, FormGroup} from 'reactstrap';

export default class updatePassword extends Component {
    render(){
        return(
            <div>
                <Modal isOpen={this.props.UpdatePasswordModal} toggle={this.props.toggleUpdatePasswordModal}>
                    <ModalHeader toggle={this.props.toggleUpdatePasswordModal}>
                        Change Password
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            {/* <Label for="name">Name:</Label>
                            <Input id="name" name="name" value={this.props.updatePasswordData.name} onChange={this.props.onChangeupdatePasswordHandler} onKeyPress={this.props.onKeyPressEdit}/>
                            <Label for="alias">Alias:</Label>
                            <Input id="alias" name="alias" value={this.props.updatePasswordData.alias} onChange={this.props.onChangeupdatePasswordHandler} onKeyPress={this.props.onKeyPressEdit}/>
                            <Label for="alias">Address:</Label>
                            <Input id="address" name="address" value={this.props.updatePasswordData.address} onChange={this.props.onChangeupdatePasswordHandler} onKeyPress={this.props.onKeyPressEdit}/>
                            <Label for="phone">Phone:</Label>
                            <Input id="phone" name="phone" value={this.props.updatePasswordData.phone} onChange={this.props.onChangeupdatePasswordHandler} onKeyPress={this.props.onKeyPressEdit}/> */}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="primary" onClick={() => this.props.updateCustomer()}>
                            Update
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.toggleEditCustomerModal}>
                            Cancel
                        </Button> */}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}